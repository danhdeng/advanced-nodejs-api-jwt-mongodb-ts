"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
const app_1 = __importDefault(require("./app"));
const validateEnv_1 = __importDefault(require("@/helpers/validateEnv"));
const post_route_1 = __importDefault(require("@/routes/post.route"));
const user_route_1 = __importDefault(require("@/routes/user.route"));
(0, validateEnv_1.default)();
const app = new app_1.default([new post_route_1.default(), new user_route_1.default()], Number(process.env.PORT));
app.listen();
