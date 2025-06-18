// utils/buildingsData.js

module.exports = {
  production: [
    {
      id: 'farm',
      name: 'Farm',
      image: '/assets/farm.png',
      cost: [50, 30, 20, 10], // maybe per level
      level: 1,
      products: [
        {
          id: 'apple',
          productionPerHour: 100, // Produces 100 apples per hour
          wagesPerHour: 50, // Pays $50 per hour
          requirementsPerHour: [
            // Requirements per hour
            { id: 'seed', quantity: 20 },
            { id: 'water', quantity: 100 },
          ],
        },
      ],
    },
  ],

  retail: [
    {
      id: 'grocery',
      name: 'Grocery Store',
      image: '/assets/grocery.png',
      cost: [80, 40, 30, 20],
      level: 1,
      products: [
        {
          id: 'apple',
          wagesPerHour: 20, // Wages to sell apples per hour
          sellRatePerHour: 50,
        },
      ],
    },
  ],
};
