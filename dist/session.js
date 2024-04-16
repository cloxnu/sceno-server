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
exports.createSession = void 0;
const ofetch_1 = require("ofetch");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const key = process.env.GM_KEY;
const sessionTokenKey = "GMSessionToken";
function getSession(locals) {
    return __awaiter(this, void 0, void 0, function* () {
        if (locals[sessionTokenKey] === undefined) {
            const session = yield createSession();
            locals[sessionTokenKey] = session;
        }
        return locals[sessionTokenKey];
    });
}
exports.default = getSession;
function createSession() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, ofetch_1.ofetch)("https://tile.googleapis.com/v1/createSession", {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin': 'true',
            },
            params: {
                "key": key,
            },
            body: {
                "mapType": "streetview",
                "language": "en-US",
                "region": "US",
            },
        });
    });
}
exports.createSession = createSession;
