/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 exports.seed = async function(knex) {
  await knex('cars').truncate()
  await knex('cars').insert([
    {vin: '17284SJ376K1304', make: 'Reliant', model: 'Robin', mileage: '724346', title: 'rebuilt', transmission: '4-speed Manual'},
    {vin: '283GLSJBN9376G2', make: 'Honda', model: 'Civic', mileage: '12644', title: 'clean', transmission: 'CVT'},
    {vin: '296GJSB176GK826', make: 'Mercedes Benz', model: 'C63', mileage: '69250', title: 'clean', transmission: '7-speed Automatic'},
    {vin: '1JDMBR0H6S2K911', make: 'Acura', model: 'Integra', mileage: '345809'},
    {vin: '1JDMBR0H6S2K901', make: 'Audi', model: 'A6', mileage: '166137'}
  ]);
};
