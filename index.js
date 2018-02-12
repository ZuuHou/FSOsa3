const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('data', function (res, req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

app.get('/api/persons', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.json(persons.map(Person.format))
        })
})

app.get('/api/persons/:id', (req, res) => {
    Person
        .findById(req.params.id)
        .then(person => {
            if (person) {
                res.json(Person.format(person))
            } else {
                res.status(404).end()
            }

        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

app.delete('/api/persons/:id', (req, res) => {
    Person
        .findByIdAndRemove(req.params.id)
        .then(res.status(204).end()
        )
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

app.post('/api/persons', (req, res) => {
    const body = req.body

    if (body.name === '') {
        res.status(400).send({ error: 'No name given' })
    }
    if (body.number === '') {
        res.status(400).send({ error: 'No number given' })
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })
    Person
        .find({ name: person.name })
        .then(result => {
            if (result.length > 0) {
                res.status(400).send({ error: 'Existing name' })
            } else {
                person
                    .save()
                    .then(savedPerson => {
                        res.json(Person.format(savedPerson))
                    })
                    .catch(error => {
                        console.log(error)
                    })
            }
        })

})

app.put('/api/persons/:id', (req, res) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person
        .findByIdAndUpdate(req.params.id, person, { new: true })
        .then(updatedPerson => {
            res.json(Person.format(updatedPerson))
        })
        .catch(error => {
            console.log(error)
            res.status(400).send({ error: 'malformatted id' })
        })
})

app.get('/info', (req, res) => {
    Person
        .find({})
        .then(persons => {
            res.send(
                `<p>puhelinluettelossa on ${persons.length} henkilön tiedot</p>
                 <p>${new Date()}</p>`)
        })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})