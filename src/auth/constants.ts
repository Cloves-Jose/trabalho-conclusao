// export const jwtConstants = {
//     secret: `${require('crypto').randomBytes(48, function(ee, buffer){ let token = buffer.toString('hex'); console.log(token) })}`
// }

export const jwtConstants = {
    secret: process.env.SECRET_WEB
}

export const jwtConstantsApp = {
    secret: process.env.SECRET_APP
}