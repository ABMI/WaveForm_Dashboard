function showWaveRate(section, rate_config) {
    d3.json("assets/json/statistic.json", function (error, data) {
        if (error) throw error;

        d3.select(rate_config.id).select("g").remove();

        var wave_rows = data.wave_rows[section];

        data = Object.entries(data.wave_type[section]).map(function (d) {
            return {'wavetype': d[0], 'count': d[1]};
        });

        // data.count 값으로 sort
        data.sort(function (a, b) {
            return b.count - a.count;
        });

        var width = 180;
        var height = 180;
        var margin = {left: (360 - 180) / 2};
        var outerRadius = width / 2;
        var innerRadius = width / 3;

        var color = d3.scaleOrdinal()
            .range(colorbrewer.Spectral[12]);

        var arc = d3.arc()
            .outerRadius(outerRadius)
            .innerRadius(innerRadius);

        // mouse over 했을 때, 변한 ring
        var arcOver = d3.arc()
            .innerRadius(innerRadius * 0.9)
            .outerRadius(outerRadius);

        var pie = d3.pie()
            .value(function (d) {
                return d.count;
            });

        var svg = d3.select(rate_config.id)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 360 180")
            .append("g")
            .attr("transform", "translate(" + (width / 2 + margin.left) + ","
                + height / 2 + ")");

        var showPercent = function (data) {
            g.append("text")
                .attr("class", "percentText" + rate_config.ticu)
                .attr("transform", function () {
                    var percentage = data.count / wave_rows * 100;
                    var diff = percentage >= 10 ? -47 : -35;
                    return "translate(" + diff + ", 0)"
                })
                .attr("dy", ".35em")
                .style("font-size", "33px")
                .style("fill", "#C6C6C6")   // 회색
                .style("font-weight", "600")
                .text(function () {
                    var percentage = data.count / wave_rows * 100;
                    return percentage.toFixed(1) + "%"
                });

            d3.selectAll(".ringPath" + rate_config.ticu)
                .transition()
                .duration(200)
                .attr("d", function (d) {
                    if (data.wavetype === d.data.wavetype)
                        return arcOver(d);
                    else
                        return arc(d);
                });
        };

        var hidePercent = function () {
            svg.selectAll(".percentText" + rate_config.ticu).remove();

            d3.selectAll(".ringPath" + rate_config.ticu)
                .transition()
                .duration(200)
                .attr("d", arc);
        };

        var g = svg.selectAll(".arc" + rate_config.ticu)
            .data(pie(data))
            .enter().append("g")
            .attr("class", "arc" + rate_config.ticu);

        g.append("path")
            .attr("class", "ringPath" + rate_config.ticu)
            .attr("d", arc)
            .style("fill", function (d) {
                return color(d.data.wavetype);
            })
            .style("opacity", 0.9)
            .on("mouseover", function (d) {
                showPercent(d.data);
            })
            .on("mouseout", function (d) {
                hidePercent(d.data);
            });


        data.sort(function (a, b) {
            return b.count - a.count;
        });


        var legend = svg.selectAll(".legend" + rate_config.ticu)
            .data(data)
            .enter().append("g")
            .attr("class", "legend" + rate_config.ticu)
            .attr("transform", function (d, i) {
                return "translate(0, " + i * 11 + ")";
            });

        legend.append("rect")
            .attr("rx", 1)
            .attr("ry", 1)
            .attr("x", width - 10)
            .attr("y", -65)
            .attr("width", 15)
            .attr("height", 10)
            .style("fill", function (d) {
                return color(d.wavetype)
            })
            .style("opacity", 0.9)
            .on("mouseover", showPercent)
            .on("mouseout", hidePercent);

        legend.append("text")
            .attr("x", width - 20)
            .attr("y", -60)
            .attr("dy", ".35em")
            .style("font-size", "10px")
            .style("text-anchor", "end")
            .attr("class", "le-text")
            .text(function (d) {
                return d.wavetype;
            })
            .on("mouseover", showPercent)
            .on("mouseout", hidePercent);
    });
}
