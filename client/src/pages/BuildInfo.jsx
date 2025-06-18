import '../styles/BuildInfo.css';

export default function BuildInfo({ plot, onClose }) {
  const building = plot?.building;

  if (!building || !building.name) {
    return (
      <div className='build-container'>
        <button className='close-btn' onClick={onClose}>
          ❌ Close
        </button>
        <p>⚠️ No building data found for this plot.</p>
      </div>
    );
  }

  return (
    <div className='build-container'>
      <div className='build-summary'>
        <img
          src={building.image || '/assets/default-building.png'}
          alt={building.name}
          className='building-image'
        />
        <h3>{building.name.toUpperCase()}</h3>
        <p>LEVEL {building.level || 1}</p>
        <p>Wages: ${building.wages || 0}/h</p>
        <p>Workers: {building.workers || 0}</p>
        <p>Management and admin: {building.management || 0}</p>
        <button className='robot-btn'>🤖 INSTALL ROBOTS</button>
        <button className='rename-btn'>✏️ RENAME</button>
        <button className='close-btn' onClick={onClose}>
          ❌ CLOSE
        </button>
      </div>

      <div className='product-list'>
        {(building.products || []).map((prod, index) => (
          <div key={index} className='product-card'>
            <img
              src={prod.image || '/assets/default-product.png'}
              alt={prod.name}
              className='product-img'
            />
            <div className='product-details'>
              <h4>{(prod.name || 'Unknown').toUpperCase()}</h4>
              <p>Production: {prod.production || 0}/h</p>
              <p>Wages: ${prod.wages || 0}/h</p>
              <p>Current stock: {prod.stock || 0}</p>
            </div>

            <div className='requirements'>
              <h5>REQUIREMENTS</h5>
              <div className='requirement-icons'>
                {(prod.requirements || []).map((req, idx) => (
                  <span key={idx}>
                    {req.quantity || 0}x
                    <img
                      src={req.icon || '/assets/default-req.png'}
                      alt='req'
                      className='req-icon'
                    />
                  </span>
                ))}
              </div>
            </div>

            <div className='quantity-control'>
              <h5>QUANTITY ❔</h5>
              <input type='number' placeholder='Quantity' min='1' />
              <div className='quantity-btns'>
                <button>2h</button>
                <button>MAX</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
