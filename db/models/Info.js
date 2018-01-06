const mongoose = require('mongoose')
const Schema = require('../schema')

const Info = mongoose.model('Info', Schema.InfoSchema)

module.exports = Info