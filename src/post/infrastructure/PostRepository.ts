
import { PrismaClient } from '@prisma/client';
import type { IPostRepository } from '../domain/IPostRepository.js';
import { Post } from '../domain/Post.js';

export class PostRepository implements IPostRepository {
  private db: PrismaClient;
  
  constructor() {
    this.db = new PrismaClient();
  }
    
  async create(description: string, images: any, userId: string): Promise<Post> {  
    const post = await this.db.post.create({
      data: {
        description,
        images,
        userId,
      }
    });

    return new Post(post.id, post.description, post.images, post.userId);
  }

  async getAll(userId: string): Promise<Post[]>{
    const post = await this.db.post.findMany({
      where: {
        userId
      }
    })

    return post.map(
      (post) => new Post(post.id, post.description, post.images, post.userId)
    );
  }
}
