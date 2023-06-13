function createCookie(res, name, value, path) {
    res.cookie(name, value, {
        httpOnly: true,
        secure: false,
        path: path,
        sameSite: "strict"
    })
}

export default createCookie;