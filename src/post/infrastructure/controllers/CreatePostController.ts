
import { Create } from '../../application/create.js';

type Request = {
  body: {
    description: string,
      image: any
  },
  token: string
}

export class CreatePostController {
  constructor( private readonly create: Create ) {}
  
  async run({body, token}: Request) {
    try {
        const post = await this.create.run(body.description, body.image, token);
        return {
          status: 200,
          post
        };
      } catch (error) {
        const e = error as Error;
        return {
          status: 400,
          error: e.message
        }
    }
  }
}
