var mongoose = require("mongoose");
var models = require('./models.js');
var SHA512 = require('crypto-js/sha512');
var crypto = require('crypto-js');
var moment = require('moment');
var sessions = require('./sessions.js');

var userModel = models.getUsersModel();

module.exports = {

    login: function (username, password, callback) {
        userModel.findOne({'username': username}, null, function (err, data) {
            console.log(username);
            console.log(password);
            console.log(SHA512(data.salt + password).toString())
            console.log(data);
            if (err) {
                console.log("Error: ", err);
                callback(err);
            }
            if (data !== null && data.password === SHA512(data.salt + password).toString()) {
                sessions.save(data.username, data.type, function (token) {
                    callback({successfull: true, type: data.type, username: data.username, token: token});

                });
            }
            else {
                callback({successfull: false});
            }


        }).exec();
    },

    getAll: function (callback) {
        userModel.find({}, null, function (err, data) {
                if (err) {
                    callback(err);
                }
                else {
                    var users = [];

                    for (var i = 0; i < data.length; i++) {
                        var user = {
                            id: data[i].id,
                            username: data[i].username,
                            description: data[i].description,
                            type: data[i].type
                        };
                        users.push(user);
                    }
                    callback(users);
                }
            }
        ).exec();
    },

    edit: function (user, callback) {

        userModel.findOneAndUpdate({id: user.id}, {
            username: user.username,
            type: user.type,
            description: user.description
        }, function (err, data) {
            if (err) {
                console.log("error ", err);
                callback({successfull: false});
            }
            console.log("data ", data);
            callback({successfull: true});
        });
    },

    remove: function (id, callback) {
        userModel.remove({id: id}, function (err) {
            if (err) {
                console.log(err);
                callback({successfull: false, error: err});
            }
            callback({successfull: true});
        }).exec();
    },

    register: function (username, password, description, type, callback) {

        userModel.findOne({'username': username}, null, function (err, data) {
            if (err) {
                console.log("error ", err);
                callback({"successfull": false, "type": data.type, error: err});

            }
            else {
                if (data === null) {
                    var salt = crypto.lib.WordArray.random(128 / 8);
                    console.log(salt);
                    var user = new userModel({
                        username: username,
                        password: SHA512(salt + password),
                        description: description,
                        type: type,
                        salt: salt,
                        id: generateUUID()
                    });
                    console.log("registered user with pass",user.password);
                    user.save(function (err) {
                        if (err) {
                            console.log("Error", err);
                        }
                        else {
                            console.log("Saved user: " + username + " to db.");
                        }
                    });
                    console.log("data ", data);
                    callback({"successfull": true});
                }
                else{
                    /*
                    A user with that name existed.
                     */
                    console.log("A user with name: "+username+ " existed. Did not register user.");
                    callback({"successfull": false});

                }
            }

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