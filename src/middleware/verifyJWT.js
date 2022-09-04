import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const verifyJWT = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ message: "unauthorized" });
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ message: "invalid token" });
        next();
    });
};

export default verifyJWT;
