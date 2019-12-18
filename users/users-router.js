const router = require('express').Router();

const Users = require('./users-model');
const restrictedMid = require('../auth/restricted-mid');

router.get('/', restrictedMid, (req, res) => {
	Users.find()
		.then((users) => {
			res.json(users);
		})
		.catch((err) => res.send(err));
});

module.exports = router;
