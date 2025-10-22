import { describe, it, expect } from 'vitest';
import { AddUser } from '../add-user';
import { FakeUserRepository } from "../../domain/__test__/user-respository";
import { User } from '../../domain/user';

describe("AddUser Use Case", () => {
    const repo = new FakeUserRepository();
    const addUser = new AddUser(repo);

    it('Should create new user with username and password as param', () => {
        const newUser = new User("john", "doe");
        expect(newUser.credentials.username).toBe("john");
        expect(newUser.credentials.password).toBe("doe");

        const result = addUser.execute(newUser);
        expect(result.user.credentials.username).toBe("john");
        expect(repo.GetUserByNameFromDB("john")).toHaveLength(1);
    });

    it("Should return error: username is required", () => {
        const invalidUser = new User("", "doe");
        expect(() => addUser.execute(invalidUser)).toThrowError(
            "username is required"
        );
    });

    it("Should return error: password is required", () => {
        const invalidUser = new User("john", "");
        expect(() => addUser.execute(invalidUser)).toThrowError(
            "password is required"
        );
    });
});