const authMdw = (req, res,next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(400).json({
            message: "Token is not provided",
        });
    }

    next()

}
module.exports = { authMdw }