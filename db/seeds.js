require('dotenv').config()
const User = require('../db/models/User')
const Game = require('../db/models/Game')
const Info = require('../db/models/Info')
const mongoose = require('mongoose')

// connect to database
mongoose.connect(process.env.MONGODB_URI, {
    useMongoClient: true
})

mongoose.connection.once('open', () => {
    console.log(`Mongoose has connected to MongoDB`)
})

mongoose.connection.on('error', (error) => {
    console.error(`
    MongoDB connection error!!! 
    ${error}
  `)
    process.exit(-1)
})

// Delete all users, then add some fake ones
User.remove({}).then(() => {
    const bobLoblaw = new User({
        username: 'bob_loblaw',
        email: 'bob@loblawlawblog.com',
        firstName: 'Robert',
        lastName: 'Loblaw',
        photoUrl: 'https://enterprisectr.org/wp-content/uploads/2014/09/bobloblaw.jpg'
    })

    const target = new Game({
        name: 'Target',
        address: 'over there'
    })
    const toaster = new Info({
        title: 'Toaster',
        description: 'why?',
        price: 25.41,
        cameFrom: 'Lucille'
    })
    target.InfosToReturn.push(toaster)

    const sharperImage = new Game({
        name: 'Sharper Image',
        address: 'the mall'
    })
    const massageChair = new Info({
        title: 'Massage Chair',
        description: 'already have too many',
        price: 1521.67,
        cameFrom: 'Oscar'
    })
    sharperImage.infoToReturn.push(massageChair)

    bobLoblaw.games.push(target, sharperImage)

    return bobLoblaw.save()
}).then(() => {
    return User.create({
        username: 'GOB',
        email: 'ceo@bluthcompany.com',
        firstName: 'George',
        lastName: 'Bluth',
        photoUrl: 'https://pbs.twimg.com/profile_images/378800000134134212/81a38a74f2f122459e88a5f95987a139.jpeg'
    })
}).then((gob) => {
    const magicGame = new Game({
        name: 'The Magic Game',
        address: 'over there'
    })

    const petSmart = new Game({
        name: 'PetSmart',
        address: '123 Sesame St'
    })

    gob.games.push(magicGame, petSmart)

    return gob.save()
}).catch((error) => {
    console.log('!!!!! ERROR SAVING SEEDED DATA !!!!!')
    console.log(error)
}).then(() => {
    mongoose.connection.close()
    console.log(`
      Finished seeding database...
      
      Disconnected from MongoDB
    `)
})
