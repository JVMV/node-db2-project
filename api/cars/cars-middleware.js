const Cars = require('./cars-model')
const vinValidator = require('vin-validator')

const checkCarId = async (req, res, next) => {
  const car = await Cars.getById(req.params.id)
  if(!car) {
    res.status(404).json({ message: "car with id <car id> is not found" })
  } else {
    req.car = car
    next()
  }
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  if(!vin) {
    res.status(400).json({ message: `vin is missing` })
  }
  else if(!make) {
    res.status(400).json({ message: `make is missing` })
  }
  else if(!model) {
    res.status(400).json({ message: `model is missing` })
  }
  else if(!mileage) {
    res.status(400).json({ message: `mileage is missing` })
  }
  else {
    next()
  }
}

const checkVinNumberValid = async (req, res, next) => {
  const { vin } = req.body
  const isValid = await vinValidator.validate(vin)
  // console.log(isValid)
  if (!isValid) {
    res.status(400).json({ message: `vin ${vin} is invalid` })
  } else {
    next()
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const existingCar = await Cars.checkVin(req.body.vin)
  console.log(existingCar)
  if(!existingCar || existingCar.length === 0) {
    next()
  } else {
    res.status(400).json({ message: `vin ${req.body.vin} already exists` })
  }

  // console.log(existingCar[0], req.body.vin)
  // if(existingCar[0].vin === req.body.vin) {
  //   res.status(400).json({ message: `vin ${req.body.vin} already exists` })
  // } else {
  //   console.log('it nexted')
  //   next()
  // }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}
