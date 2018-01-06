const express = require('express')
const router = express.Router({ mergeParams: true })

const User = require('../db/models/User')

router.get('/new', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId

    User.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)

            response.render('gifts/new', {
                UserId,
                store,
                pageTitle: 'New_Gift'
            })
        })
})

router.post('/', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId

    const newGift = request.body

    user.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)
            store.giftsToReturn.push(newGift)

            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/stores/${storeId}`)
        })
})

router.get('/:giftId', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId
    const giftId = request.params.giftId

    User.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)
            const gift = store.giftsToReturn.id(giftId)

            response.render('gifts/show', {
                userId,
                store,
                gift,
                pageTitle: 'Gifts'
            })
        })
        .catch((error) => {
            console.log(error)
        })
})

router.get('/:giftId/delete', (request, response) => {
    const userId = request.params.userId
    const storeId = request.params.storeId
    const giftId = request.params.giftId

    User.findById(userId)
        .then((user) => {
            const store = user.stores.id(storeId)
            store.giftsToReturn.id(giftId).remove()

            return user.save()
        })
        .then(() => {
            response.redirect(`/users/${userId}/stores/${storeId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router
