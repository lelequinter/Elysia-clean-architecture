import { FindAllPost } from "../../application/finAll.js";

export class FindAllPostController {
    constructor( private findAllPost: FindAllPost ){}

    async run({token}: {token: string}){
        try {
            const posts = await this.findAllPost.run(token);

            return {
                status: 200,
                posts
            }
        } catch (error) {
            const e = error as Error;
            return {
                status: 400,
                body: {
                    message: e.message
                }
            }
        }
    }
}