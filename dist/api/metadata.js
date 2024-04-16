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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const session_1 = __importDefault(require("../session"));
const ofetch_1 = require("ofetch");
const router = express_1.default.Router();
dotenv_1.default.config();
const key = process.env.GM_KEY;
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const session = (yield (0, session_1.default)(req.app.locals)).session;
        console.log(req.params);
        const coordinateRequest = req.params;
        const metadataModel = yield (0, ofetch_1.ofetch)(`https://tile.googleapis.com/v1/streetview/metadata?session=${session}&key=${key}&lat=${coordinateRequest.lat}&lng=${coordinateRequest.lng}&radius=${(_a = coordinateRequest.radius) !== null && _a !== void 0 ? _a : 50}`, {
            method: 'GET',
        });
        res.json(metadataModel);
    }
    catch (e) {
        console.error(`get metadata failed: ${e}`);
        res.json({
            errorCode: -1,
            errorMessage: "get metadata failed"
        });
    }
}));
exports.default = router;
