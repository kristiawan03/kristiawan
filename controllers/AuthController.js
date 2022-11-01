const m$auth = require("../modules/auth.module");
const { Router } = require("express");
const response = require("../helpers/response");

const AuthController = Router();
/**
 * @param {string} email
 * @param {string} password
 */
AuthController.post("/", async (req, res) => {
  const login = await m$auth.login(req.body);
  response.sendResponse(res, login);
});
module.exports = AuthController;
