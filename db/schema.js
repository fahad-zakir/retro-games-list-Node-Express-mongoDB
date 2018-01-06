const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const InfoSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Info title is required!']
        },
        description: {
            type: String
        },
        yearReleased: {
            type: Number
        },
        cheats: {
            type: String
        }
    },
    {
        timestamps: {}
    }
)

const GameSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Game name is required!']
        },
        gameLink: {
            type: String
        },
        InfosToReturn: [InfoSchema]
    },
    {
        timestamps: {}
    }
)

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required!']
        },
        email: {
            type: String
        },
        firstName: {
            type: String,
            required: [true, 'First name is required!']
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required!']
        },
        photoUrl: {
            type: String,
            default: 'https://cdn.vectorstock.com/i/thumb-large/66/69/santa-hat-vector-296669.jpg'
        },
        games: [GameSchema]
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

module.exports = {
    UserSchema,
    GameSchema,
    InfoSchema
}
