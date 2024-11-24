import { Hash } from "../services/hash.js";
import { JWT } from "../services/jwt.js";
import { CreateUser } from "../user/application/create.js";
import { LoginUser } from "../user/application/login.js";
import { UserRepository } from "../user/infrastructure/UserRepository.js";
import { CreateUserController } from "../user/infrastructure/controllers/createController.js";
import { LoginController } from "../user/infrastructure/controllers/login.js";

const userRepository = new UserRepository();
const hashService = new Hash();
const jwtService = new JWT();


const createUser = new CreateUser(userRepository, hashService);
export const createUserController = new CreateUserController(createUser);

const loginUser = new LoginUser(userRepository, hashService, jwtService);
export const loginController = new LoginController(loginUser)