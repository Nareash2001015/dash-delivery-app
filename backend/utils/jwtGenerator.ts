import { JWT_SECRET } from "../config";

const jwt = require('jsonwebtoken');

function jwtGenerator(user_id: number, role: string): string {
    const payload = {
        user: user_id,
        role: role
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "1hr" });
}

export default jwtGenerator;