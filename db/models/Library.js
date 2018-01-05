const mongoose = require('mongoose')
const Schema = require('../schema')

const Store = mongoose.model('Store', Schema.LibrarySchema)

module.exports = Store