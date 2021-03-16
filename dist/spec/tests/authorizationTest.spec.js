"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authorizationController_1 = require("../../src/controllers/authorizationController");
const authorization_mocks_1 = require("./__mocks__/authorization.mocks");
describe("Check login method to page", () => {
    it("Should pass since object login (with login passed) matches the function restrictions", () => {
        const testObject = {
            login: "maria-nowak"
        };
        const userLogin = authorizationController_1.checkLoginForm(testObject);
        expect(userLogin).toStrictEqual({ login: "maria-nowak" });
    });
    it("Should pass since object login (with email passed) matches the function restrictions", () => {
        const testObject = {
            login: "maria.nowak@gmail.com"
        };
        const userLogin = authorizationController_1.checkLoginForm(testObject);
        expect(userLogin).toStrictEqual({ email: "maria.nowak@gmail.com" });
    });
    it("Shouldn't pass since object login is not passed", () => {
        const userLogin = authorizationController_1.checkLoginForm({});
        expect(userLogin).toStrictEqual({ error: "There is not login passed" });
    });
});
describe("Check password method to page", () => {
    it("Should pass since both encrypted and decrypted password are the same", () => {
        const testObject = {
            password: "MariaNowak123!"
        };
        expect(authorizationController_1.isValidPassword(authorization_mocks_1.mockResponse1.password, testObject.password)).toBe(true);
    });
    it("", () => {
        const testObject = {
            password: "GHfAOIhdfgoAWHdepa!"
        };
        expect(authorizationController_1.isValidPassword(authorization_mocks_1.mockResponse1.password, testObject.password)).toBe(false);
    });
});
//# sourceMappingURL=authorizationTest.spec.js.map