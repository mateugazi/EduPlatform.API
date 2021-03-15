"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const app_1 = tslib_1.__importDefault(require("./app"));
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app_1.default);
server.listen(port, () => {
    console.log(`connected to the port ${port}`);
});
//# sourceMappingURL=index.js.map