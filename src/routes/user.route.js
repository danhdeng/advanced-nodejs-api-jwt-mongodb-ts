"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middlewares/validation.middleware"));
const authenticated_middleware_1 = __importDefault(require("@/middlewares/authenticated.middleware"));
const user_controller_1 = __importDefault(require("@/controllers/user.controller"));
const user_validation_1 = __importDefault(require("@/validations/user.validation"));
class UserRoute {
    constructor() {
        this.path = '/users';
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}/register`, (0, validation_middleware_1.default)(user_validation_1.default.register), this.userController.register);
        this.router.post(`${this.path}/login`, (0, validation_middleware_1.default)(user_validation_1.default.login), this.userController.login);
        this.router.get(`${this.path}`, authenticated_middleware_1.default, this.userController.getUser);
    }
}
exports.default = UserRoute;
