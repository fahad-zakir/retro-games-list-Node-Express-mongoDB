const express = require('express')
const router = express.Router()
// Ask Teacher About why the app.js isn't allowing 
// the body parser to be used globally(scope)
const bodyParser = require('body-parser')
router.use(bodyParser.urlencoded({
    extended: false
}))
router.use(bodyParser.json())

const User = require('../db/models/User')

router.get('/', (request, response) => {
    User.find({})
        .then((users) => {
            response.render('users/index', {
                users,
                pageTitle: ''
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/new', (request, response) => {
    response.render('users/new', {
        pageTitle: 'New User'
    })
})

router.post('/', (request, response) => {
    const newUser = request.body
    User.create(newUser)
        .then(() => {
            response.redirect('/users')
            console.log(request)
            console.log("Success")
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:userId', (request, response) => {
    const userId = request.params.userId
    console.log(request.params.userId)

    User.findById(userId)
        .then((user) => {
            response.render('users/show', {
                user,
                pageTitle: user.username
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:userId/edit', (request, response) => {
    const userId = request.params.userId
    console.log(request.params.userId)

    User.findById(userId)
        .then((user) => {
            response.render('users/edit', {
                user,
                pageTitle: 'Profile_Update'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:userId/delete', (request, response) => {
    const userId = request.params.userId

    User.findByIdAndRemove(userId)
        .then(() => {
            response.redirect('/users')
        })
        .catch((error) => {
            console.log(error)
        })
})

router.post('/:userId', (request, response) => {
    const userId = request.params.userId
    const updatedUserInfo = request.body

    console.log(updatedUserInfo);

    User.findByIdAndUpdate(userId, updatedUserInfo, {
            new: true
        })
        .then(() => {
            response.redirect(`/users/${userId}`)
        })
})

module.exports = router