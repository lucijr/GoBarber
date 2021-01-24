"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var appointmentsRouter = express_1.Router();
appointmentsRouter.post('/', function (request, require) {
    return express_1.response.json({ message: 'Hello World' });
});
exports.default = appointmentsRouter;
