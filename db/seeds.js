require('dotenv').config()
const User = require('../db/models/User')
const Game = require('../db/models/Game')
const Info = require('../db/models/Info')

const mongoose = require('mongoose')


// connect to database
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
        userName: 'fahad81',
        email: 'fahadzakir81@gmail.com',
        firstName: 'Fahad',
        lastName: 'Zakir',
        photoUrl: 'https://s.cdn.turner.com/nba/nba/dam/assets/160608232408-lebron-james-2016-nba-finals---game-three.1280x720.jpeg'
    })

    const streetFighter = new Game({
        name: 'Street Fighter II',
        gameLink: 'http://emulator.online/snes/street-fighter-2-turbo/'
    })
    const streetFighter = new Info({
        title: 'Street Fighter II',
        genre: 'Fighting',
        yearReleased: 1991,
        system: 'SNES'
    })
    streetFighter.infoToReturn.push(streetFighter)

    const marioKart = new Game({
        name: 'Super Mario Kart',
        gameLink: 'http://emulator.online/snes/super-mario-kart/'
    })
    const marioKart = new Info({
        title: 'Super Mario Kart',
        genre: 'Racing',
        yearReleased: 1991,
        system: 'SNES'
    })
    marioKart.infoToReturn.push(marioKart)

    bobLoblaw.Games.push(target, sharperImage)

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
        gameLink: 'over there'
    })

    const petSmart = new Game({
        name: 'PetSmart',
        gameLink: '123 Sesame St'
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
