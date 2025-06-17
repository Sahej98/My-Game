import '../styles/BuildMenu.css';
import { buildings, baseMaterials } from '../utils/BuildingsData';

export default function BuildMenu({ onSelect, onClose }) {
  return (
    <div className='build-cont'>
      <h1>Build Menu</h1>
      {buildings.map((category) => (
        <div key={category.type} className='building-category'>
          <h2>{category.type} Buildings</h2>
          <div className='buildings'>
            {category.buildings.map((building, index) => (
              <div className='building' key={index}>
                <img src={building.image} alt={building.name} />
                <div className='building-details'>
                  <p className='building-name'>{building.name}</p>
                  <div className='building-cost'>
                    <div className='row-1'>
                      {[0, 1].map((i) => (
                        <div className='build-material' key={`row1-${i}`}>
                          <img
                            src={baseMaterials[i].image}
                            alt={baseMaterials[i].name}
                          />
                          <p className='material-cost'>{building.cost[i]}</p>
                        </div>
                      ))}
                    </div>
                    <div className='row-2'>
                      {[2, 3].map((i) => (
                        <div className='build-material' key={`row2-${i}`}>
                          <img
                            src={baseMaterials[i].image}
                            alt={baseMaterials[i].name}
                          />
                          <p className='material-cost'>{building.cost[i]}</p>
                        </div>
                      ))}
                    </div>
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
