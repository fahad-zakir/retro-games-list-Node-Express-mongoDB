const mongoose = require('mongoose')
const Schema = require('../schema')

const Game = mongoose.model('Game', Schema.GameSchema)

module.exports = Game