"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotalReq = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const structreuCounter = new prom_client_1.default.Counter({
    name: "count_req",
    help: "total http request on port 3000",
    labelNames: ["method", "route", "status_code"]
});
const calculateTotalReq = (req, res, next) => {
    res.on("finish", () => {
        structreuCounter.inc({
            method: req.method,
            route: req.path,
            status_code: res.statusCode
        });
    });
    next();
};
exports.calculateTotalReq = calculateTotalReq;
