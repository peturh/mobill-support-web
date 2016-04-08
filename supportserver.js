/**
 * Created by petur on 2015-09-11.
 */

/*

 All the dependencies

 */
var express = require('express');
var path = require('path');
var app = require('express')();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

/*

 Own written classes

 */

var users = require('./my_modules/users.js');
var downloadList = require('./my_modules/downloadList.js');
var opensourceList = require('./my_modules/opensourceList.js');
var sessions = require('./my_modules/sessions.js');


app.use(express.static(path.join(__dirname, '/src/')));
app.use(bodyParser.json());       // to support JSON-encoded bodies

server.listen('9093', function () {
    console.log("App listening on port 9093");
});

mongoose.connect("mongodb://localhost:27017/support");


/*
 REGISTER AND LOGIN
 */

app.post('/support/login', function (req, res) {

        users.login(req.body.username, req.body.password, function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        });
    }
);


app.post('/support/register', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                users.register(req.body.username, req.body.password, req.body.description, req.body.type, function (data) {
                    res.send(data);
                });
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);

/*
 USERS
 */

app.post('/support/user/edit', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
                if (ok) {
                    users.edit(req.body.changeUser, function (data) {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(data);
                    })
                }
                else {
                    res.sendStatus(401);
                }
            }
        );
    }
);

app.post('/support/users', function (req, res) {
    sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                users.getAll(function (data) {
                    console.log("data in get", data);
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                })
            }
            else {
                res.sendStatus(401);
            }

        }
    );
});

app.post('/support/user/edit', function (req, res) {

    }
);

/*

 OPENSOURCE
 */


app.get('/support/opensource', function (req, res) {
        opensourceList.readAll(function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(data);
        })
    }
);

app.post('/support/opensource/create', function (req, res) {
    sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                opensourceList.create(req.body.title, req.body.description, req.body.licence, req.body.licenceText, function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                });
            }
            else {
                res.sendStatus(401);
            }


        }
    );
});

app.post('/support/opensource/read', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                opensourceList.read(req.body.id, function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                })
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);


app.post('/support/opensource/update', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                opensourceList.update(req.body.id, req.body.title, req.body.description, req.body.licence, req.body.licenceText, function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                })
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);


app.post('/support/opensource/delete', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                opensourceList.delete(req.body.id, function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                })
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);

/*
 DOWNLOADS
 */

app.post('/support/download', function (req, res) {
        console.log("req.body", req.body);
        sessions.check(req.body.user.token, req.body.user.type, "user", function (ok) {
            if (ok) {
                downloadList.readAll(function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                })
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);
app.post('/support/download/create', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                downloadList.create(req.body.title, req.body.description, req.body.url, req.body.type, function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                });
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);

app.post('/support/download/read', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                downloadList.read(req.body.id, function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                })
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);


app.post('/support/download/update', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                downloadList.update(req.body.id, req.body.title, req.body.type, req.body.description, req.body.url, function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                })
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);


app.post('/support/download/delete', function (req, res) {
        sessions.check(req.body.user.token, req.body.user.type, "admin", function (ok) {
            if (ok) {
                downloadList.delete(req.body.id, function (data) {
                    res.setHeader('Content-Type', 'application/json');
                    res.send(data);
                })
            }
            else {
                res.sendStatus(401);
            }
        });
    }
);


app.get('/support/initiate/createAdmin', function (req, res) {
        users.register("admin", "password", "this is the first user", "admin", function (data) {
            res.send(data);
        });
    }
);

/**
 * Check if users sessions are valid
 */

setInterval(sessions.checkAll, 60 * 100);


