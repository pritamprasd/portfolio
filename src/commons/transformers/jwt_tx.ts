import jwt_decode from "jwt-decode";

export function parseJwt (token: string) {
    return JSON.stringify(jwt_decode(token),null, 2)
}

export function parseJwtHeader (token: string) {
    return JSON.stringify(jwt_decode(token, {header: true}),null, 2)
}

export function isValidJwt (token: string) {
    try {
        parseJwt(token)
        return true
    } catch (error) {
        return false
    }
}