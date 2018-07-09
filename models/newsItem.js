const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// NewsItem Schema
const NewsItemSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
});

const NewsItem = module.exports = mongoose.model('NewsItem', NewsItemSchema);

module.exports.getNewsItemById = function (id, callback) {
    NewsItem.findById(id, callback);
};

module.exports.getNewsItemByName = function (NewsItemName, callback) {
    const query = {NewsItemName: NewsItemName};
    NewsItem.findOne(query, callback);
};

// module.exports.getAllNewsItems = function (callback) {
//     NewsItem.find({}, function (err, docs) {
//         if(err){
//             console.log(err);
//         }else{
//             res.render('newsItem-list', {
//                 id : NewsItem.map(function(doc){
//                     return doc._id
//                 })
//             });
//             console.log('retrieved list of names' + docs.name);
//         }
//     });
// };

module.exports.addNewsItem = function (newNewsItem, callback) {
    newNewsItem.save(callback);
}
