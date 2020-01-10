var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);

router.post('/', function(req, res, next) {
    let fileBasePath = `${appDir}/public/assets/json/`;
    let fileName = `${fileBasePath}statistic.json`;
    let dateLabel = new Date().toISOString().slice(0, 19).replace(/-/g, "").replace(/T/g, "").replace(/:/g, "");

    try {
        fs.stat(fileName, function (err, stats) {
            // if (err) throw err;

            if (stats) {
//                fs.copyFile(fileName, `${fileBasePath}statistic_${dateLabel}.json`, (err) => {
//                    if (err) throw err;
//                    console.log('Copy Success');
//                });
            }

            fs.writeFile(fileName, JSON.stringify(req.body), function (error) {
                if (error) throw error;
            });
        });
        
    } catch (err) {
        throw err;
    } finally {
        res.end();
    }
});

module.exports = router;
