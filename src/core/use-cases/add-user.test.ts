import { describe, it, expect } from 'vitest';
import { AddUser } from './add-user';

describe("AddUser", () => {
    it('Should create new user with username and password as param', () => {
        const newUser = AddUser({
            username: "john",
            password: "doe"
        });
        expect(newUser.credentials.username).toBe("john");
        expect(newUser.credentials.password).toBe("doe");
    });

    it('Should return error: username is required', () => {
        expect(() => AddUser({
            username: "",
            password: "doe"
        })).toThrowError("username is required");
    });

    it('Should return error: password is required', () => {
        expect(() => AddUser({
            username: "john",
            password: ""
        })).toThrowError("password is required");
    });
});