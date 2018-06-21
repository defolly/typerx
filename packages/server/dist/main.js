"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const start_1 = require("./start");
const app = new start_1.Start();
app.exec().catch((error) => {
    console.log('error', error);
});
process.on('unhandledRejection', (reason) => {
    console.log("unhandledRejection", reason);
});
process.on('uncaughtException', (reason) => {
    console.log("uncaughtException", reason);
});
exports.default = app;
//# sourceMappingURL=main.js.map