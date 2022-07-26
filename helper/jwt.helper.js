const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

module.exports = {
    generateToken(user) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        let data = {
            time: Date(),
            userId: user._id,
        }
        const token = jwt.sign(data, jwtSecretKey);
        return token;
    },
    validateToken(token) {
        let jwtSecretKey = process.env.JWT_SECRET_KEY;
        try {
            const verified = jwt.verify(token, jwtSecretKey);
            if (verified) {
                return true;
            } else {
                // Access Denied
                return false;
            }
        } catch (error) {
            // Access Denied
            return false;
        }
    },
    globalTokenCheck(token) {
        if (!this.validateToken(token))
            throw new Error("User is not verified")
    }
}