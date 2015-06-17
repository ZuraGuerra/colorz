module.exports = {

	login: function(req, res) {
		var email = req.body.email;
		var password = req.body.password;

		console.log("Login params", req.body);
		if (email === "hashtag@allgo.mx" && password === "alggomx") {
			console.log("Yaay");
			res.send("true");
		} else {
			res.send("false");
		}
	}
}