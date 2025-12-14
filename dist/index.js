"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prom_client_1 = __importDefault(require("prom-client"));
const reqCounter_1 = require("./reqCounter");
const addGauge_1 = require("./addGauge");
const add_Hist_1 = require("./add_Hist");
const app = (0, express_1.default)();
const PORT = 3000;
let users = [];
// Middleware
app.use(express_1.default.json());
app.use(reqCounter_1.calculateTotalReq);
// Routes
app.get('/', (req, res) => {
    res.json({ users: users });
});
app.post("/user/add", addGauge_1.addCounter, (req, res) => {
    const name = req.body.name;
    users.push({ name: name });
    return res.status(200).json({
        users: users
    });
});
app.post("/user/remove", add_Hist_1.coutnLantancy, (req, res) => {
    const name = req.body.name;
    users = users.filter(user => user !== name);
    return res.status(200).json({
        users: users
    });
});
app.get('/metrics', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const metrics = yield prom_client_1.default.register.metrics();
    res.set('Content-type', prom_client_1.default.register.contentType);
    res.end(metrics);
}));
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:`, PORT);
});
