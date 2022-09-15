const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  const { id } = req.params
  const car = await Cars.getById(id)
  if(!car) {
    res.status(404).json({ message: "car with id <car id> is not found" })
  } else {
    req.car = car
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if(!vin || !make || !model || !mileage) {
    res.status(400).json({ message: `<field name> is missing` })
  } else {
    next()
  }
}

const checkVinNumberValid = async (req, res, next) => {
  const { vin } = req.body
  const isValid = await vinValidator.validate(vin)
  if (!isValid) {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const vinNum = await Cars.checkVin(req.body.vin)
  if(!vinNum) {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` })
  } else {
    next()
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
