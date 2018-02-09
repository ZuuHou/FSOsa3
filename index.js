const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('data', function (res, req) {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :data :status :res[content-length] - :response-time ms'))

let persons = [
    {
        name: "Jamppa Tuominen",
        number: "09696969",
        id: 1
    },
    {
        name: "Katriina Tuominen",
        number: "09424242",
        id: 2
    }
]

app.get('/', (req, res) => {
    res.send('<p>Täähän toimii</p>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const person = req.body
    person.id = Math.floor((Math.random() * 1000000) + 1)

    if (person.name === "") {
        res.status(202).send({ error: 'No name given' })
    }
    if (person.number === "") {
        res.status(202).send({ error: 'No number given' })
    }
    const existingPerson = persons.find(p => p.name === person.name)
    if (existingPerson) {
        res.status(202).send({ error: 'Name exists' })
    }

    persons = persons.concat(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    res.send(
        `<p>puhelinluettelossa on ${persons.length} henkilön tiedot</p>
        <p>${new Date()}</p>`
    )
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})