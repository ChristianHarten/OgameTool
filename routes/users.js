let apiUrl = 'https://s139-de.ogame.gameforge.com/api/players.xml';

let express = require('express');
let router = express.Router();
let parseString = require('xml2js').parseString;
let syncedRequest = require('sync-request');

let queryParam;
let title = 'Ogame User Search';
let nameProposals;

function fetchNameProposals(queryParam)
{
    nameProposals = [];
    let res = syncedRequest('GET', apiUrl);
    let xml = res.body.toString();

    parseString(xml, function (err, result)
    {
        nameProposals = filterNames(result, queryParam);
        //getPlayerActivity(result, )
    });

    function filterNames(jsonToFilter, filter)
    {
        let filtered = [];
        jsonToFilter['players']['player'].forEach(function (player)
        {
            if (player['$']['name'].toLowerCase().indexOf(filter) >= 0)
            {
                filtered.push(player['$']['name']);
            }
        });
        return filtered;
    }
}

router.get('/', function (req, res, next) {
    if (req.query.search)
    {
        queryParam = req.query.search;
        fetchNameProposals(queryParam);
    }
    res.render('users', {title: title, search: queryParam, proposals: nameProposals});
});

module.exports = router;