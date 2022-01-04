import { Router, Request, Response, NextFunction } from 'express';
import HttpException from '@/helpers/exceptions/http.exception';
import PostService from '@/services/post.service';

class PostContoller {
  private postService: PostService = new PostService();
  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const { title, body } = req.body;
      const post = await this.postService.create(title, body);

      res.status(201).json({ post });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default PostContoller;
