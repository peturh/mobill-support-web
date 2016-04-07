var mongoose = require("mongoose");

var schema = mongoose.Schema;

var openSourceSchema = new schema({
    id: String,
    title: String,
    description : String,
    licence : String,
    licenceText : String,
    date: {
        type: Date,
        default: Date.now
    }
});
var newsSchema = new schema({
    id : String,
    heading : String,
    text : String,
    date: {
        type: Date,
        default: Date.now
    }
});

var sessionSchema = new schema({
    id : String,
    username : String,
    token : String,
    type : String,
    date : {
        type: Date,
        default : Date.now
    }
});

var downloadSchema = new schema({
    id : String,
    title : String,
    url : String,
    description : String,
    type : String,
    date: {
        type: Date,
        default: Date.now
    }
});

var userSchema = new schema({
    id : String,
    username : String,
    password : String,
    type : String,
    description : String,
    salt : String
});


var openSourceModel = mongoose.model('openSource', openSourceSchema);
var newsModel = mongoose.model('news', newsSchema);
var usersModel = mongoose.model('users',userSchema);
var downloadModel = mongoose.model('downloads', downloadSchema);
var sessionModel = mongoose.model('sessions',sessionSchema);

module.exports = {
    getOpenSourceModel : function(){
        return  openSourceModel
    },
    getSessionModel : function(){
        return sessionModel;
    },
    getUsersModel : function(){
        return  usersModel;
    },

    getDownloadModel : function(){
        return  downloadModel;
    },
    getNewsModel : function(){
        return  newsModel;
    }
};
