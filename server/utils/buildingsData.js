const generateUpgradeCost = (baseCost, levels, multiplier = 1.25) =>
  Array.from({ length: levels - 1 }, (_, i) =>
    Math.round(baseCost * Math.pow(multiplier, i + 1))
  );

module.exports = {
  production: [
    {
      id: 'farm',
      name: 'Farm',
      image: '/assets/farm.png',
      level: 1,
      maxLevel: 5,
      cost: [50, 30, 20, 10],
      upgradeCost: generateUpgradeCost(50, 5), // auto-calculated
      buildTime: 1800,
      products: [
        {
          id: 'apple',
          productionPerHour: 100,
          wagesPerHour: 50,
          requirementsPerHour: [
            { id: 'seed', quantity: 20 },
            { id: 'water', quantity: 100 },
            { id: 'power', quantity: 10 }
          ]
        }
      ]
    }
  ],

  retail: [
    {
      id: 'grocery',
      name: 'Grocery Store',
      image: '/assets/grocery.png',
      level: 1,
      maxLevel: 5,
      cost: [80, 40, 30, 20],
      upgradeCost: generateUpgradeCost(80, 5),
      buildTime: 1200,
      products: [
        {
          id: 'apple',
          sellRatePerHour: 50,
          wagesPerHour: 20
        }
      ]
    }
  ]
};
