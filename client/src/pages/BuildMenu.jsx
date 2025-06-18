import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/BuildMenu.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function BuildMenu({ plotIndex }) {
  const [buildingCategories, setBuildingCategories] = useState([]);
  const navigate = useNavigate();

  const materialIcons = [
    { name: 'Bricks', image: '/assets/brick.png' },
    { name: 'Glass', image: '/assets/glass.png' },
    { name: 'Steel', image: '/assets/steel.png' },
    { name: 'Plank', image: '/assets/plank.png' },
  ];

  useEffect(() => {
    axios
      .get(`${API_URL}/api/buildings`)
      .then((res) => {
        const formatted = [
          { type: 'Production', buildings: res.data.production || [] },
          { type: 'Retail', buildings: res.data.retail || [] },
        ];
        setBuildingCategories(formatted);
      })
      .catch((err) => console.error('❌ Error fetching buildings:', err));
  }, []);

  const handleSelect = (building) => {
    console.log('🏗 Selected building for plot', plotIndex, building.name);
    // TODO: handle assignment
  };

  return (
    <div className='build-cont'>
      <button className='close-btn' onClick={() => navigate('/')}>
        ✖
      </button>
      <h1>Build Menu</h1>

      {buildingCategories.map((category) => (
        <div key={category.type} className='building-category'>
          <h2>{category.type} Buildings</h2>
          <div className='buildings'>
            {category.buildings.map((building, index) => (
              <div
                className='building'
                key={index}
                onClick={() => handleSelect(building)}>
                <img src={building.image} alt={building.name} />
                <div className='building-details'>
                  <p className='building-name'>{building.name}</p>

                  {/* Material Cost (2 rows, 2 materials each) */}
                  <div className='building-cost'>
                    {[0, 1].map((row) => (
                      <div className='material-row' key={row}>
                        {[0, 1].map((col) => {
                          const idx = row * 2 + col;
                          const material = materialIcons[idx] || {
                            name: 'Unknown',
                            image: '/assets/default.png',
                          };
                          const value = building.cost[idx] ?? 0;

                          return (
                            <div className='build-material' key={idx}>
                              <img
                                src={material.image}
                                alt={material.name}
                                className='material-icon'
                              />
                              <p>{value}</p>
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
