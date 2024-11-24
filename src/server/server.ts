import { Elysia } from "elysia";
import { userRouter } from "../user/userRouter.js";
import swagger from "@elysiajs/swagger";

export class Server {
    private app: Elysia;

    constructor(){
        //* user swagger para generar documentacion
        this.app = new Elysia().use(swagger());
        this.app.derive(({headers}) => {
            const auth = headers['authorization']

            return {
                token: auth?.startsWith('Bearer ') ? auth.slice(7) : null
            }
        })
        this.app.group('/api', (app) => 
            app.use(userRouter)
        );
    }

    public start(){
        const port = process.env.PORT || 3000;

        this.app.listen( port, () => {
            console.log(`Server is running on port ${port}`);
        })
    }
}