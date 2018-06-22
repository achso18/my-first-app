const knex = require('knex')(require('../knexVmail'))

module.exports = {
  getDomains() {
    return knex.select('domain')
    .from('domains')
    .then((domains) => {
      if(!domains) return false
      console.log(domains)
      return domains
    })
  },

  deleteDomain({domain}) {
    return knex('domains')
    .where({domain})
    .del()
    .catch((e) => {
      console.error(e)
      return false
    })
  },

  addDomain({domain}) {
    console.log(`Adding domain ${domain} to database`)
    return knex('domains')
    .insert({domain})
    .catch((e) => {
      console.error(e)
      return false
    })
  }
}
