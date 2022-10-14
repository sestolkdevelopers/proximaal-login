import {createError, defineEventHandler, readBody} from 'h3';
import {User} from '~/interfaces/models/User';
import {hash} from 'bcrypt';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (typeof body.username === 'undefined' || typeof body.password === 'undefined') {
        throw createError({
            statusCode: 400,
            statusMessage: 'At least a username and password must be supplied to register!',
        });
    }

    const {username, password} = body;

    // Very primitive, but we need something to get data from
    const usersJson = await useStorage().getItem('memory:users-list');
    const users: User[] = typeof usersJson === 'string' ? JSON.parse(usersJson) : [];

    if (users.some((user) => user.username === username)) {
        throw createError({
            statusCode: 400,
            statusMessage: 'A user with this username already exists!',
        });
    }

    const hashedPassword = await hash(password, 10);
    // For sake of simplicity as this is just a stubbed API, we save the entire body
    // In a real scenario all fields should be explicitly picked
    users.push({...body, password: hashedPassword});

    await useStorage().setItem('memory:users-list', users);

    return body;
});
