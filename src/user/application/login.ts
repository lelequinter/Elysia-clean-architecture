import type { IUser } from '../domain/IUser.js';
import type { IHash } from '../../services/interfaces/IHash.js';
import type { IJWT } from '../../services/interfaces/IJWT.js';

export class LoginUser {
    constructor(
        private UserRepository: IUser,
        private hash: IHash,
        private jwt: IJWT
    ){}

    async run(email: string, password: string){
        const user = await this.UserRepository.find(email);
        if(!user) throw new Error('User or password invalid.');

        const isValid = await this.hash.compare(password, user.password);
        if(!isValid || !user) throw new Error('User or password invalid.');

        const token = await this.jwt.sign(user.id);
        user.setToken(token);
        
        return user;
    }
}

