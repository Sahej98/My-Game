import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Plot from '../components/Plot';
import '../styles/GameArea.css';

const API_URL = import.meta.env.VITE_API_URL;

export default function GameArea() {
  const [plots, setPlots] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/plots`);
        setPlots(res.data.plots || []);
      } catch (err) {
        console.error('❌ Error fetching plots:', err);
      }
    };

    fetchPlots();
  }, []);
  

  const handlePlotClick = (plot, index) => {
    if (!plot.unlocked) {
      setMessage('🔒 This plot is not yet unlocked!');
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    // Navigate based on whether the plot has a building
    if (plot.building) {
      navigate(`/info/${index}`); // For showing BuildInfo
    } else {
      navigate(`/build/${index}`); // For showing BuildMenu
    }
  };

  return (
    <div className='game-cont'>
      {plots.length > 0 ? (
        plots.map((plot, i) => (
          <Plot
            key={i}
            id={i + 1}
            plot={plot}
            onClick={() => handlePlotClick(plot, i)}
          />
        ))
      ) : (
        <p>Loading plots...</p>
      )}

      {message && <div className='plot-message'>{message}</div>}
    </div>
  );
}
