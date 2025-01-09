
import { Post } from './Post.js';

export interface IPostRepository {
  create( description: string, images: any, userId: string ): Promise<Post>;
}
