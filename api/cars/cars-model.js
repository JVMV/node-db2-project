const knex = require('knex')

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './data/testing.db3'
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
  const car = await db('cars').where('vin', vin)
  return car
}

module.exports = {
  getAll, 
  getById, 
  create,
  checkVin
}
