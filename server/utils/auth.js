const jwt = require("jsonwebtoken");

// this should NOT be stored in js file, perhaps as an env variable
const secret = "uon.tuh@#%#@oesnt318#@PEqjkhtns54";
const expiration = "2h";

module.exports = {
	signToken: function ({ username, email, _id }) {
		const payload = { username, email, _id };

		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},
};
