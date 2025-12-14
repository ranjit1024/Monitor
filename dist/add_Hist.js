"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.histogram = void 0;
exports.coutnLantancy = coutnLantancy;
const prom_client_1 = __importDefault(require("prom-client"));
exports.histogram = new prom_client_1.default.Histogram({
    name: 'http_req_duration',
    help: "Duraton for an http to resolve",
    labelNames: ["method", "route", "code"],
    buckets: [0.5, 1, 5, 10, 20, 40, 500, 1000]
});
function coutnLantancy(req, res, next) {
    const startTime = Date.now();
    res.on('finish', () => {
        const endTime = Date.now();
        const duration = endTime - startTime;
        exports.histogram.observe({
            method: req.method,
            route: req.path,
            code: res.statusCode
        }, duration);
    });
    next();
}
