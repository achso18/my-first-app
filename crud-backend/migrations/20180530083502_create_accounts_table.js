
exports.up = function (knex, Promise) {
  return knex.schema.createTable('accounts', function (t) {
	  t.increments('id').primary()
    t.string('username').notNullable()
	  t.string('domain').notNullable()
    t.string('password').notNullable()
	  t.integer('quota').defaultTo(0)
	  t.boolean('enabled').defaultTo(false)
	  t.boolean('sendonly').defaultTo(false)
	  t.unique(['username', 'domain'])
	 // t.foreign('domain').references('domain').inTable('domains');
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTableIfExists('accounts')
}
