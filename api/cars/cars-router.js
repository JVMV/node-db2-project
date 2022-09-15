const Cars = require('./cars-model')
const router = require('express').Router()

const {
    checkCarId,
    checkCarPayload,
    checkVinNumberUnique,
    checkVinNumberValid
  } = require('./cars-middleware')

router.get('/', async (req, res) => {
    const cars = await Cars.getAll()
    res.status(200).json(cars)
})

router.get('/:id', checkCarId, (req, res) => {
    res.status(200).json(req.car)
})

router.post('/', checkCarId, checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res) => {
    const newCarID = await Cars.create(req.body)
    const newCar = await Cars.getById(newCarID)
    res.status(201).json(newCar)
})


module.exports = router