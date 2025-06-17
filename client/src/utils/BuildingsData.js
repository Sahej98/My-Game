import farmImage from '../assets/farm.png';
import ranchImage from '../assets/ranch.png';
import groceryImage from '../assets/grocery.png';

import brickImage from '../assets/brick.png';
import glassImage from '../assets/glass.png';
import steelImage from '../assets/steel.png';
import plankImage from '../assets/plank.png';

export const baseMaterials = [
  { name: 'brick', image: brickImage },
  { name: 'glass', image: glassImage },
  { name: 'steel', image: steelImage },
  { name: 'plank', image: plankImage },
];

export const buildings = [
  {
    type: 'Production',
    buildings: [
      {
        name: 'Farm',
        image: farmImage,
        cost: [100, 100, 100, 100],
      },
      {
        name: 'Ranch',
        image: ranchImage,
        cost: [100, 100, 100, 100],
      },
    ],
  },
  {
    type: 'Retail',
    buildings: [
      {
        name: 'Retail Store',
        image: groceryImage,
        cost: [100, 100, 100, 100],
      },
    ],
  },
];
