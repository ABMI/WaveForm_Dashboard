function showWaveline(section) {
    d3.json("assets/json/statistic.json", function (error, data) {
        if (error) throw error;

        d3.select("#wave_line").select("g").remove();
        var parseDate = d3.timeParse("%Y%m%d");

        var wave_trand = Object.entries(data.wave_trand[section]).map(function (d) {
            return {'date': parseDate(d[0]), 'count': d[1]};
        });

        var margin = {top: 20, right: 20, bottom: 50, left: 80};
        var width = 1057 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;
        var svg = d3.select("#wave_line")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1057 370");

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x = d3.scaleTime().rangeRound([0, width]);
        var y = d3.scaleLinear().rangeRound([height, 0]);

        var line = d3.line()
            .x(function (d) {
                return x(d.date);
            })
            .y(function (d) {
                return y(d.count);
            });

        x.domain(d3.extent(wave_trand, function (d) {
            return d.date;
        }));
        y.domain(d3.extent(wave_trand, function (d) {
            return d.count;
        }));

        // axis x
        g.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(5))
            .selectAll("text")
            .attr("dy", "1em");

        // axis y
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));

        // draw wave-graph line
        var path = g.append("path")
            .datum(wave_trand)
            .attr("class", "line")
            .attr("d", line)
            .attr("stroke-width", "2")
            .style("stroke", "#3FB9FE") // 파랑
            .style("fill", "none")
            .attr("height", function (d) {
                return (height - y(d.value));
            });

        // draw graph progressively
        var totalLength = path.node().getTotalLength();

        path.attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength)
            .transition()
            .duration(1500)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
    });
}

