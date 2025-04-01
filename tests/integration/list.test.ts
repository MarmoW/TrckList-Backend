import app, { init } from "@/app";
import { faker } from "@faker-js/faker/.";
import supertest from "supertest";
import { cleanDb, createValidToken } from "../helper";
import httpStatus from "http-status";

beforeAll(async () => {
    await init();
    await cleanDb();
});

const server = supertest(app);

describe('Trying to create or see lists without being logged in', () => {



});

