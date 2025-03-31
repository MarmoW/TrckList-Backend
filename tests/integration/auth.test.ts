import supertest from 'supertest';
import { faker } from '@faker-js/faker';
import httpStatus from 'http-status';
import { createUser } from '../factories';
import app, { init } from '@/app';
import { describe } from 'node:test';
import { cleanDb } from '../helper';

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

const genValidBody = () => ({
    email: faker.internet.email(),
    password: faker.internet.password({ length: 10 }),
    name: faker.person.fullName()
});

describe('POST /auth/sign-in', () => {
    it('should return error 400 if body is empty', async () => {
        const resp = await server.post('/auth/sign-in');

        expect(resp.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should return error 400 if body is invalid', async () => {
        const invalidBody = {[faker.word.noun() ]: faker.word.noun()};
        
        const resp = (await server.post('/auth/sign-in').send(invalidBody));

        expect(resp.status).toBe(httpStatus.BAD_REQUEST);
    });
});


describe('sending a valid body', () => {

    it('should return error 401 if there is no user for given email', async () => {
        const body = genValidBody();

        await createUser(body);

        const resp = await server.post('/auth/sign-in').send(body);

        expect(resp.status).toBe(httpStatus.UNAUTHORIZED);
    });

    it('should return error 401 if there is a user with that email but password is wrong', async () => {
        const body = genValidBody();
        await createUser(body);

        const resp = await server.post('/auth/sign-in').send({
            ...body,
            password: faker.internet.password({length: 12})
        })

        expect(resp.status).toBe(httpStatus.UNAUTHORIZED) 
    });
});

describe('when credentials are valid', async () => {
    it('should responde with OK', async()=>{
        const body = genValidBody();

        await createUser(body);

        const resp = await server.post('/auth/sign-in').send(body);

        expect(resp.status).toBe(httpStatus.OK);
    });

    it('should responde with user data', async()=>{
        const body = genValidBody();
        
        const user = await createUser(body);

        const resp = await server.post('/auth/sign-in').send(body);

        expect(resp.body.user).toEqual({
            id: user.id,
            email: user.email,
            name: user.name
        });
    });

    it('should responde with session token', async() => {
        const body = genValidBody();

        await createUser(body);

        const resp = await server.post('/auth/sign-in').send(body);

        expect(resp.body.token).toBeDefined();
    });
});