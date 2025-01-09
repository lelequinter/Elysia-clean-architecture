import type { IJWT } from "./interfaces/IJWT.js";
import jwt, { JwtPayload } from "jsonwebtoken";

export class JWT implements IJWT{
    async sign(payload: string): Promise<string> {
        return jwt.sign({data: payload}, 'secret', {expiresIn: '2h'});
    }

    verify(token: string): JwtPayload {
        const newToken: string = token?.startsWith('Bearer ') ? token.slice(7) : token;
        return jwt.verify(newToken, 'secret') as JwtPayload;
    }
}