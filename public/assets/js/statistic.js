function showStatistic(section) {
    d3.json("./assets/json/statistic.json", function (error, data) {
        if (error) throw error;

        var sumOfTotal = function (array) {
            var total = 0;

            array.forEach(function (element) {
                total += element.total;
            });

            return total;
        };

        var sumOfUsed = function (array) {
            var used = 0;

            array.forEach(function (element) {
                used = used + element.used;
            });

            return used;
        };

        var total_storage = sumOfTotal(data.storage);
        var used_storage = sumOfUsed(data.storage);
        var percent_storage = used_storage / total_storage;
        var patient_year = Math.round(data.wave_rows[section] * 10 / 60 / 24 / 365);
        var duration = 1500;

        d3.select("#total_patients")
            .transition()
            .duration(duration)
            .tween("text", textTween(data.total_patients[section]));


        d3.select("#monitoring_days")
            .transition()
            .duration(duration)
            .tween("text", textTween(data.day_count[section]));


        d3.select("#total_rows")
            .transition()
            .duration(duration)
            .tween("text", textTween(data.total_rows[section]));


        d3.select("#total_wave")
            .transition()
            .duration(duration)
            .tween("text", textTween(data.wave_rows[section]));

        d3.select("#patient_year")
            .transition()
            .duration(duration)
            .tween("text", textTween(patient_year, "decimal"));

        d3.select("#storage_percent")
            .transition()
            .duration(duration)
            .tween("text", textTween(percent_storage, "decimal_percent"));

        d3.select("#storage_total")
            .text("  (Total " + bytesToSize(total_storage));

        d3.select("#storage_used")
            .text(", Used: " + bytesToSize(used_storage) + ")");
    });
}


var format_int = d3.format(",d");
var format_decimal = d3.format(",.1f");
var format_decimal_percent = d3.format(".1%");

function textTween(value, option) {
    return function () {
        var that = d3.select(this);
        var i = d3.interpolate(0, value);
        return function (t) {
            switch (option) {
                case "decimal":
                    return that.text(format_decimal(i(t)));
                case "decimal_percent":
                    return that.text(format_decimal_percent(i(t)));
                default:
                    return that.text(format_int(i(t)));
            }
        };
    }
}

function bytesToSize(bytes) {
    if (bytes < 1024) return bytes + "Bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + "K";
    else if (bytes < 1073741824) return (bytes / 1048576).toFixed(1) + "M";
    else if (bytes < 1099511627776) return (bytes / 1073741824).toFixed(1) + "G";
    else return (bytes / 1099511627776).toFixed(1) + "T";
}