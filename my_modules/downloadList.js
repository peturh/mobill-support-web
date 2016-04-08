var models = require('./models.js');

var downloadModel = models.getDownloadModel();


module.exports = {


    readAll: function (callback) {
        downloadModel.find({}, null, function (err, data) {
            if (err) {
                callback(err);
            }
            else {
                console.log("Get all: ", data);
                callback(data);
            }

        }).exec();
    },

    create: function (title, description ,url,type, callback) {
        var download = new downloadModel({
            title: title,
            description: description,
            url : url,
            type : type,
            id: generateUUID()
        });
        download.save(function (err) {
            if (err) {
                console.log("Error", err);
            }
            else {
                console.log("Saved entry: " + title + " to db.");
            }
        });
        callback({"successfull": true});
    },

    read: function (id, callback) {
        downloadModel.find({id: id}, null, function (err, data) {

            if (err) {
                console.log("Error: ", err);
            }
            else {
                callback(data);
            }

        }).exec();

    },

    update: function (id, title,type, description, url, callback) {

        downloadModel.findOneAndUpdate({id: id}, {
            title: title,
            type : type,
            description: description,
            url: url
        }, function (err, data) {
            if (err) {
                console.log("error ", err);
                callback({error: true})
            }
            callback(data);
        });
    },

    delete: function (id, callback) {

        downloadModel.remove({id: id}, function (err, data) {
            if (err) {
                console.log("error ", err);
                callback();
            }
            console.log("Data in approveAdmin ", data);
            callback(data);
        }).exec();
    }

};


function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}