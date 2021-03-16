"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const mongoose_2 = require("mongoose");
const projectSchema_1 = tslib_1.__importDefault(require("../models/projectSchema"));
const userSchema_1 = require("../models/userSchema");
exports.projects_get_all = (req, res) => {
    projectSchema_1.default
        .find({})
        .exec()
        .then((response) => {
        res.status(200).json(response);
    })
        .catch((error) => {
        res.status(500).json({
            error: error
        });
    });
};
exports.projects_get_single = (req, res) => {
    mongoose_2.Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid');
    projectSchema_1.default
        .findById(req.params.projectId)
        .exec()
        .then((document) => {
        if (document) {
            res.status(200).json(document);
        }
        else {
            res.status(404).json({
                message: "Project not found"
            });
        }
    })
        .catch((error) => {
        res.status(500).json({
            error: error
        });
    });
};
exports.projects_add_new_project = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const userMentor = yield userSchema_1.User.findById(req.body.mentor).catch((err) => res.status(404).send('Mentor id is not valid'));
    if (!userMentor)
        res.status(404).send('Mentor not found');
    const authorsArray = yield req.body.authors;
    const userAuthors = yield authorsArray.map((author) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.User.findById(author).catch(() => res.status(404).send('Author id is not valid'));
        if (!user)
            res.status(404).send('Mentor not found');
        return user;
    }));
    const newProject = new projectSchema_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        mentor: userMentor,
        authors: userAuthors,
        linkToDemo: req.body.linkToDemo,
        linkToGitHub: req.body.linkToGitHub,
        timestamp: Date.now(),
    });
    newProject
        .save()
        .then((response) => {
        res.status(201).json({
            message: 'Project added successfully!'
        });
    })
        .catch((error) => {
        res.status(500).json({
            error: error
        });
    });
});
exports.projects_update_project = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    mongoose_2.Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid');
    if (!req.body.title || !req.body.description || !req.body.mentor || !req.body.authors || !req.body.linkToDemo || !req.body.linkToGitHub)
        res.status(400).send('Missing parameter');
    const userMentor = userSchema_1.User.findById(req.body.mentor).catch((err) => res.status(404).send('Mentor id is not valid'));
    if (!userMentor)
        res.status(404).send('Mentor not found');
    const authorsArray = yield req.body.authors;
    const userAuthors = yield authorsArray.map((author) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const user = yield userSchema_1.User.findById(author).catch(() => res.status(404).send('Author id is not valid'));
        if (!user)
            res.status(404).send('Mentor not found');
        return user;
    }));
    const projectData = yield {
        title: req.body.title,
        description: req.body.description,
        mentor: req.body.mentor,
        authors: userAuthors,
        linkToDemo: req.body.linkToDemo,
        linkToGitHub: req.body.linkToGitHub,
        timestamp: Date.now()
    };
    projectSchema_1.default.findByIdAndUpdate(req.params.projectId, projectData, { new: true })
        .exec()
        .then((response) => {
        res.status(200).json({
            message: "Updated successfully!"
        });
    })
        .catch((error) => {
        console.log(userAuthors);
        res.status(500).json({
            error: error
        });
    });
});
exports.projects_delete_project = (req, res) => {
    mongoose_2.Types.ObjectId.isValid(req.params.projectId) ? null : res.status(400).send('Id is not valid');
    projectSchema_1.default.findByIdAndRemove(req.params.projectId)
        .exec()
        .then((doc) => {
        if (doc) {
            res.status(200).json({
                message: "Deleted successfully"
            });
        }
        else {
            res.status(404).json({
                message: "No data to delete"
            });
        }
    })
        .catch((error) => {
        res.status(500).json({
            error: error
        });
    });
};
//# sourceMappingURL=projectsController.js.map