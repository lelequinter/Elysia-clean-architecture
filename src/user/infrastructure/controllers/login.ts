import { LoginUser } from "../../application/login";

export class LoginController {
    constructor(
        private loginUser: LoginUser,
    ){}

    async run({body, token}: {body: {email: string, password: string}, token: string}){

        console.log('Token: ', token);
        
        try {
            const user = await this.loginUser.run(body.email, body.password);
            
            return {
                code: 200,
                user,
                message: 'User logged in'
            };
        } catch (e) {
            const err = e as Error;

            return {
                code: 400,
                message: err.message,
            };
        }
    }
}