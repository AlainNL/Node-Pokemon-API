const validTypes = ['Plante', 'Poison', 'Eau', 'Feu', 'Insect', 'Vol', 'Elektrik', 'Fée']

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Le nom ne peut être vide.'},
        notNull: {msg: 'Le nom est une prorpiété requise.'}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: 'Le nom ne peut être vide.'},
        min: {
          args: [0],
          msg: 'Les points de vie doivent être supérieur à 0.'
        },
        max:
        {
          args: [999],
          msg: 'Les points de vie doivent être supérieur à 999.'
        },
        notNull: {msg: 'Le nom est une prorpiété requise.'}
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg: 'Le nom ne peut être vide.'},
        min: {
          args: [0],
          msg: 'Les points de vie doivent être supérieur à 0.'
        },
        max:
        {
          args: [99],
          msg: 'Les points de vie doivent être supérieur à 99.'
        },
        notNull: {msg: 'Le nom est une prorpiété requise.'}
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: { msg: 'Utilisez uniquement une URL valide pour limage.'},
        notNull: { msg: 'Limage est une propriété requise.'}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('types').split('.')
      },
      set(types) {
        this.setDataValue('types', types.join())
      },
      validate: {
        isTypesValid(value) {
          if(!value) {
            throw new Error('Un pokémon doit avoir au moins un type.')
          }
          if(value.split(',').length > 3) {
            throw new Error('Un pokémon ne peux avoir plus de trois types.')
          }
          /*value.split(',').forEach(type => {
            if(!validTypes.includes(type)) {
              throw new Error(`Le type d'un pokémon doit appartenir à la liste suivante: ${validTypes}`)
            }
          });*/
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}
