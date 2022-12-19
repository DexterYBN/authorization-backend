const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    res.json("вы не авторизованы");
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    return res.json("неверный тип токена");
  }

  try {
    req.user = await jwt.verify(token, process.env.SECRET_JWT_KEY);

    next();
  } catch (e) {
    return res.json(e.toString());
  }
};
