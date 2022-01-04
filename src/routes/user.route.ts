import Route from '@/helpers/interfaces/route.inteface';
import { Router, Request, Response, NextFunction } from 'express';
import validationMiddleware from '@/middlewares/validation.middleware';
import autheticated from '@/middlewares/authenticated.middleware';
import UserController from '@/controllers/user.controller';
import validate from '@/validations/user.validation';

class UserRoute implements Route {
    public path = '/users';
    public router = Router();
    private userController: UserController = new UserController();
    constructor() {
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.userController.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.userController.login
        );
        this.router.get(
            `${this.path}`,
            autheticated,
            this.userController.getUser
        );
    }
}

export default UserRoute;
