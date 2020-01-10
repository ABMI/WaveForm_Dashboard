function showMonthlyPatients(section, month_config) {
    d3.json("assets/json/statistic.json", function (error, data) {
        if (error) throw error;
        d3.select("#patient_month_" + section).select("g").remove();

        data = Object.entries(data.patient_monthly[section]).slice(-7).map(function (d) {
            return {'date': d[0], 'close': d[1]};
        });

        var margin = {top: 10, right: 5, bottom: 40, left: 30};
        var width = 360 - margin.left - margin.right;
        var height = 180 - margin.top - margin.bottom;

        var x = d3.scaleBand().rangeRound([0, width]).padding(0.1),
            y = d3.scaleLinear().rangeRound([height, 0]);

        var tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-8, 0])
            .html(function (d) {
                return "<strong>" + d.date.substring(0, 4) + "년 " +
                    d.date.substring(4, 6) + "월: </strong>" +
                    "<span style='color:red'>" +
                    d.close + "</span><strong>명</strong>";
            });

        var svg = d3.select(month_config.id)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 360 180");

        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        x.domain(data.map(function (d) {
            return d.date;
        }));

        y.domain([0, d3.max(data, function (d) {
            return d.close;
        }) * 1.2]);

        g.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
            .attr("transform", "rotate(-40)")
            .attr("x", 6)
            .attr("y", 10)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end");

        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Number");


        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function (d) {
                return x(d.date) + 8;
            })
            .attr("y", height)
            .attr("width", x.bandwidth() - 15)
            .attr("height", 0)
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .transition()
            .duration(1000)
            .delay(function (d, i) {
                return i * 200;
            })
            .attr("height", function (d) {
                return height - y(d.close);
            })
            .attr("y", function (d) {
                return y(d.close);
            });
    });
} 
