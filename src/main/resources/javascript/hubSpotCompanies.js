

$(document).ready(function () {
    $(".hubSpotCompanies").each(function () {
        var currentID = "#" + $(this).attr("id");
        jQuery.ajax({
            url: $(this).data("url") + ".loadCompanies.do",
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                var table = new Tabulator(currentID, {
                    data: cleanJSON(data.results), //assign data to table
                    //  autoColumns:true, //create columns from data field names
                    layout: "fitColumns",
                    columns: [
                        {title: "Company Name", field: "name"}, //column has a fixed width of 100px;
                        {
                            title: "Amount", field: "the_value_of_the_account", formatter: "money", formatterParams: {
                                decimal: ",",
                                thousand: ".",
                                symbol: "£",
                                symbolAfter: "p",
                                negativeSign: true,
                                precision: false,
                            }, hozAlign: "center"
                        }, //column will be allocated 1/5 of the remaining space
                        {
                            title: "Commission", field: "commission_rate", mutator: function (value, data) {
                                return value * 100 + " %";
                            }, hozAlign: "center"
                        },
                        {title: "Stage", field: "stage_of_the_account"},
                        {title: "Insurance Product", field: "insurance_product"},
                        {title: "Last Update", field: "hs_lastmodifieddate", mutator: function (value, data) {
                                const isoDateString = value;
                                const date = new Date(isoDateString);
                                const formatter = new Intl.DateTimeFormat('en-US', {
                                    month: 'long', // Full month name
                                    day: '2-digit', // Two-digit day
                                    year: 'numeric', // Four-digit year
                                });
                                return formatter.format(date);
                            }
                        }, // column has a default widthGrow of 1 and will be allocated 1/5 of the remaining space
                    ]
                });
            }
        });
    });
});

function cleanJSON(data) {
    const newTable = [];
    for (let i = 0, l = data.length; i < l; i++) {
        newTable.push(data[i].properties);
    }
    ;
    return newTable;
}