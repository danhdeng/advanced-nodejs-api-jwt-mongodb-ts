"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const error_middleware_1 = __importDefault(require("@/middlewares/error.middleware"));
const helmet_1 = __importDefault(require("helmet"));
// import errorMiddleware from './middleware/error.middleware';
class App {
    constructor(routes, port) {
        //set up the mongodb connection
        this.initializeDatabaseConnection = () => {
            const { MONGO_USER, MONGO_PASSWORD, MONGO_PATH } = process.env;
            const mongoUrl = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@${process.env.MONGO_PATH}`;
            console.log(mongoUrl);
            mongoose_1.default
                .connect(mongoUrl)
                .then(() => {
                console.log('Connected to Distribution API Database - Initial Connection');
            })
                .catch((err) => {
                console.log(`Initial Distribution API Database connection error occured -`, err);
            });
        };
        //initialize all the middleware functions for the express server
        this.initializeMiddleware = () => {
            this.express.use((0, helmet_1.default)());
            this.express.use((0, cors_1.default)());
            this.express.use((0, morgan_1.default)('dev'));
            this.express.use(express_1.default.json());
            this.express.use(express_1.default.urlencoded({ extended: false }));
            this.express.use((0, compression_1.default)());
        };
        //initialize all the routes for the express server
        this.initializeControllers = (routes) => {
            routes.forEach((route) => {
                this.express.use('/api', route.router);
            });
        };
        //add error handling middleware to express server
        this.initializeErrorHandling = () => {
            this.express.use(error_middleware_1.default);
        };
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeDatabaseConnection();
        this.initializeMiddleware();
        this.initializeControllers(routes);
        this.initializeErrorHandling();
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`App is listening on port ${this.port}`);
        });
    }
}
exports.default = App;
