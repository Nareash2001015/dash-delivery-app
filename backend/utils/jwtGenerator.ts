import { JWT_SECRET } from "../config";

const jwt = require('jsonwebtoken');

function jwtGenerator(userId: number, role: string): string {
    const payload = {
        user: userId,
        role: role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" });
}

export default jwtGenerator;