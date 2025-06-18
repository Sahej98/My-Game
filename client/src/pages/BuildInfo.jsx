import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/BuildInfo.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function BuildInfo() {
  const { plotIndex } = useParams();
  const navigate = useNavigate();
  const [plot, setPlot] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/plots`)
      .then((res) => setPlot(res.data.plots[plotIndex]))
      .catch((err) => console.error('❌ Error loading plot:', err));
  }, [plotIndex]);

  if (!plot || !plot.building) return <p>Loading building...</p>;

  const { building } = plot;

  const handleProduce = async (prod) => {
    const quantity = quantities[prod.id];
    if (!quantity || quantity <= 0) return alert('Enter a valid quantity');

    try {
      setLoading(true);
      const res = await axios.post(`${API_URL}/api/produce`, {
        plotIndex,
        productId: prod.id,
        quantity,
      });
      alert(res.data.message || '✅ Production started!');
    } catch (err) {
      console.error('❌ Error producing product:', err);
      alert('Failed to start production.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='build-info-overlay'>
      <div className='build-container'>
        <button className='close-btn' onClick={() => navigate(-1)}>
          ✖
        </button>

        <div className='build-summary'>
          <img
            src={building.image}
            alt={building.name}
            className='building-image'
          />
          <div className='building-details'>
            <h2>{building.name}</h2>
            <p>Level: {building.level || 1}</p>
          </div>
          <div className='building-actions'>
            <button className='building-upgrade'>Upgrade</button>
            <button className='building-downgrade'>Downgrade</button>
            <button className='building-rename'>Rename</button>
            <button className='building-demoslish'>Demolish</button>
          </div>
        </div>

        <div className='product-cont'>
          <h3>Products</h3>
          <div className='product-list'>
            {(building.products || []).map((prod, index) => (
              <div key={index} className='product-card'>
                <img src={prod.image} alt={prod.name} className='product-img' />
                <div className='product-details'>
                  <h4>{prod.name}</h4>
                  {prod.productionPerHour && (
                    <p>Production: {prod.productionPerHour}/h</p>
                  )}
                  {prod.wagesPerHour && <p>Wages: ${prod.wagesPerHour}/h</p>}
                  <p>Stock: {prod.stock ?? 0}</p>
                </div>

                {prod.requirementsPerHour?.length > 0 && (
                  <div className='requirements'>
                    <h4>Requirements (per hour)</h4>
                    <div className='requirement-icons'>
                      {prod.requirementsPerHour.map((req, idx) => (
                        <span key={idx}>
                          {req.quantity}x
                          <img
                            src={req.icon || '/assets/placeholder.png'}
                            alt={req.name || req.id}
                            className='req-icon'
                          />
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className='product-quantity'>
                  <input
                    type='number'
                    min='1'
                    placeholder='Qty'
                    value={quantities[prod.id] || ''}
                    onChange={(e) =>
                      setQuantities({
                        ...quantities,
                        [prod.id]: parseInt(e.target.value),
                      })
                    }
                  />
                  <button
                    onClick={() => handleProduce(prod)}
                    disabled={loading || !quantities[prod.id]}>
                    {loading ? 'Producing...' : 'Produce'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
