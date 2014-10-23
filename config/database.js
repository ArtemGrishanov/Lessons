// config/database.js
module.exports = {

    // looks like mongodb://<user>:<pass>@mongo.onmodulus.net:27017/Mikha4ot
//    'url' : 'mongodb://localhost/Lessons'
    'url' :process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/Lessons'

};
