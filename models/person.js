const mongoose = require('mongoose')

const url = 'mongodb://torropaa:mundatabeissi@ds233238.mlab.com:33238/fullstack'

mongoose.connect(url)

const Person = mongoose.model('Person', {
  name: String,
  number: String
})

module.exports = Person