const express = require('express')
const router = express.Router({ mergeParams: true })
// Ask Teacher About why the app.js isn't allowing 
// the body parser to be used globally(scope)
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

const User = require('../db/models/User')

router.get('/new', (request, response) => {
  const userId = request.params.userId
  const gameId = request.params.gameId

  User.findById(userId)
    .then((user) => {
      const game = user.games.id(gameId)

      response.render('info/new', {
        userId,
        game,
        pageTitle: 'New_Info'
      })
    })
})

router.post('/', (request, response) => {
  const userId = request.params.userId
  const gameId = request.params.gameId

  const newInfo = request.body

  User.findById(userId)
    .then((user) => {
      const game = user.games.id(gameId)
      game.infoList.push(newInfo)

      return user.save()
    })
    .then(() => {
      response.redirect(`/users/${userId}/games/${gameId}`)
    })
})

router.get('/:infoId', (request, response) => {
  const userId = request.params.userId
  const gameId = request.params.gameId
  const infoId = request.params.infoId

  User.findById(userId)
    .then((user) => {
      const game = user.games.id(gameId)
      const info = game.infoList.id(infoId)

      response.render('info/show', {
        userId,
        game,
        info,
        pageTitle: 'Info'
      })
    })
    .catch((error) => {
      console.log(error)
    })
})

router.get('/:infoId/delete', (request, response) => {
  const userId = request.params.userId
  const gameId = request.params.gameId
  const infoId = request.params.infoId

  User.findById(userId)
    .then((user) => {
      const game = user.games.id(gameId)
      game.infoToReturn.id(infoId).remove()

      return user.save()
    })
    .then(() => {
      response.redirect(`/users/${userId}/games/${gameId}`)
    })
    .catch((error) => {
      console.log(error)
    })
})

module.exports = router
