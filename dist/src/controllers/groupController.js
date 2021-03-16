"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.groupDeleteGroup = exports.groupChangeName = exports.groupDeleteMember = exports.groupAddMember = exports.groupGetSingleGroup = exports.groupGetAllGroup = exports.groupCreateGroup = void 0;
const tslib_1 = require("tslib");
const mongoose_1 = tslib_1.__importDefault(require("mongoose"));
const groupSchema_1 = tslib_1.__importDefault(require("../models/groupSchema"));
const userSchema_1 = require("../models/userSchema");
const groupCreateGroup = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const userMentor = yield userSchema_1.User.findById(req.body.mentor);
        const groupName = yield groupSchema_1.default.findOne({ groupName: req.body.groupName });
        if (groupName) {
            res.status(404).json({
                message: "This group name is already taken"
            });
        }
        else {
            const group = new groupSchema_1.default({
                _id: mongoose_1.default.Types.ObjectId(),
                groupName: req.body.groupName,
                mentor: userMentor
            });
            group.save()
                .then((result) => {
                console.log(result);
                res.status(201).json({
                    message: "Group created"
                });
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    }
    catch (err) {
        res.status(500).json({
            err
        });
    }
});
exports.groupCreateGroup = groupCreateGroup;
const groupGetAllGroup = (req, res) => {
    groupSchema_1.default.find()
        .select('_id groupName mentor members')
        .exec()
        .then((result) => {
        res.status(200).json({
            numberOfGroups: result.length,
            result
        });
    })
        .catch((err) => {
        res.status(500).json({
            error: err
        });
    });
};
exports.groupGetAllGroup = groupGetAllGroup;
const groupGetSingleGroup = (req, res) => {
    const id = req.params.groupId;
    groupSchema_1.default.findById(id)
        .select('_id groupName mentor members')
        .exec()
        .then((result) => {
        if (!result) {
            return res.status(404).json({
                message: 'Group not found'
            });
        }
        res.status(200).json({
            group: result
        });
    })
        .catch((err) => {
        res.status(500).json({
            error: err
        });
    });
};
exports.groupGetSingleGroup = groupGetSingleGroup;
const groupAddMember = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.groupId;
    try {
        const member = yield userSchema_1.User.findById(req.body._id);
        const group = yield groupSchema_1.default.findById(groupId);
        if (group.members.some((obj) => member._id.equals(obj._id))) {
            return res.status(404).json({
                message: "User is already in the group"
            });
        }
        else {
            groupSchema_1.default.updateOne({ _id: groupId }, { $push: { members: member } })
                .exec()
                .then((result) => {
                res.status(200).json({
                    message: 'User added',
                    member
                });
            })
                .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: err
                });
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});
exports.groupAddMember = groupAddMember;
const groupDeleteMember = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.groupId;
    try {
        const group = yield groupSchema_1.default.findById(groupId);
        const member = yield userSchema_1.User.findById(req.body._id);
        if (!group.members.some((obj) => member._id.equals(obj._id))) {
            return res.status(404).json({
                message: "User is not in the group"
            });
        }
        else {
            group.members.forEach((element) => {
                if (member._id.equals(element._id)) {
                    groupSchema_1.default.updateOne({ _id: groupId }, { $pull: { members: element } })
                        .exec()
                        .then((result) => {
                        res.status(200).json({
                            message: 'User deleted',
                            result
                        });
                    })
                        .catch((err) => {
                        console.log(err);
                        res.status(500).json({
                            error: err
                        });
                    });
                }
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});
exports.groupDeleteMember = groupDeleteMember;
const groupChangeName = (req, res) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.params.groupId;
    try {
        groupSchema_1.default.updateOne({ _id: groupId }, { $set: { groupName: req.body.newName } })
            .exec()
            .then(() => res.status(200).json({
            message: `groupName changed`
        }));
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        });
    }
});
exports.groupChangeName = groupChangeName;
const groupDeleteGroup = (req, res) => {
    const groupId = req.params.groupId;
    groupSchema_1.default.deleteOne({ _id: groupId })
        .exec()
        .then((result) => res.status(200).json({
        message: 'Group deleted'
    }))
        .catch((err) => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};
exports.groupDeleteGroup = groupDeleteGroup;
//# sourceMappingURL=groupController.js.map