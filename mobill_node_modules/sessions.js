var models = require('./models.js');
var moment = require('moment');

var sessionModel = models.getSessionModel();

module.exports = {
    save: function (username, type, callback) {
        var token = generateUUID();
        var session = new sessionModel({
            id: generateUUID(),
            username: username,
            type: type,
            token: token
        });
        session.save(function (err) {
            if (err) {
                console.log("Error", err);
            }
            else {
                console.log("Added user " + username + " to allowed sessions. Valid for 60 minutes.");
                callback(token);
            }
        })
    },
    remove: function (id) {
        console.log("inside remove");
        sessionModel.remove({id: id}, function (err, data) {
            if (err) {
                console.log("error ", err);
            }
        }).exec();
    },
    check: function (token, type, requiredType, callback) {
        sessionModel.findOne({token: token}, null, function (err, data) {
            if (err || data === null) {
                console.log("Err", err);
                callback(false);
            }
            else if (data !== null) {

                if (type === data.type && checkType(requiredType, data.type)) {
                    callback(true);
                }
                else {
                    callback(false);
                }

            }
        }).exec();
    },
    checkAll: function () {
        sessionModel.find({}, null, function (err, data) {
            if (err) {
                console.log("Err", err);
            }
            else {
                for (var i = 0; i < data.length; i++) {
                    var diff = moment().diff(data[i].date, 'minutes');
                    if (diff > 60) {
                        console.log("User " + data[i].username + " no longer has active session, removing.");
                        remove(data[i].id);
                    }
                }
            }
        }).exec();
    }
};

function checkType(requiredType, userType) {
    if (requiredType === 'admin') {
        return userType === "admin";
    }
    else if (requiredType === "user") {
        return userType === "admin" || "user";
    }
    else {
        return false;
    }
}

function remove(id) {
    sessionModel.remove({id: id}, function (err, data) {
        if (err) {
            console.log("error ", err);
        }
        console.log("Removed session:", data.result);
    }).exec();
}
function generateUUID() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}