const { response } = require("express");
const Usuario = require("../models/user");
const bcryptjs = require("bcryptjs");

const login = async (req, res = response) => {
	const { email, password } = req.body;
	try {
		const usuario = await Usuario.findOne({ email });
		// Verificar si el email existe
		if (!usuario) {
			return res.status(400).json({
				msg: "User / Password is not valid - email",
			});
		}
		// El usuario es activo?
		if (!usuario.status) {
			return res.status(400).json({
				msg: "User / Password is not valid - status false",
			});
		}
		// Verificar contraseña
		const validPass = bcryptjs.compareSync(password, usuario.password);
		if (!validPass) {
			return res.status(400).json({
				msg: "User / Password is not valid - password",
			});
		}

		res.json({
			msg: "Success",
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			msg: "Please contact admin",
		});
	}
};

module.exports = {
	login,
};
