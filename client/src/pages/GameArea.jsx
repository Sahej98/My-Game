import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from '../components/Plot';
import '../styles/GameArea.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function GameArea() {
  const [plots, setPlots] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/plots`);
        setPlots(res.data.plots || []);
      } catch (err) {
        console.error('❌ Error fetching plots:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlots();
  }, []);

  const handlePlotClick = (plot) => {
    if (!plot.unlocked) {
      setMessage('🔒 This plot is not yet unlocked!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    if (plot.building) {
      navigate(`/info/${plot._id}`);
    } else {
      navigate(`/build/${plot._id}`);
    }
  };

  return (
    <div className='game-cont'>
      {loading ? (
        <p>Loading plots...</p>
      ) : (
        plots.map((plot) => (
          <Plot
            key={plot._id}
            id={plot._id}
            plot={plot}
            onClick={handlePlotClick}
          />
        ))
      )}

      {message && <div className='plot-message'>{message}</div>}
    </div>
  );
}
