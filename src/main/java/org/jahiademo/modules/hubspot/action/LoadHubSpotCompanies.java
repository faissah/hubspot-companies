/*
 * ==========================================================================================
 * =                            JAHIA'S ENTERPRISE DISTRIBUTION                             =
 * ==========================================================================================
 *
 *                                  http://www.jahia.com
 *
 * JAHIA'S ENTERPRISE DISTRIBUTIONS LICENSING - IMPORTANT INFORMATION
 * ==========================================================================================
 *
 *     Copyright (C) 2002-2024 Jahia Solutions Group. All rights reserved.
 *
 *     This file is part of a Jahia's Enterprise Distribution.
 *
 *     Jahia's Enterprise Distributions must be used in accordance with the terms
 *     contained in the Jahia Solutions Group Terms &amp; Conditions as well as
 *     the Jahia Sustainable Enterprise License (JSEL).
 *
 *     For questions regarding licensing, support, production usage...
 *     please contact our team at sales@jahia.com or go to http://www.jahia.com/license.
 *
 * ==========================================================================================
 */
package org.jahiademo.modules.hubspot.action;

import org.jahia.bin.Action;
import org.jahia.bin.ActionResult;
import org.jahia.services.content.JCRSessionWrapper;
import org.jahia.services.content.JCRTemplate;
import org.jahia.services.content.decorator.JCRSiteNode;
import org.jahia.services.render.RenderContext;
import org.jahia.services.render.Resource;
import org.jahia.services.render.URLResolver;
import org.json.JSONObject;
import org.osgi.service.component.annotations.Component;
import org.slf4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Base64;
import java.util.List;
import java.util.Map;

/**
 * Short description of the class
 *
 * @author faissah
 */
@Component(service = Action.class, immediate = true)
public class LoadHubSpotCompanies extends Action {
    private static Logger logger = org.slf4j.LoggerFactory.getLogger(LoadHubSpotCompanies.class);

    private JCRTemplate jcrTemplate;

    public LoadHubSpotCompanies() {
        setName("loadCompanies");
        setRequiredMethods("GET,POST");
        setRequireAuthenticatedUser(false);
    }

    @Override
    public ActionResult doExecute(HttpServletRequest req, RenderContext renderContext, final Resource resource,
            JCRSessionWrapper session, final Map<String, List<String>> parameters,
            URLResolver urlResolver) throws Exception {
            String apiKey = "";
            JCRSiteNode site =   renderContext.getSite();
            if (site.isNodeType("jmix:HubSpotAPIKey") && site.hasProperty("HubSpotAPIKey")){
                apiKey = site.getPropertyAsString("HubSpotAPIKey");
            }
        String partnerName = "JahiaDEMO";
        if (session.getUser().getProperties().containsKey("j:organization")){
            partnerName =  session.getUser().getProperty("j:organization");
        }
        String APIURL = "https://api.hubapi.com/crm/v3/objects/companies/search";

        logger.info("partner: "+partnerName);
       // List<JiraIssue> JIRAISSUE_ARRAY_LIST = new ArrayList<>();
        StringBuilder response = new StringBuilder();
        String jsonReply;
        String encoding = Base64.getEncoder().encodeToString((apiKey).getBytes("UTF-8"));
        URL url = new URL(APIURL);
        try {
            HttpURLConnection http = (HttpURLConnection) url.openConnection();
            http.setDoOutput(true);
            http.setRequestMethod("POST");
            http.setRequestProperty("Content-Type", "application/json");
            http.setRequestProperty("Accept", "application/json");
            http.setRequestProperty("Authorization", "Bearer " + apiKey);
            http.setRequestMethod("POST");
            String jsonInputString = "{  \"filterGroups\": [\n" + "  {\n" + "   \"filters\":[\n"
                    + "                {\n" + " \"propertyName\": \"partner__reseller_\",\n   \"operator\": \"EQ\",\n" + " \"value\": "
                    + "\""+partnerName+"\"\n"
                    + "                }\n" + "            ]\n" + "        }\n" + "    ],\n" + "    \"limit\": 10,\n"
                    + " \"properties\": [\"name\",\"partner__reseller_\",\"the_value_of_the_account\",\"stage_of_the_account\",\"commission_rate\"],\n" + "  \"after\": 0\n"
                    + "}";
            logger.info(jsonInputString);
            try(OutputStream os = http.getOutputStream()) {
                byte[] input = jsonInputString.getBytes("utf-8");
                os.write(input, 0, input.length);
            }


            long l = System.currentTimeMillis();

            if (http.getResponseCode() == 201 || http.getResponseCode() == 200) {
                try(BufferedReader br = new BufferedReader(
                        new InputStreamReader(http.getInputStream(), "utf-8"))) {
                    String responseLine = null;
                    while ((responseLine = br.readLine()) != null) {
                        response.append(responseLine.trim());
                    }
                    logger.info(response.toString());

                } finally {
                    http.disconnect();
                    logger.info(http.getResponseCode() + " " + http.getResponseMessage());
                    logger.info("Request {} executed in {} ms", url, (System.currentTimeMillis() - l));
                }
            }
        } catch (Exception e) {

            //logger.error("Error connection: " + a);
            e.printStackTrace();
            return null;
        }

        ActionResult result = ActionResult.OK_JSON;
        JSONObject json = new JSONObject(response.toString());
        result.setJson(json);
        return result;

    }

}