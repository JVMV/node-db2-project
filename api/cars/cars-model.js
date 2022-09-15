const knex = require('knex')

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/dealer.db3'
  },
  useNullAsDefault: true
})

const getAll = () => {
  return db('cars')
}

const getById = (id) => {
  return db('cars').where('id', id).first()
}

const create = async (car) => {
  const [id] = await db('cars').insert(car)
  return getById(id)
}

const checkVin = async vin => {
  return db('cars').where('vin', vin)
}

module.exports = {
  getAll, 
  getById, 
  create,
  checkVin
}
