import type { IPostRepository } from "../domain/IPostRepository.js";
import type { IJWT } from "../../services/interfaces/IJWT.js";
import type { IUploadService } from "../../services/interfaces/IUpload.js";

export class FindAllPost {
    constructor( 
        private postRepository: IPostRepository, 
        private jwtService: IJWT,
        private uploadService: IUploadService,
    ){}

    async run( token: string ){
        const { data: userId } = this.jwtService.verify(token);
        const posts = await this.postRepository.getAll(userId);

        const urls = await Promise.all( posts.map(async post => {
            return await this.uploadService.getSignedUrl(post.getImage())
        }) );

        return posts.map((post, index) => {
            post.setImage(urls[index])
            return post;
        }) 
    }
}