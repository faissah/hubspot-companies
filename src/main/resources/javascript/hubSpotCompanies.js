$( document ).ready(function() {
    $(".hubSpotCompanies").each(function(){
        var currentID = "#"+$(this).attr("id");
        jQuery.ajax({
            url: $(this).data("url")+".loadCompanies.do",
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                var table = new Tabulator(currentID, {
                    data:cleanJSON(data.results), //assign data to table
                    autoColumns:true, //create columns from data field names
                });
            }
        });
});
});

function cleanJSON(data){
    const newTable = [];
    for(let i = 0, l = data.length; i < l; i++) {
            newTable.push(data[i].properties);
    };
    return newTable;
}