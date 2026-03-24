const authService = require("../services/authService");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);

    res.cookie("token", token, {
      //js cant intercept this in the browser
      httpOnly: true,

      //send cookies only through the https
      secure: process.env.NODE_ENV === "production",

      //same site only request
      sameSite: "strict",

      //cookie expiry(7 days in miliseconds)
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,

    secure: process.env.NODE_ENV === "production",

    sameSite: "strict",
  });

  res.json({ message: "logged out successfully" });
};

module.exports = { login, logout };
