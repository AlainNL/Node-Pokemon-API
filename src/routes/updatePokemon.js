const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.put('/api/pokemons/:id', (req,res) => {
    const id = req.params.id
    Pokemon.update(req.body, {
      where: { id: id }
    })
    .then(_ => {
      return Pokemon.findByPk(id).then(pokemon => {
        if(pokemon === null) {
          const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant`
          return res.statut(404).json({message})
        }
        const message = `Le pokémon ${pokemon.name} a bien été modifiée.`
        return res.json({message, data: pokemon})
      })
    })
    .catch(error => {
      const message = "La liste des pokémons n'a pu être modifiée. Réessayez quand quelques instanst."
      res.status(500).json({message, data: error})
    })
  })
}
