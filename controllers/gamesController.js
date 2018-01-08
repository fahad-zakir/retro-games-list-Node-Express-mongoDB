const express = require('express')
const router = express.Router({
    mergeParams: true
})
// Ask Teacher About why the app.js isn't allowing 
// the body parser to be used globally(scope)
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({
    extended: false
}))
router.use(bodyParser.json())

const User = require('../db/models/User')

router.get('/', (request, response) => {
    const userId = request.params.userId

    User.findById(userId)
        .then((user) => {
            response.render('games/index', {
                userFullName: `${user.firstName} ${user.lastName}`,
                userId: user._id,
                games: user.games,
                pageTitle: 'Games'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/new', (request, response) => {
    const userId = request.params.userId

    response.render('games/new', {
        userId,
        pageTitle: 'New Game'
    })
})

router.get('/:gameId', (request, response) => {
    const userId = request.params.userId
    const gameId = request.params.gameId

    User.findById(userId)
        .then((user) => {
            const game = user.games.id(gameId)
            response.render('games/show', {
                userId,
                game,
                pageTitle: 'Game'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/', (request, response) => {
    const userId = request.params.userId
    const newGame = request.body

    User.findById(userId)
        .then((user) => {
            user.games.push(newGame)
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/games`)
        })
        .catch((error) => {
            console.log(error)
        })

})

router.get('/:gameId/delete', (request, response) => {
    const userId = request.params.userId
    const gameId = request.params.gameId

    User.findById(userId)
        .then((user) => {
            user.games.id(gameId).remove()
            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/games/`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router