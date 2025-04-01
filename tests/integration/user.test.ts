import app, { init } from "@/app";
import { faker } from "@faker-js/faker/.";
import supertest from "supertest";
import { cleanDb } from "../helper";
import httpStatus from "http-status";





beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe('POST /users', () => {
    it('should throw error 400 when body is empty', async () => {
        const resp = await server.post('/users');

        expect(resp.status).toBe(httpStatus.BAD_REQUEST);
    });

    it('should throw error 400 when body is not valid', async () => {
        const fakeBody = { [faker.lorem.word()]: faker.lorem.word() };
        const resp = await server.post('/users').send(fakeBody);

        expect(resp.status).toBe(httpStatus.BAD_REQUEST);
    }); 
});

describe('body is valid', () => {
    const genValidBody = () => ({
        email: faker.internet.email(),
        password: faker.internet.password({length: 12}),
        name: faker.person.firstName()
    });

    it('should should respond with 409 if email belongs to an user', async () => {
        const body = genValidBody();

        await server.post('/users').send(body);
        
        const resp = await server.post('/users').send({
            email: body.email,
            password: faker.internet.password({length: 10}),
            name: faker.person.firstName()
        });

        expect(resp.status).toBe(httpStatus.CONFLICT);
    });

    it("should respond with 201 if user was created with sucess", async () => {
        const body = genValidBody();
        const resp = await server.post('/users').send(body);

        expect(resp.status).toBe(httpStatus.CREATED);
    });

    it("should not return sensitive information on body", async () => {
        const body = genValidBody();
        const resp = await server.post('/users').send(body);
         
        expect(resp.body).not.toHaveProperty('password');
    });
});