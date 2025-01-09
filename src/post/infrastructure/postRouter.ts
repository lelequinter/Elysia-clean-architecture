import { Elysia, t } from 'elysia';
import { createPostController } from '../../server/dependencies';

export const postRouter = new Elysia({prefix: '/posts'})
    .post('/', createPostController.run.bind(createPostController), {
        body: t.Object({
            description: t.String(),
            image: t.File(),
        })
    })