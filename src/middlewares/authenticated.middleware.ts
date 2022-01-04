import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '@/helpers/token';
import UserModel from '@/models/user.model';
import Token from '@/helpers/interfaces/token.interface';
import HttpException from '@/helpers/exceptions/http.exception';
import jwt from 'jsonwebtoken';

async function autheticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearerToken = req.headers.authorization;
    if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
        return next(new HttpException(401, 'Unauthorized access.'));
    }
    const accessToken = bearerToken.split(' ')[1].trim();
    try {
        const payload: Token | jwt.JsonWebTokenError = await verifyToken(
            accessToken
        );

        if (payload instanceof jwt.JsonWebTokenError) {
            return next(new HttpException(401, 'Unauthorized access.'));
        }
        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();
        if (!user) {
            return next(new HttpException(401, 'Unauthorized access.'));
        }
        req.user = user;

        return next();
    } catch (error) {
        return next(new HttpException(401, 'Unauthorized access.'));
    }
}

export default autheticatedMiddleware;
