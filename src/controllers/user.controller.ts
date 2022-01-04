import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/helpers/exceptions/http.exception';
import UserService from '@/services/user.service';

class UserController {
    private userService: UserService = new UserService();
    public register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { name, email, password } = req.body;
            const token = await this.userService.register(
                name,
                email,
                password,
                'user'
            );
            return res.status(201).json({ token });
        } catch (error: any) {
            next(new HttpException(0, error.message));
        }
    };

    public login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const token = await this.userService.login(email, password);
            return res.status(200).json({ token });
        } catch (error: any) {
            next(new HttpException(400, error.message));
        }
    };

    public getUser = (
        req: Request,
        res: Response,
        next: NextFunction
    ): Response | void => {
        try {
            if (!req.user) {
                return next(new HttpException(404, 'No logged in user'));
            }
            return res.status(200).json({ user: req.user });
        } catch (error: any) {
            next(new HttpException(400, 'unable to get logged in user'));
        }
    };
}

export default UserController;
