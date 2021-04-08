"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.LogIn = exports.ShowAll = exports.isValidPassword = exports.checkLoginForm = void 0;
const tslib_1 = require("tslib");
const userSchema_1 = require("../models/userSchema");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const bcrypt_1 = tslib_1.__importDefault(require("bcrypt"));
const jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
const checkLoginForm = (object) => {
    if (!object.login)
        return { error: "There is not login passed" };
    const reg = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (reg.test(object.login))
        return { email: object.login };
    return { login: object.login };
};
exports.checkLoginForm = checkLoginForm;
const isValidPassword = (db_password, password) => {
    return bcrypt_1.default.compareSync(password, db_password);
};
exports.isValidPassword = isValidPassword;
const ShowAll = (request, response) => {
    mongoose_1.default.connection.db.collection("userschemas", function (err, collection) {
        if (err) {
            response.status(400).send(err);
        }
        else {
            collection.find({}).toArray(function (err, data) {
                response.status(200).send(data);
            });
        }
    });
};
exports.ShowAll = ShowAll;
const LogIn = (request, response) => {
    mongoose_1.default.connection.db.collection("userschemas", function (err, collection) {
        if (err) {
            response.status(400).send(err);
        }
        else {
            collection.findOne(exports.checkLoginForm(request.query), function (err, data) {
                if (!data || !exports.isValidPassword(data.password, request.query.password)) {
                    return response.status(401).json({ message: 'Authentication failed. Invalid user or password.' });
                }
                else {
                    return response.json({ token: jsonwebtoken_1.default.sign({
                            _id: data._id,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            email: data.email,
                            password: data.password,
                            login: data.login,
                            role: data.role
                        }, 'Authentication', { expiresIn: '1h' }) });
                }
            });
        }
    });
};
exports.LogIn = LogIn;
const Register = (request, response) => {
    const user = new userSchema_1.User({
        _id: new mongoose_1.default.Types.ObjectId(),
        firstName: request.query.firstName,
        lastName: request.query.lastName,
        email: request.query.email,
        password: bcrypt_1.default.hashSync(request.query.password, 10),
        login: request.query.login,
        role: request.query.role
    });
    user.save()
        .then((item) => {
        response.send("Item saved to DB");
    })
        .catch((err) => {
        response.status(400).send(`Unable to save item ${err}`);
    });
};
exports.Register = Register;
//# sourceMappingURL=authorizationController.js.map