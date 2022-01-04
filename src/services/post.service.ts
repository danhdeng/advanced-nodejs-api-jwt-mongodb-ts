import postModel from '@/models/post.model';
import Post from '@/interfaces/post.interface';

class PostService {
  private post = postModel;

  /**
   * create a new post
   */
  public async create(title: string, body: string): Promise<Post> {
    try {
      const post = await this.post.create({ title, body });
      return post;
    } catch (err) {
      throw new Error('Unable to create a post');
    }
  }
}

export default PostService;
