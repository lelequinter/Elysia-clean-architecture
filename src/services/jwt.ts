import type { IJWT } from "./interfaces/IJWT";
import jwt, { JwtPayload } from "jsonwebtoken";

export class JWT implements IJWT{
    async sign(payload: string): Promise<string> {
        return jwt.sign({data: payload}, 'secret', {expiresIn: '2h'});
    }

    verify(token: string): JwtPayload {
        return jwt.verify(token, 'secret') as JwtPayload;
    }
}