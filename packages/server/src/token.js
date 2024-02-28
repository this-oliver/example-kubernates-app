import JWT from "jsonwebtoken";

/**
 * Returns a token of the payload signed with the secret
 *
 * @param {string} payload - a text to be signed
 * @param {string} secret - a secret used to sign the payload
 * @returns
 */
function createToken(payload, secret) {
	return JWT.sign(payload, secret);
}

/**
 * Returns true if the given token is verified with the secret
 *
 * @param {string} token - a token to be verified
 * @param {string} secret - a secret used to verify the token
 * @returns
 */
function verifyToken(token, secret) {
	try {
		const decodedToken = JWT.verify(token, secret);
		return !decodedToken ? false : true;
	} catch (error) {
		return false;
	}
}

export { createToken, verifyToken };
