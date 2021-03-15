"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const authorizationController_1 = require("../controllers/authorizationController");
const userRouter = express_1.default.Router();
userRouter.get("/", authorizationController_1.ShowAll);
userRouter.post("/login", authorizationController_1.LogIn);
userRouter.post("/register", authorizationController_1.Register);
exports.default = userRouter;
//# sourceMappingURL=authorizationRouter.js.map