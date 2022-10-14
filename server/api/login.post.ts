import {createError, defineEventHandler, readBody} from "h3";
import {User} from "~/interfaces/models/User";
import {compare} from "bcrypt";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (typeof body.username === 'undefined' || typeof body.password === 'undefined') {
        throw createError({
            statusCode: 400,
            statusMessage: 'At least a username and password must be supplied to login!',
        });
    }

    const {username, password} = body;

    // Very primitive, but we need something to get data from
    const usersJson = await useStorage().getItem('memory:users-list');
    const users: User[] = usersJson || [];
    const user = users.find((user) => user.username === username);
    let passwordMatch = false;
    if (typeof user !== 'undefined') {
        passwordMatch = await compare(password, user.password);
    }

    if (typeof user === 'undefined' || !passwordMatch) {
        throw createError({
            statusCode: 403,
            statusMessage: 'The user/password combination could not be found!',
        });
    }

    return user;
});
