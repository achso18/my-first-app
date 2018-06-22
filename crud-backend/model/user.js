const knex = require('knex')(require('../knexVmail'))
const crypto = require('crypto')

module.exports = {
  getUsers () {
    return knex.select('username', 'domain', 'password').from('accounts')
      .then((accounts) => {
        if (!accounts) return false
			    console.log(accounts)
			    return accounts
      })
  },

  getUser ({username}) {
    console.log(`Get user ${username} from db`)
    return knex('accounts')
      .where({username})
      .catch((e) => {
        console.error(e)
      })
  },

  logIn ({username, password}) {
    console.log(`Log in ${username} with password ${password}`)
    return knex('accounts').where({ username })
      .then(([user]) => {
        if (!user) return false
        const hash = '{SHA512}' + hashPassword(password)
        console.log(`${hash} === ${user.password}`)
        return hash === user.password
      })
  },

  addUser ({username, domain, password}) {
    console.log(`Adding user ${username}@${domain} with password ${password}`)
    const hash = hashPassword(password)
    password = '{SHA512}' + hash
    return knex('accounts')
		    .insert({
        username,
        domain,
        password
		    })
		    .catch((e) => {
			    console.error(e)
          return false
      })
  },

  chgPwd ({username, domain, password}) {
    const hash = hashPassword(password)
    password = '{SHA512}' + hash
    return knex('accounts')
      .where({username})
      .update({password})
      .catch((e) => {
        console.error(e)
        return false
      })
  },

  deleteUser ({username}) {
    return knex('accounts')
      .where({username})
      .del()
      .catch((e) => {
        console.error(e)
        return false
      })
  }
}

function hashPassword (password) {
  const hash = crypto
    .createHash('sha512')
    .update(password)
    .digest('base64')
  return hash
}
