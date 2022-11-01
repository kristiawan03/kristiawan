const prisma = require("../helpers/database");

const Joi = require("joi");
const jwt = require('jsonwebtoken')  

class auth {
  login = async (body) => {
    try {
      const schema = await Joi.object({
        email: Joi.string().required(),
      });
      const validation = schema.validate(body);
      if (validation.error) {
        const errorDetails = validation.error.details.map((detail) => detail.message);
        return {
          status: false,
          code: 442,
          error: errorDetails.join(","),
        };
      }
      const user = await prisma.user.findFirst({
        where: {
          email: body.email,
        },
      });
      if (!user) {
        return {
          status: false,
          code: 404,
          error: "user not found",
        };
      }
      if (!bcrypt.compareSync(body.password, user.password)) {
        return {
            status: false,
            code:401,
            error: 'password salah'
        }
      }
      const payload = {
        id: user.id,
        email: user.email
      }
      const token = jwt.sign(payload, 'jwt-secret-code',{expiresIn:8h})
      return {
        status: true,
        data: {
            token
        }
      }
    } catch (error) {
      console.error("login auth module error: ", error);
      return {
        status: false,
        error,
      };
    }
  };
}
