const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model');

router.post('/register', (req, res) => {
	let user = req.body;
	const hash = bcrypt.hashSync(user.password, 10);
	user.password = hash;
	Users.add(user)
		.then((saved) => {
			res.status(201).json(saved);
		})
		.catch((error) => {
			res.status(500).json({ errorMessage: 'registertration does not work' });
		});
});

router.post('/login', (req, res) => {
	let { username, password } = req.body;
	Users.findBy({ username })
		.first()
		.then((user) => {
			if (user && bcrypt.compareSync(password, user.password)) {
				//signToken
				const token = signToken(user);
				//send the token
				res.status(200).json({
					token,
					message : `Welcome ${user.username}!`,
				});
			} else {
				res.status(401).json({ message: 'Invalid Creds!' });
			}
		})
		.catch((error) => {
			res.status(500).json({ errorMessage: 'could not log in' });
		});
});

function signToken(user) {
	const payload = {
		username : user.username,
	};
	const secret = process.env.JWT_SECRET || 'keep it safe!';
	const options = {
		expiresIn : '1h',
	};
	return jwt.sign(payload, secret, options);
}

module.exports = router;
