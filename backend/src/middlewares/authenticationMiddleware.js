const jwt = require("jsonwebtoken");

const tokenExist = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "unauthorized" });
  }

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payLoad;
    next();
  } catch (err) {
    res.status(401).json({ error: "invalid token or expired" });
  }
};

const isAdmin = (req, res, next) => {
  const role = req.user?.role;

  if (role !== "admin") {
    return res.status(403).json({ error: "forbidden" });
  }

  next();
};

module.exports = { tokenExist, isAdmin };
