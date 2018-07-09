const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const NewsItem = require('../models/newsItem');


// Create News Item
router.post('/create', function(req, res, next) {
    var newNewsItem = new NewsItem({
        title: req.body.title,
        content: req.body.content
    });

    NewsItem.addNewsItem(newNewsItem, function(err, user) {
        if (err) {
            res.json({success: false, msg:'Failed to create news item. Error:'+err});
        } else {
            res.json({success: true, msg:'Item created'});
        }
    })
});

router.get('/all', function (req, res) {
    // NewsItem.getAllNewsItems({}, function (err, newsItems) {
    //     res.json(newsItems);
    // })

    NewsItem.find({}, function(err, newsItems){
        if(err){
            console.log(err);
        }else {
            res.send(200, {
                title: 'Noticias',
                articles: newsItems
            });
        }
    });
});

// News Details GET
router.get('/:id', function(req, res, next){
    res.json({newsItem: NewsItem.getNewsItemById(req.params.id)})
});


module.exports = router;