import dotenv from 'dotenv'
dotenv.config()

export function authenticate(req, res, next) {
    const token = JSON.stringify(req.headers.authorization).replaceAll(`"`, "").split(" ")[1]
    if (token === process.env.AUTH_KEY) next()
    else res.status(403).json({
        "message": "Not Authorized"
    })
}