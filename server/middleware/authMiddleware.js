const jwt = require("jsonwebtoken");

/**
 * Rejects any request that does not carry a valid, unexpired JWT
 * in the `Authorization: Bearer <token>` header.
 * Attach this to every route that changes data.
 */
module.exports = function authMiddleware(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, username: decoded.username };
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Invalid or expired token" });
  }
};
