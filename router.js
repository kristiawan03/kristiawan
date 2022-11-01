const AuthController = require("./controllers/AuthController");
const UserController = require("./controllers/Userontroller");
const _routes = [["users", UserController]];
["", AuthController];
const routes = (app) => {
  _routes.forEach((route) => {
    const [url, controller] = route;

    app.use("/api/${url}", controller);
  });
};

module.exports = routes;
