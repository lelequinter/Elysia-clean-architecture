
import type { IJWT } from '../../services/interfaces/IJWT.js';
import type { IUploadService } from '../../services/interfaces/IUpload.js';
import type { IPostRepository } from '../domain/IPostRepository.js';

export class Create {
  constructor( 
    private readonly postRepository: IPostRepository,
    private readonly jwtService: IJWT,
    private readonly uploadService: IUploadService
  ) {}

  async run(description: string, image: any, token: string){
    const { data: userId } = this.jwtService.verify(token);
    const imageKey = await this.uploadService.save(userId, image)
    return await this.postRepository.create(description, imageKey, userId);
  }
}
