exports.seed = function(knex) {
	// Deletes ALL existing entries
	// Inserts seed entries
	return knex('users').insert([
		{ username: 'Penni', password: 'Penni', department: 'doggos' },
		{ username: 'Buddha', password: 'Buddha', department: 'doggos' },
		{ username: 'Ryan', password: 'Ryan', department: 'hoomans' },
	]);
};
