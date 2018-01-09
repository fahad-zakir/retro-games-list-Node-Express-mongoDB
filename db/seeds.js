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
User.remove({})
    .then(() => {
        const fahadZakir = new User({
            username: 'fahad81',
            email: 'fahadzakir81@gmail.com',
            firstName: 'Fahad',
            lastName: 'Zakir',
            photoUrl: 'https://i.imgur.com/0yDZcCV.jpg'
        })

        const streetFighter = new Game({
            title: 'Street Fighter II',
            gameLink: 'http://emulator.online/snes/street-fighter-2-turbo/'
        })
        const streetFighterInfo = new Info({
            title: 'Street Fighter II',
            genre: 'Fighting',
            yearReleased: 1991,
            system: 'SNES'
        })
        streetFighter.infoList.push(streetFighterInfo)

        const marioKart = new Game({
            title: 'Super Mario Kart',
            gameLink: 'http://emulator.online/snes/super-mario-kart/'
        })
        const marioKartInfo = new Info({
            title: 'Super Mario Kart',
            genre: 'Racing',
            yearReleased: 1991,
            system: 'SNES'
        })
        marioKart.infoList.push(marioKartInfo)

        fahadZakir.games.push(streetFighter, marioKart)

        return fahadZakir.save()
    }).then(() => {
        return User.create({
            username: 'musa10',
            email: 'abumusa1981@hotmail.com',
            firstName: 'Musa',
            lastName: 'Zakir',
            photoUrl: 'https://i.imgur.com/zedHEOI.png'
        })
    }).then((musa) => {
        const streetsOfRage = new Game({
            title: 'Streets of Rage',
            gameLink: 'http://emulator.online/genesis/streets-of-rage/'
        })

        const starFox = new Game({
            title: 'Star Fox',
            gameLink: 'http://emulator.online/snes/star-fox/'
        })

        musa.games.push(streetsOfRage, starFox)

        return musa.save()
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