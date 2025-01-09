import type { IPostRepository } from "../domain/IPostRepository.js";
import type { IJWT } from "../../services/interfaces/IJWT.js";

export class FindAllPost {
    constructor( private postRepository: IPostRepository, private jwtService: IJWT ){}

    async run( token: string ){
        const { data: userId } = this.jwtService.verify(token);
        return await this.postRepository.getAll(userId);
    }
}