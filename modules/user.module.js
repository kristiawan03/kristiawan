// module berisi fungsi yang berkaitan denga query ke database

const prisma = require("../helpers/database");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { options, options } = require("joi");

class _user {
  listUser = async () => {
    try {
      const list = await prisma.user.findMany();
      console.log(list);

      return {
        status: true,
        data: list,
      };
    } catch (error) {
      console.error("listUser user module: ", error);
      return {
        status: false,
        error,
      };
    }
  };
  createUser = async (body) => {
    try {
      const schema = Joi.object({
        name: Joi.string().require(),
        email: Joi.string().require(),
        password: Joi.string().require(),
      }).options({ abortEarly: false });
      const validation = schema.validate(body);
      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);
        return {
          status: false,
          code: 422,
          error: errorDetails.join(","),
        };
      }
      const password = bcrypt.hashSync(body.password, 10);
      const add = await prisma.user.create({
        data: {
          name: body.name,
          email: body.email,
          password,
        },
      });
      return {
        status: true,
        code: 201,
        data: add,
      };
    } catch (error) {
      console.error("listUser user module: ", error);
      return {
        status: false,
        error,
      };
    }
  };
  updateUser = async (id, body) => {
    try {
      const schema = Joi.object({
        name: Joi.string().require(),
        email: Joi.string().require(),
        password: Joi.string().require(),
      }).options({ abortEarly: false });
      const validation = schema.validate(body);
      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);
        return {
          status: false,
          code: 422,
          error: errorDetails.join(","),
        };
      }

      const update = await prisma.user.update({
        where: {
          id: body.id,
        },
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
        },
      });
      return {
        status: true,
        code: 201,
        data: add,
      };
    } catch (error) {
      console.error("listUser user module: ", error);
      return {
        status: false,
        error,
      };
    }
  };
  deleteUser = async (id) => {
    try {
      const schema = Joi.number().require();
      const validation = schema.validate(id);
      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);
        return {
          status: false,
          code: 422,
          error: errorDetails,
        };
      }

      const del = await prisma.user.delete({
        where: {
          id: id,
        },
      });
      return {
        status: true,

        data: dell,
      };
    } catch (error) {
      console.error("listUser user module: ", error);
      return {
        status: false,
        error,
      };
    }
  };
}

module.exports = new _user();
