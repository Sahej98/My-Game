module.exports = {
    Farm: {
      name: 'Farm',
      image: '/assets/farm.png',
      level: 1,
      wages: 20,
      workers: 5,
      management: 1,
      products: [
        {
          name: 'Wheat',
          image: '/assets/wheat.png',
          production: 10,
          wages: 2,
          stock: 100,
          requirements: [
            { quantity: 2, icon: '/assets/water.png' }
          ]
        }
      ]
    },
    'Grocery Store': {
      name: 'Grocery Store',
      image: '/assets/grocery.png',
      level: 1,
      wages: 30,
      workers: 4,
      management: 2,
      products: [
        {
          name: 'Bread',
          image: '/assets/bread.png',
          production: 5,
          wages: 3,
          stock: 50,
          requirements: [
            { quantity: 1, icon: '/assets/wheat.png' }
          ]
        }
      ]
    }
  };
  