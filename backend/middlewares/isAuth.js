// import jwt from "jsonwebtoken";

// const isAuth = (req, res, next) => {
//   const token = req.cookies?.token;

//   console.log("Received cookies:", req.cookies);
//   console.log("Extracted token:", token);

//   if (!token) {
//     return res.status(401).json({ message: "Token not found" });
//   }

//   try {
//     const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decodeToken);

//     req.userId = decodeToken.userId;
//     next();
//   } catch (error) {
//     console.error("JWT verification failed:", error);
//     return res.status(401).json({ message: "Invalid token", error });
//   }
// };

// export default isAuth;

import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.userId
    next()
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or expired token' })
  }
}

export default isAuth