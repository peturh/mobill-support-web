var models = require('./models.js');

var opensourceModel = models.getOpenSourceModel();


module.exports = {


    readAll: function (callback) {
        opensourceModel.find({}, null, function (err, data) {
            if (err) {
                callback(err);
            }
            else {
                console.log("Get all: ", data);
                callback(data);
            }

        }).exec();
    },

    create: function (title, description, licence,licenceText, callback) {
        var opensource = new opensourceModel({
            title: title,
            description: description,
            licence: licence,
            licenceText : licenceText,
            id: generateUUID()
        });
        opensource.save(function (err) {
            if (err) {
                console.log("Error", err);
                callback({"successfull" : false});
            }
            else {
                console.log("Saved entry: " + title + " to db.");
                callback({"successfull": true});

            }
        });
    },

    read: function (id, callback) {
        opensourceModel.find({id: id}, null, function (err, data) {

            if (err) {
                console.log("Error: ", err);
            }
            else {
                callback(data);
            }

        }).exec();

    },

    update: function (id, title, description, licence,liceneText, callback) {

        opensourceModel.findOneAndUpdate({id: id}, {
            title: title,
            description: description,
            licence: licence,
            licenceText : liceneText
        }, function (err, data) {
            if (err) {
                console.log("error ", err)
                callback({error: true})
            }
            callback(data);
        });
    },

    delete: function (id, callback) {

        opensourceModel.remove({id: id}, function (err, data) {
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