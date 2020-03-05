function showDailyPatients(section, day_config) {
    d3.json("./assets/json/statistic.json", function (error, data) {
        if (error) throw error;

        d3.select(day_config.id).select("g").remove();

        data = Object.entries(data.patient_daily[section]).map(function (d) {
            return {'date': d[0], 'close': d[1]};
        });

        // 아래에 axis-x 없애면서 margin 조절함 axis 넣으려면 아래 margin 설정
        var margin = {top: 10, right: 5, bottom: 5, left: 30};
        var width = 360 - margin.left - margin.right;
        var height = 180 - margin.top - margin.bottom;

        var x = d3.scaleBand().rangeRound([0, width]).padding(0.2),
            y = d3.scaleLinear().rangeRound([height, 0]);

        var tip = d3.tip()
            .attr("class", "d3-tip")
            .offset([-8, 0])
            .html(function (d) {
                return "<strong>" + d.date.substring(0, 4) + "년 " +
                    d.date.substring(4, 6) + "월 " +
                    d.date.substring(6, 8) + "일: " +
                    "</strong> <span style='color:red'>" +
                    d.close + "</span><strong>명</strong>";
            });

        var svg = d3.select(day_config.id)
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 360 180");


        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        // var parseDate = d3.timeParse("%Y%m%d");

        // scale 조절
        x.domain(data.map(function (d) {
            return d.date;
        }));
        y.domain([0, d3.max(data, function (d) {
            return d.close;
        }) * 1.3]);

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
                return x(d.date);
            })
            .attr("y", function () {
                return height;
            })
            .attr("width", x.bandwidth())
            .attr("height", 0)//function(d) { return height - y(d.close); })
            .on("mouseover", tip.show)
            .on("mouseout", tip.hide)
            .transition()
            .duration(500)
            .delay(function (d, i) {
                return i * 50;
            })
            .attr("height", function (d) {
                return height - y(d.close);
            })
            .attr("y", function (d) {
                return y(d.close);
            });
    });
}
