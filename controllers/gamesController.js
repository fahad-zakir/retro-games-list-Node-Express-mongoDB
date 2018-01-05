const express = require('express')
const router = express.Router({ mergeParams: true })

const Gamer = require('../db/models/Gamer')

router.get('/new', (request, response) => {
    const gamerId = request.params.gamerId
    const storeId = request.params.storeId

    Gamer.findById(gamerId)
        .then((gamer) => {
            const store = gamer.stores.id(storeId)

            response.render('gifts/new', {
                GamerId,
                store,
                pageTitle: 'New_Gift'
            })
        })
})

router.post('/', (request, response) => {
    const gamerId = request.params.gamerId
    const storeId = request.params.storeId

    const newGift = request.body

    gamer.findById(gamerId)
        .then((gamer) => {
            const store = gamer.stores.id(storeId)
            store.giftsToReturn.push(newGift)

            return gamer.save()
        })
        .then(() => {
            response.redirect(`/gamers/${gamerId}/stores/${storeId}`)
        })
})

router.get('/:giftId', (request, response) => {
    const gamerId = request.params.gamerId
    const storeId = request.params.storeId
    const giftId = request.params.giftId

    Gamer.findById(gamerId)
        .then((gamer) => {
            const store = gamer.stores.id(storeId)
            const gift = store.giftsToReturn.id(giftId)

            response.render('gifts/show', {
                gamerId,
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
    const gamerId = request.params.gamerId
    const storeId = request.params.storeId
    const giftId = request.params.giftId

    Gamer.findById(gamerId)
        .then((gamer) => {
            const store = gamer.stores.id(storeId)
            store.giftsToReturn.id(giftId).remove()

            return gamer.save()
        })
        .then(() => {
            response.redirect(`/gamers/${gamerId}/stores/${storeId}`)
        })
        .catch((error) => {
            console.log(error)
        })
})

module.exports = router
