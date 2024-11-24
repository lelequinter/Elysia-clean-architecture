import type { IUser } from './../domain/IUser.js';
import type { IHash } from '../../services/interfaces/IHash.js';

export class CreateUser{
    constructor(
        private UserRepository: IUser,
        private hash: IHash
    ){}

    async run(email: string, password: string){
        const hashedPassword = await this.hash.hash(password);

        return await this.UserRepository.create(email, hashedPassword);
    }
}