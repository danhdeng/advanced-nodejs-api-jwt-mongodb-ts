import User from '@/interface/user.interface';

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
