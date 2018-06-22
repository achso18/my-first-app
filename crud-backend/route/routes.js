var express = require('express')
var router = express.Router()
var account = require('../model/user')
var domains = require('../model/domains')
var groups = require('../model/groups')

/**************************
/*         User           *
**************************/

// retrieving users from database
router.get('/get_users', function(req, res, next) {
  account.getUsers()
    .then((accounts) => {
      if (accounts) {
        console.log('get_users: ' + accounts)
        res.json(accounts)
      } else res.json({
        success: false
      })
    })
})

 // retrieving a user form database
router.get('/get_user', function(req, res, next) {
  console.log(req.query)
  res.json(account.getUser(req.query))
})

// inserting new user
router.post('/add_user', function(req, res, next) {
  console.log(req.body)
  account.addUser(req.body)
    .then((success) => {
      if (success) res.json({
        success: true
      })
      else res.json({
        success: false
      })
    })
})

// logging a user in
router.post('/log_in', function(req, res, next) {
  console.log(req.body)
  account.logIn(req.body)
    .then((success) => {
      if (success) res.json({
        success: true
      })
      else res.json({
        success: false
      })
    })
})

// updating user password
router.put('/chg_pwd', function(req, res, next) {
  console.log(req.body)
  account.chgPwd(req.body)
    .then((success) => {
      if (success) res.json({
        success: true
      })
      else res.json({
        success: false
      })
    })
})

// deleting user
router.delete('/delete_user/:username', function(req, res, next) {
  console.log(`Deleting user: ${req.params.username}`)
  account.deleteUser({
      username: req.params.username
    })
    .then((success) => {
      if (success) res.json({
        success: true
      })
      else res.json({
        success: false
      })
    })
})

/**************************
/*        Domains         *
**************************/

// retrieving domains from database
router.get('/get_domains', function(req, res, next) {
  domains.getDomains()
  .then((domains) => {
    if (domains) {
      console.log('get domains: ' + domains);
      res.json(domains)
    } else res.json({ success: false })
  })
})

// inserting new domains
router.post('/add_domain', function(req, res, next) {
  console.log(req.body)
  domains.addDomain(req.body)
  .then((success) => {
    if (success) res.json({
      success: true
    })
    else res.json({
      success: false
    })
  })
})

// deleting domain
router.delete('/delete_domain/:domain', function(req, res, next) {
  console.log(`Deleting domain: ${req.params.domain}`)
  domains.deleteDomain({
      domain: req.params.domain
    })
    .then((success) => {
      if (success) res.json({
        success: true
      })
      else res.json({
        success: false
      })
    })
})

/**************************
/*        Groups          *
**************************/

router.get('/get_group/:userId', function(req, res, next) {
  console.log(`Getting group/s for user ${req.params.userId}`);
  groups.getGroup({ uid: req.params.userId })
    .then((group) => {
      if (group) {
      console.log('get group: ' + group);
      res.json(group)
      } else res.json({ success: false })
    })
})

router.get('/get_groups', function(req, res, next) {
  groups.getGroups()
    .then((groups) => {
      if (groups) {
      console.log('get groups: ' + groups);
      res.json(groups)
      } else res.json({ success: false })
    })
})

router.post('/add_group', function(req, res, next) {
  console.log(`Adding group: ${req.body}`);
// TODO
})

router.delete('/delete_group/:groupId', function(req, res, next) {
  console.log(`Deleting group: ${req.params.groupId}`);
// TODO
})

module.exports = router
