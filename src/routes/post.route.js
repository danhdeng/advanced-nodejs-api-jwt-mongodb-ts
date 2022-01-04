"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validation_middleware_1 = __importDefault(require("@/middlewares/validation.middleware"));
const post_validation_1 = __importDefault(require("@/validations/post.validation"));
const post_service_1 = __importDefault(require("@/services/post.service"));
const post_controller_1 = __importDefault(require("@/controllers/post.controller"));
class PostRoute {
    constructor() {
        this.path = '/posts';
        this.router = (0, express_1.Router)();
        this.postService = new post_service_1.default();
        this.postController = new post_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.post(`${this.path}`, (0, validation_middleware_1.default)(post_validation_1.default.create), this.postController.create);
    }
}
exports.default = PostRoute;
