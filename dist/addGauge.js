"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCounter = addCounter;
const prom_client_1 = __importDefault(require("prom-client"));
const gaugeStructure = new prom_client_1.default.Gauge({
    name: "count_add",
    help: 'find how many are active on add',
    labelNames: ["mehtod", "route", "status_code"]
});
function addCounter(req, res, next) {
    res.on("finish", () => {
        gaugeStructure.inc({
            mehtod: req.method,
            route: req.path,
            status_code: res.statusCode
        });
    });
    next();
}
