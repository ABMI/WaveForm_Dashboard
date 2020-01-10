var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express=' });
  fs.readFile("public/index.html", function(err, html) {
    if (err) {
      console.log(err);
      throw err;
    }

    res.writeHead(200, {"content-Type": 'text/html'});
    res.write(html);
    res.end();
  });
});

module.exports = router;
