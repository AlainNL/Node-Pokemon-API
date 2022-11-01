const express = require('express')
const { success, getUniqueId } = require('./helper.js')
const favicon = require('serve-favicon')
const morgan = require('morgan')
const bodyParser = require('body-parser')
let pokemons = require('./mock-pokemon')


const app = express()
const port = 3000

app
  .use(favicon(__dirname + '/favicon.ico'))
  .use(morgan('dev'))
  .use(bodyParser.json())

app.get('/', (req,res) => res.send('Hello, Express 2 !'))


app.post('/api/pokemons', (req, res) => {
  const id = getUniqueId(pokemons)
  const pokemonCreated = { ...req.body, ...{id: id, created: new Date()}}
  pokemons.push(pokemonCreated)
  const message = `Le pokémons ${pokemonCreated.name} a bien été crée.`
  res.json(success(message, pokemonCreated))
})

app.get('/api/pokemons', (req, res) => {
  const message = 'La liste des pokemons a bien été récupérée.'
  res.json(success(message, pokemons))
  res.send(success(message, pokemons))
})

app.get('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemon = pokemons.find(pokemon => pokemon.id === id)
  const message = 'Un pokemon a bien été trouvée.'
  res.json(success(message, pokemon))
})

app.put('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonUpdated = { ...req.body, id: id }
  pokemons = pokemons.map(pokemon => {
    return pokemon.id === id ? pokemonUpdated : pokemon
  })
  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifé.`
  res.json(success(message, pokemonUpdated))
})

app.delete('/api/pokemons/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const pokemonDeleted = pokemons.find(pokemon => pokemon.id === id)
  pokemons = pokemons.filter(pokemon => pokemon.id !== id)
  const message = `Le pokémon ${pokemonDeleted.name} a bien été supprimé.`
  res.json(success(message, pokemonDeleted))
})

app.listen(port, () => console.log(`Notre application Node est démarrée sur : http://localhost:${port}`))
