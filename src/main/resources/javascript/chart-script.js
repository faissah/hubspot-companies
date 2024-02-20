$(document).ready(function () {
    $(".chartId").each(function () {
        var currentID = "#" + $(this).attr("id");
        var dataSourceUrl = $(this).data("url") + ".loadCompanies.do";

        jQuery.ajax({
            url: dataSourceUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let stageValues = {};

                data.results.forEach(item => {
                    const stage = item.properties.stage_of_the_account;
                    const value = parseInt(item.properties.the_value_of_the_account, 10);

                    if (stageValues[stage]) {
                        stageValues[stage] += value;
                    } else {
                        stageValues[stage] = value;
                    }
                });

                const labels = Object.keys(stageValues).sort();
                const values = labels.map(label => stageValues[label]);

                const ctx = $(currentID).get(0).getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: labels, // Labels for the X-axis
                        datasets: [{
                            label: 'Current Pipe per Stage', // Legend label
                            data: values, // Your values
                            backgroundColor: [
                                // Define colors for each bar (optional)
                                'rgba(255, 182, 193, 0.6)',
                                'rgba(199, 150, 255, 0.6)',
                                'rgba(135, 206, 250, 0.6)',
                                'rgba(162, 255, 204, 0.6)'
                            ],
                            borderColor: [
                                // Border colors for each bar (optional)
                                'rgba(255, 182, 193, 1)',
                                'rgba(199, 150, 255, 1)',
                                'rgba(135, 206, 250, 1)',
                                'rgba(162, 255, 204, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true // Y-axis begins at 0
                            }
                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: " + error);
            }
        });
    });

    $(".chart-donutsId").each(function () {
        var currentID = "#" + $(this).attr("id");
        var dataSourceUrl = $(this).data("url") + ".loadCompanies.do";

        jQuery.ajax({
            url: dataSourceUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let stageValues = {};

                data.results.forEach(item => {
                    const stage = item.properties.stage_of_the_account;
                    const value = parseInt(item.properties.the_value_of_the_account, 10);

                    if (stageValues[stage]) {
                        stageValues[stage] += value;
                    } else {
                        stageValues[stage] = value;
                    }
                });

                const labels = Object.keys(stageValues).sort();
                const values = labels.map(label => stageValues[label]);
                const backgroundColors = [
                    'rgba(255, 182, 193, 0.6)',
                    'rgba(199, 150, 255, 0.6)',
                    'rgba(135, 206, 250, 0.6)',
                    'rgba(162, 255, 204, 0.6)'
                ];
                const ctx = $(currentID).get(0).getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: labels, // Labels for the X-axis
                        datasets: [{
                            label: 'Current Pipe per Stage', // Legend label
                            data: values, // Your values
                            backgroundColor: backgroundColors,
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: false,
                                text: 'Donut Chart Example'
                            }
                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: " + error);
            }
        });
    });

    $(".chart-pieId").each(function () {
        var currentID = "#" + $(this).attr("id");
        var dataSourceUrl = $(this).data("url") + ".loadCompanies.do";

        jQuery.ajax({
            url: dataSourceUrl,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                let stageValues = {};

                data.results.forEach(item => {
                    const stage = item.properties.stage_of_the_account;
                    const value = parseInt(item.properties.the_value_of_the_account, 10);

                    if (stageValues[stage]) {
                        stageValues[stage] += value;
                    } else {
                        stageValues[stage] = value;
                    }
                });

                const labels = Object.keys(stageValues).sort();
                const values = labels.map(label => stageValues[label]);
                const backgroundColors = [
                    'rgba(255, 182, 193, 0.6)',
                    'rgba(199, 150, 255, 0.6)',
                    'rgba(135, 206, 250, 0.6)',
                    'rgba(162, 255, 204, 0.6)'
                ];
                const ctx = $(currentID).get(0).getContext('2d');
                const myChart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: labels, // Labels for the X-axis
                        datasets: [{
                            label: 'Current Pipe per Stage', // Legend label
                            data: values, // Your values
                            backgroundColor: backgroundColors,
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                position: 'top',
                            },
                            title: {
                                display: false,
                                text: 'Donut Chart Example'
                            }
                        }
                    }
                });
            },
            error: function (xhr, status, error) {
                console.error("Error fetching data: " + error);
            }
        });
    });
});
