const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    let token = null    

    if (bearerHeader) {
        const header = bearerHeader.split(" ")
        token = header[1]
    }
  
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send("Invalid Token");
    }

    return next();
  };

  module.exports = verifyToken