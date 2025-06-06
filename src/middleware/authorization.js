const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      msg: "No tienes autorización para acceder a este recurso",
    });
  }
  try {
    let [type, token] = authorization.split(" ");
    if (type === "Token" || type === "Bearer") {
      const openToken = jwt.verify(token, process.env.SECRET_KEY);
      console.log('openToken ', openToken);
      req.user = openToken.user;
      next();
    } else {
      return res.status(401).json({
        msg: "Tipo de autorización no válido",
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "Token inválido o expirado",
      error: error.message,
    });
  }
};
