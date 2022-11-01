//mapping suntion  dari module API

const m$user = require("../modules/user.module");
const { Router } = require("express");
const response = require("../helpers/response");
const UserController = Router();

UserController.get("/", async (req, res) => {
  const list = await m$user.listUser();

  //reponse helper
  response.sendResponse(res, list);
});
/**
 * 

 * @param {string} name
 * @param {string} email
 * @param {string} password
 */

UserController.post("/", async (req, res) => {
  const add = await m$user.createUser(req.body);

  //reponse helper
  response.sendResponse(res, add);
});
/**
 *
 * @param {number} id
 * @param {string} name
 * @param {string} email
 * @param {string} password
 */
UserController.put("/", async (req, res) => {
  const update = await m$user.updateUser(req.body);

  //reponse helper
  response.sendResponse(res, update);
});
//delete

UserController.delete("/:id", async (req, res) => {
  const del = await m$user.deleteUser(Number(req.params.id));

  //reponse helper
  response.sendResponse(res, del);
});

module.exports = UserController;
