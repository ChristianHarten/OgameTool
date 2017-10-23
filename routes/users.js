let express = require('express');
let router = express.Router();
let searched = false;
let queryParam;

router.get('/', function (req, res, next) {
    if (req.query)
    {
        searched = true;
        queryParam = req.query.name;
    }
    res.render('users', {title: 'Ogame Tool - User Search', name: queryParam});
});

module.exports = router;