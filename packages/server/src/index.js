import "dotenv/config"; // <- imports environment variables
import Express from "express";
import Cors from "cors";
import Morgan from "morgan";
import { createToken, verifyToken } from "./token.js";

const PORT = process.env.PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
	console.error("JWT_SECRET environment variable is not set");
	process.exit(1);
}

const app = Express();
app.use(Morgan("dev"));
app.use(Cors());

app.get("/", (req, res) => {
	const message = `
  Welcome to a simple express.js server.

  You can use the following endpoints:

  - [POST] /tokens/:sample - to create a token with a sample parameter as a string payload
  - [GET] /tokens/:token/verify - to verify a token with a token parameter as a string token
  `;

	res.status(200).send(message);
});

app.post("/tokens/:sample", (req, res) => {
	const sample = req.params.sample;

	if (!sample) {
		res.status(400).send("sample parameter is required");
		return;
	}

	try {
		const token = createToken({ sample }, JWT_SECRET);
		res.status(200).send({ token });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

app.get("/tokens/:token/verify", (req, res) => {
	const token = req.params.token;

	if (!token) {
		res.status(400).send("token parameter is required");
		return;
	}

	try {
		const verified = verifyToken(token, JWT_SECRET);
		res.status(200).send({ verified });
	} catch (error) {
		res.status(400).send({ message: error.message });
	}
});

app.listen(PORT, () => {
	console.log(`Server is running at http://localhost:${PORT}`);
});
