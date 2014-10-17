/**
 * Created by alex on 07.05.14.
 */


var mongoose    = require('mongoose');
var log         = require('./log')(module);
var config      = require('./config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
//var Images = new Schema({
//    kind: {
//        type: String,
//        enum: ['thumbnail', 'detail'],
//        required: true
//    },
//    url: { type: String, required: true }
//});

//var Article = new Schema({
//    title: { type: String, required: true },
//    author: { type: String, required: true },
//    description: { type: String, required: true },
//    images: [Images],
//    modified: { type: Date, default: Date.now }
//});

var Ritual = new Schema({
    userId: { type: Number, required: true},
    title: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true }, // дата начала применения практики
    dayTime: { type: Date, required: true }, // время дня когда надо делать
    donePoints: { type: Number, required: true},
    missPoints: { type: Number, required: true},
    workDays: {type: String, required: true} // дни недели, когда надо делать, пример: [1111100] - only work days
});

var RitualProgressInfo = new Schema({
    // points - сохраняются по значению, а не ссылка на ритуал. Так как points могут быть впоследствии изменены в самом ритуале
    points: {type: Number, required: true},
    // Поле '_id' из схемы Ritual
    ritId: {type: String, required: true},
    // title - сохраняется на момент сохранения выполнения ритуала, так как впоследствии ритуал может быть удален например
    title: {type: String, required: true}
});

var DayProgress = new Schema({
    date: {type: Date, required: true},
    doneRituals: [RitualProgressInfo],
    rejectedRituals: [RitualProgressInfo],
    energy: {type: Number, required: false}
});

var TotalProgress = new Schema({
    userId: {type: Number, required: true},
    points: {type: Number, required: true},
    correction: {type: Number, required: false}
});

// validation
//Article.path('title').validate(function (v) {
//    return v.length > 5 && v.length < 70;
//});

var RitualModel = mongoose.model('Ritual', Ritual);
module.exports.RitualModel = RitualModel;

var DayProgressModel = mongoose.model('DayProgress', DayProgress);
module.exports.DayProgressModel = DayProgressModel;

var RitualProgressInfoModel = mongoose.model('RitualProgressInfo', RitualProgressInfo);
module.exports.RitualProgressInfoModel = RitualProgressInfoModel;

var TotalProgressModel = mongoose.model('TotalProgress', TotalProgress);
module.exports.TotalProgressModel = TotalProgressModel;