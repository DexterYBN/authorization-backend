const User = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.usersController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();

      res.json(users);
    } catch (error) {
      return res.json({ error: error.message });
    }
  },

  registerUser: async (req, res) => {
    try {
      const { login, password } = req.body;

      const hash = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_ROUNDS)
      );

      const user = await User.create({ login, password: hash });

      res.json(user);
    } catch (error) {
      res.json({ error: error.message });
    }
  },

  login: async (req, res) => {
    try {
      const { login, password } = req.body;

      const candidate = await User.findOne({ login });

      if (!candidate) {
        return res.status(401).json("wrong login");
      }

      const valid = await bcrypt.compare(password, candidate.password);

      if (!valid) {
        return res.status(401).json("wrong password");
      }

      const payload = {
        id: candidate._id,
        login: candidate.login,
      };

      const token = jwt.sign(payload, process.env.SECRET_JWT_KEY, {
        expiresIn: "12h",
      });

      res.json({token});
    } catch (error) {
      res.json({ error: error.message });
    }
  },
};
