function showStorageUsage() {
    d3.json("assets/json/statistic.json", function (error, data) {
        if (error) throw error;

        d3.select("#storage_usage").select("g").remove();

        data = data.storage;

        var margin = {top: 20, right: 20, bottom: 50, left: 50};
        var width = 1057 - margin.left - margin.right;
        var height = 400 - margin.top - margin.bottom;

        var color = d3.scaleOrdinal()
            .range(colorbrewer.OrRd[3]);

        var stack = d3.stack().offset(d3.stackOffsetExpand);

        var svg = d3.select("#storage_usage")
            .attr("preserveAspectRatio", "xMinYMin meet")
            .attr("viewBox", "0 0 1057 370");


        var g = svg.append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var showUsage = function (d) {
            g.append("text")
                .attr("class", "diskText")
                .attr("y", function () {
                    return y(d.data.drive)
                })
                .attr("transform", "translate(50, 10)")
                .attr("dy", ".35em")
                .style("font-size", "40px")
                .style("fill", "#FFFFFF")   // 회색
                .style("font-weight", "200")
                .text(function () {
                    return "Total: " + bytesToSize(d.data.total) +
                        ", Used: " + bytesToSize(d.data.used) +
                        ", Free: " + bytesToSize(d.data.free);
                });
        };

        var hideUsage = function () {
            svg.selectAll(".diskText").remove();
        };

        var x = d3.scaleLinear().rangeRound([0, width]);

        var y = d3.scaleBand()
            .rangeRound([0, height])
            .padding(0.1)
            .align(0.1);

        y.domain(data.map(function (d) {
            return d.drive;
        }));

        var getColorDomain = function (array) {
            var domain_list = [];

            array.forEach(function (elem) {
                domain_list.push(elem.drive);
            });
            return domain_list;
        };

        color.domain(getColorDomain(data));

        // 파란색 막대
        var serie = g.selectAll(".serie")
            .data(stack.keys(getColorDomain(data))(data))
            .enter().append("g")
            .attr("class", "serie")
            .attr("fill", "#3FB9FE");

        serie.selectAll("rect")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", 2)
            .attr("y", function (d) {
                return y(d.data.drive) + 25;
            })
            .attr("height", y.bandwidth() - 50)
            .attr("width", 0)
            .on("mouseover", showUsage)
            .on("mouseout", hideUsage).transition()
            .duration(1000)
            .delay(function (d, i) {
                return i * 200;
            })
            .attr("width", function (d) {
                return x(d.data.used / d.data.total) - x(d[0]);
            });

        // 파란색 막대가 아닌 부분에 mouse over 했을 때, storage information을 보여주기 위한 영역
        var serie1 = g.selectAll(".serie1")
            .data(stack.keys(getColorDomain(data))(data))
            .enter().append("g")
            .attr("class", "serie1")
            .attr("fill", "#2B2B2B");

        serie1.selectAll("rect1")
            .data(function (d) {
                return d;
            })
            .enter().append("rect")
            .attr("x", function (d) {
                return 2 + x(d.data.used / d.data.total)
            })
            .attr("y", function (d) {
                return y(d.data.drive);
            })
            .attr("height", y.bandwidth())
            .attr("width", function (d) {
                return x(d.data.free / d.data.total) - x(d[0])
            })
            .on("mouseover", showUsage)
            .on("mouseout", hideUsage);

        // axis x
        g.append("g")
            .attr("class", "axis axis-x")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(4, "%"))
            .selectAll("text")
            .attr("dy", "1em");

        // axis y
        g.append("g")
            .attr("class", "axis axis--y")
            .call(d3.axisLeft(y));
    });
}
