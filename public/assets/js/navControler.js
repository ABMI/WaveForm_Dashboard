showGraph("total");

d3.select("#nav_total")
    .on("click", function () {
        showGraph("total");
    });

d3.select("#nav_summary")
    .on("click", function () {
        showGraph("summary");
    });

d3.select("#nav_eicu")
    .on("click", function () {
        showGraph("EICU");
    });

d3.select("#nav_micu")
    .on("click", function () {
        showGraph("MICU");
    });

d3.select("#nav_ticu_a")
    .on("click", function () {
        showGraph("TICUA");
    });

d3.select("#nav_ticu_b")
    .on("click", function () {
        showGraph("TICUB");
    });

d3.select("#nav_ticu_c")
    .on("click", function () {
        showGraph("TICUC");
    });


d3.select("#nav_tor")
    .on("click", function () {
        showGraph("TOR");
    });



d3.select("#nav_3icua")
    .on("click", function () {
        showGraph("3ICUA");
    });


d3.select("#nav_3icub")
    .on("click", function () {
        showGraph("3ICUB");
    });

function showGraph(section) {
    showStatistic(section);
    showWaveline(section);
    showStorageUsage(section);

    if (section === 'total') {
        showSection(".delimiter");
        showGraphSection(section, config.summary);
        showGraphSection("EICU", config.eicu);
        showGraphSection("MICU", config.micu);
        showGraphSection("TICUA", config.ticua);
        showGraphSection("TICUB", config.ticub);
        showGraphSection("TICUC", config.ticuc);
        showGraphSection("TOR", config.tor);
        showGraphSection("3ICUA", config.thirdicua);
        showGraphSection("3ICUB", config.thirdicub);
    }
    else if (section === 'summary') {
        hideSection(".delimiter");
        hideSection(".row-section");
        showGraphSection(section, config.summary);
    }
    else {
        hideSection(".delimiter");
        hideSection(".row-section");
        hideSection('.row_summary');

        if (section === "EICU") showGraphSection(section, config.eicu);
        if (section === "MICU") showGraphSection(section, config.micu);
        if (section === "TICUA") showGraphSection(section, config.ticua);
        if (section === "TICUB") showGraphSection(section, config.ticub);
        if (section === "TICUC") showGraphSection(section, config.ticuc);
        if (section === "TOR") showGraphSection(section, config.tor);
        if (section === "3ICUA") showGraphSection(section, config.thirdicua);
        if (section === "3ICUB") showGraphSection(section, config.thirdicub);

        // showSection('.row_' + section.replace('-', '_').toLowerCase());
    }
}

function showGraphSection(section, config_p) {
    showMonthlyPatients(section, config_p.month);
    showDailyPatients(section, config_p.day);
    showWaveRate(section, config_p.rate);
    showSection(config_p.section_class);
}

function hideSection(class_name) {
    d3.selectAll(class_name).style("display", "none");
}

function showSection(class_name) {
    d3.selectAll(class_name).style("display", 'inline');
}
