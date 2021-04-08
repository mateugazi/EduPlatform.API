"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteTask = exports.UpdateTask = exports.AddTask = exports.TasksByUserAndProject = exports.TasksByUser = exports.TasksByProject = exports.TaskById = exports.AllTasks = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = require("mongoose");
const tasksSchema_1 = require("../models/tasksSchema");
const projectSchema_1 = tslib_1.__importDefault(require("../models/projectSchema"));
const userSchema_1 = require("../models/userSchema");
const AllTasks = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasksList = yield tasksSchema_1.Task.find();
        res.send(tasksList);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.AllTasks = AllTasks;
const TaskById = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is invalid');
    }
    try {
        const task = yield tasksSchema_1.Task.findById(req.params.id);
        if (!task) {
            return res.status(404).send('Task not found');
        }
        res.send(task);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.TaskById = TaskById;
const TasksByProject = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Project Id is not valid');
    }
    try {
        const project = yield projectSchema_1.default.findById(req.params.id);
        if (project) {
            const tasksByProject = yield tasksSchema_1.Task.find({ "project": mongoose_1.Types.ObjectId(req.params.id) }).populate('user', 'firstName lastName');
            if (tasksByProject) {
                return res.send(tasksByProject);
            }
        }
        res.status(404).send('Project not found');
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.TasksByProject = TasksByProject;
const TasksByUser = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('User Id is not valid');
    }
    try {
        const tasksByUser = yield tasksSchema_1.Task.find({ "user": mongoose_1.Types.ObjectId(req.params.id) });
        if (tasksByUser.length > 0) {
            return res.send(tasksByUser);
        }
        res.status(404).send('Tasks not found or incorrect if for user');
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.TasksByUser = TasksByUser;
const TasksByUserAndProject = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.projectId)) {
        return res.status(400).send('Project Id is not valid');
    }
    if (!mongoose_1.Types.ObjectId.isValid(req.params.userId)) {
        return res.status(400).send('User Id is not valid');
    }
    try {
        const tasksByUserAndProject = yield tasksSchema_1.Task.find({ "user": mongoose_1.Types.ObjectId(req.params.userId), "project": mongoose_1.Types.ObjectId(req.params.projectId) });
        if (tasksByUserAndProject.length > 0) {
            return res.send(tasksByUserAndProject);
        }
        res.status(404).send('Tasks not found');
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.TasksByUserAndProject = TasksByUserAndProject;
const AddTask = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        let task;
        if (req.body.projectId && req.body.userId) {
            if (!mongoose_1.Types.ObjectId.isValid(req.body.projectId)) {
                return res.status(400).send('Project Id is not valid');
            }
            if (!mongoose_1.Types.ObjectId.isValid(req.body.userId)) {
                return res.status(400).send('User Id is not valid');
            }
            const project = yield projectSchema_1.default.findById(req.body.projectId);
            const user = yield userSchema_1.User.findById(req.body.userId);
            task = new tasksSchema_1.Task({
                _id: new mongoose_1.Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
                done: false,
                project: project,
                user: user
            });
        }
        else if (req.body.projectId) {
            if (!mongoose_1.Types.ObjectId.isValid(req.body.projectId)) {
                return res.status(400).send('Project Id is not valid');
            }
            const project = yield projectSchema_1.default.findById(req.body.projectId);
            task = new tasksSchema_1.Task({
                _id: new mongoose_1.Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
                done: false,
                project: project
            });
        }
        else if (req.body.userId) {
            if (!mongoose_1.Types.ObjectId.isValid(req.body.userId)) {
                return res.status(400).send('User Id is not valid');
            }
            const user = yield userSchema_1.User.findById(req.body.userId);
            task = new tasksSchema_1.Task({
                _id: new mongoose_1.Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
                done: false,
                user: user
            });
        }
        else {
            task = new tasksSchema_1.Task({
                _id: new mongoose_1.Types.ObjectId(),
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
                done: false
            });
        }
        const response = yield task.save();
        res.send(response);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.AddTask = AddTask;
const UpdateTask = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is not valid');
    }
    if (req.body.userId && !mongoose_1.Types.ObjectId.isValid(req.body.userId)) {
        return res.status(400).send('User Id is not valid');
    }
    try {
        const user = yield userSchema_1.User.findById(req.body.userId);
        let taskData = {
            _id: req.params.id,
            name: req.body.name,
            description: req.body.description,
            deadline: req.body.deadline,
            done: req.body.done,
            user: user
        };
        const task = yield tasksSchema_1.Task.findByIdAndUpdate(req.params.id, taskData, { new: true });
        if (!task) {
            return res.status(404).send('No task to update');
        }
        res.send(task);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.UpdateTask = UpdateTask;
const DeleteTask = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).send('Id is not valid');
    }
    try {
        const task = yield tasksSchema_1.Task.findByIdAndRemove(req.params.id);
        if (!task) {
            return res.status(404).send('No data to delete');
        }
        res.send(task);
    }
    catch (error) {
        res.status(500).json({
            error: error
        });
    }
});
exports.DeleteTask = DeleteTask;
//# sourceMappingURL=tasksController.js.map