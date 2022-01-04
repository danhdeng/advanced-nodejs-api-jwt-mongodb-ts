import { Router, Request, Response, NextFunction } from 'express';
import Route from '@/helpers/interfaces/route.inteface';
import HttpException from '@/helpers/exceptions/http.exception';
import validationMiddleware from '@/middlewares/validation.middleware';
import validate from '@/validations/post.validation';
import PostService from '@/services/post.service';
import PostController from '@/controllers/post.controller';

class PostRoute implements Route {
  public path = '/posts';
  public router = Router();
  private postService: PostService = new PostService();
  private postController: PostController = new PostController();
  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.create),
      this.postController.create
    );
  }
}

export default PostRoute;
