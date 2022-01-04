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
const http_exception_1 = __importDefault(require("@/helpers/exceptions/http.exception"));
const user_service_1 = __importDefault(require("@/services/user.service"));
class UserController {
    constructor() {
        this.userService = new user_service_1.default();
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const token = yield this.userService.register(name, email, password, 'user');
                return res.status(201).json({ token });
            }
            catch (error) {
                next(new http_exception_1.default(0, error.message));
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield this.userService.login(email, password);
                return res.status(200).json({ token });
            }
            catch (error) {
                next(new http_exception_1.default(400, error.message));
            }
        });
        this.getUser = (req, res, next) => {
            try {
                if (!req.user) {
                    return next(new http_exception_1.default(404, 'No logged in user'));
                }
                return res.status(200).json({ user: req.user });
            }
            catch (error) {
                next(new http_exception_1.default(400, 'unable to get logged in user'));
            }
        };
    }
}
exports.default = UserController;
