const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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
    const maxId = persons.length > 0 ? persons.map(person => person.id).sort().reverse()[0] : 0
    const person = req.body
    person.id = maxId + 1

    persons = persons.concat(person)
    res.json(person)
})

app.get('/info', (req, res) => {
    res.send(
        `<p>puhelinluettelossa on ${persons.length} henkilön tiedot</p>
        <p>${new Date()}</p>`
    )
})

const port = 3001
app.listen(port)
console.log(`Server running on port ${port}`)