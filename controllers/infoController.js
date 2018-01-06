const express = require('express')
const router = express.Router({mergeParams: true})

const User = require('../db/models/User')

router.get('/', (request, response) => {
  const userId = request.params.userId

  User.findById(userId)
    .then((user) => {
      response.render('info/index', {
        userFullName: `${user.firstName} ${user.lastName}`,
        userId: user._id,
        info: user.info,
        pageTitle: 'Info'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/new', (request, response) => {
  const userId = request.params.userId

  response.render('info/new', {
    userId,
    pageTitle: 'New_Store'
  })
})

router.get('/:storeId', (request, response) => {
  const userId = request.params.userId
  const storeId = request.params.storeId

  User.findById(userId)
    .then((user) => {
      const store = user.info.id(storeId)
      response.render('info/show', {
        userId,
        store,
        pageTitle: 'Store'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.post('/', (request, response) => {
  const userId = request.params.userId
  const newStore = request.body

  User.findById(userId)
    .then((user) => {
      user.info.push(newStore)
      return user.save()
    })
    .then(() => {
      response.redirect(`/users/${userId}/info`)
    })
    .catch((error) => {
      console.log(error)
    })

})

router.get('/:storeId/delete', (request, response) => {
  const userId = request.params.userId
  const storeId = request.params.storeId

  User.findById(userId)
    .then((user) => {
      user.info.id(storeId).remove()
      return user.save()
    })
    .then(() => {
      response.redirect(`/users/${userId}/info/`)
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router