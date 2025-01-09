import { Hash } from "../services/hash.js";
import { JWT } from "../services/jwt.js";
import { CreateUser } from "../user/application/create.js";
import { LoginUser } from "../user/application/login.js";
import { UserRepository } from "../user/infrastructure/UserRepository.js";
import { CreateUserController } from "../user/infrastructure/controllers/createController.js";
import { LoginController } from "../user/infrastructure/controllers/login.js";
import { PostRepository } from "../post/infrastructure/PostRepository.js";
import { Create as CreatePost } from "../post/application/create.js";
import { CreatePostController } from "../post/infrastructure/controllers/CreatePostController.js";
import { UploadService } from "../services/upload.js";

const userRepository = new UserRepository();
const postRepository = new PostRepository();
const uploadService = new UploadService();
const hashService = new Hash();
const jwtService = new JWT();

//* User
const createUser = new CreateUser(userRepository, hashService);
export const createUserController = new CreateUserController(createUser);

const loginUser = new LoginUser(userRepository, hashService, jwtService);
export const loginController = new LoginController(loginUser);

//* Post
const createPost = new CreatePost(postRepository, jwtService, uploadService);
export const createPostController = new CreatePostController(createPost);