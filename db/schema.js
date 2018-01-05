const mongoose = require('mongoose')
const Schema = mongoose.Schema

mongoose.Promise = global.Promise

const GiftSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'Gift title is required!']
        },
        description: {
            type: String
        },
        price: {
            type: Number
        },
        cameFrom: {
            type: String
        }
    },
    {
        timestamps: {}
    }
)

const StoreSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Store name is required!']
        },
        address: {
            type: String
        },
        giftsToReturn: [GiftSchema]
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
        stores: [StoreSchema]
    },
    {
        timestamps: {},
        usePushEach: true
    }
)

module.exports = {
    UserSchema,
    StoreSchema,
    GiftSchema
}
