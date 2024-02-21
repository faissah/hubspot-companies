<%@ taglib prefix="jcr" uri="http://www.jahia.org/tags/jcr" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="utility" uri="http://www.jahia.org/tags/utilityLib" %>
<%@ taglib prefix="template" uri="http://www.jahia.org/tags/templateLib" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%--@elvariable id="currentNode" type="org.jahia.services.content.JCRNodeWrapper"--%>
<%--@elvariable id="out" type="java.io.PrintWriter"--%>
<%--@elvariable id="script" type="org.jahia.services.render.scripting.Script"--%>
<%--@elvariable id="scriptInfo" type="java.lang.String"--%>
<%--@elvariable id="workspace" type="java.lang.String"--%>
<%--@elvariable id="renderContext" type="org.jahia.services.render.RenderContext"--%>
<%--@elvariable id="currentResource" type="org.jahia.services.render.Resource"--%>
<%--@elvariable id="url" type="org.jahia.services.render.URLGenerator"--%>
<template:addResources resources="hubSpotCompanies.css" type="css"/>
<template:addResources resources="chart.js" type="javascript"/>
<template:addResources resources="chart-script.js" type="javascript"/>

<c:set var="title" value="${currentNode.properties['jcr:title'].string}"/>
<c:set var="description" value="${currentNode.properties['jcr:description'].string}"/>
<c:set var="chartLabel" value="${currentNode.properties['chartLabel'].string}"/>


<div class="shadow-box">
    <h3>${title} - <c:out value="${fn:replace(chartLabel, '_', ' ')}"/>
    </h3>
    <canvas id="chart-${currentNode.identifier}" class="bar-chart" data-url="${url.base}${currentNode.path}"
            data-param="${chartLabel}"></canvas>
</div>