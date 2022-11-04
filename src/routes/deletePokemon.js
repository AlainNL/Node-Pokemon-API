const { Pokemon } = require('../db/sequelize')

module.exports = (app) => {
  app.delete('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id).then(pokemon => {
      if(pokemon === null) {
        const message = `Le pokémon demandé n'existe pas. Réessayez avec un autre identifiant`
        return res.statut(404).json({message})
      }
      const pokemonDeleted = pokemon;
      return Pokemon.destroy({
        where: { id: pokemon.id }
      })
    })
      .catch(error => {
        const message = "La liste des pokémons n'a pu être modifiée. Réessayez quand quelques instanst."
        res.status(500).json({message, data: error})
    })
  })
}
