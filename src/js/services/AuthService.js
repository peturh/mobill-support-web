/**
 * Created by petur on 2015-04-23.
 */
app.factory('AuthService', ['$http', function ($http) {
    var user;

    return {
        login: function (user) {
            var request = {
                username: user.username,
                password: user.password
            };
            return $http({
                method: 'POST',
                url: "support/login",
                data: request
            }).success(function (data, status) {
                return data;
            })
                .error(function (data, status) {

                    return "Request failed";
                });
        },
        register: function (newUser) {
            var request = {
                password: newUser.password,
                username: newUser.username,
                description: newUser.description,
                type : newUser.type,
                user: user
            };
            return $http({
                method: 'POST',
                url: "support/register",
                data: request
            }).success(function (data, status) {
                console.log("data in AuthService", data);
                return data;
            })
                .error(function (data, status) {

                    return "Request failed";
                });
        },
        logout: function (aUser) {
            user = aUser;
        },
        setUser: function (aUser) {
            user = aUser;
        },
        setAdmin: function () {
            type = "admin";
        },
        setRegistered: function () {
            type = "user";
        },
        getUser: function () {
            return user;
        },
        isLoggedIn: function () {
            return (user) ? user : false;
        },
        isAdmin: function () {
            if (typeof user !== "undefined") {
                return user.type === "admin";
            }
        },
        isUser: function () {
            if (typeof user !== "undefined") {
                if(user.type === "admin"){
                    return "admin";
                }
                else if(user.type === "user"){
                    return "user";
                }
                else{
                    return false;
                }
            }
        },
        isGuest: function () {
            if (typeof user !== "undefined") {
                return user.type === "guest";
            }
        }
    };
}]);