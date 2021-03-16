"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
require('dotenv').config();
const express_1 = tslib_1.__importDefault(require("express"));
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const body_parser_1 = tslib_1.__importDefault(require("body-parser"));
const groupRouter_1 = tslib_1.__importDefault(require("./routes/groupRouter"));
const swagger_ui_express_1 = tslib_1.__importDefault(require("swagger-ui-express"));
const swagger_output_json_1 = tslib_1.__importDefault(require("../swagger_output.json"));
const projectsRouter_1 = tslib_1.__importDefault(require("./routes/projectsRouter"));
const tasksRouter_1 = tslib_1.__importDefault(require("./routes/tasksRouter"));
const authorizationRouter_1 = tslib_1.__importDefault(require("./routes/authorizationRouter"));
const announcementsRouter_1 = tslib_1.__importDefault(require("./routes/announcementsRouter"));
const app = express_1.default();
mongoose_1.default
    .connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PASSWORD}@eduplatform.woboc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('mongodb connected'))
    .catch((err) => console.log(err));
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use('/doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_output_json_1.default));
app.use('/group', groupRouter_1.default);
app.use('/projects', projectsRouter_1.default);
app.use('/tasks', tasksRouter_1.default);
app.use('/authorization', authorizationRouter_1.default);
app.use('/announcements', announcementsRouter_1.default);
app.use('/', (req, res) => {
    res.status(404).json({
        message: 'The route was not found',
    });
});
app.use((err, req, res) => {
    res.status(500).json({
        error: err.message,
    });
});
exports.default = app;
//# sourceMappingURL=app.js.map