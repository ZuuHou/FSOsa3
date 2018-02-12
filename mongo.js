const mongoose = require('mongoose')

const url = 'mongodb://torropaa:mundatabeissi@ds233238.mlab.com:33238/fullstack'

mongoose.connect(url)

const Person = mongoose.model('Person', {
    name: String,
    number: Number
})

const person = new Person({
    name: 'Testiukko',
    number: '020202020'
})

person
    .save()
    .then(mongoose.connection.close())