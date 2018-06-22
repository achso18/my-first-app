const knex = require('knex')(require('../knexOwncloud'))

module.exports = {
  getGroup({uid}) {
    return knex.select('gid')
      .from('oc_group_user')
      .where({uid})
      .then((group) => {
        if (!group) return false
        return group
      })
  },

  getGroups() {
    return knex.select('gid')
      .from('oc_groups')
      .then((groups) => {
        if (!groups) return false
        return groups
      })
  },

  addGroup({gid}) {
    return knex('oc_groups')
      .insert({gid})
      .catch((e) => {
        console.error(e)
        return false
      })
  },

  deleteGroup({gid}) {
    return knex('oc_groups')
    .where({gid})
    .del()
    .catch((e) => {
      console.error(e)
      return false
    })
  }
}
