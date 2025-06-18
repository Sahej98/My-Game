import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GameArea.css';
import Plot from '../components/Plot';
import BuildMenu from '../pages/BuildMenu';
import BuildInfo from '../pages/BuildInfo';

export default function GameArea() {
  const [plots, setPlots] = useState([]);
  const [selectedPlot, setSelectedPlot] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/plots');
        setPlots(res.data.plots);
      } catch (err) {
        console.error('❌ Error fetching plots:', err);
      }
    };

    fetchPlots();
  }, []);

  const handlePlotClick = (plot, index) => {
    console.log('🟢 Plot clicked:', plot);

    if (!plot.unlocked) {
      setMessage('🔒 This plot is not yet unlocked!');
      setSelectedPlot(null);
      setTimeout(() => setMessage(''), 2000);
      return;
    }

    setSelectedPlot({ ...plot, index });
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

      {/* UI based on plot type */}
      {selectedPlot && !selectedPlot.building && (
        <BuildMenu plot={selectedPlot} />
      )}
      {selectedPlot && selectedPlot.building && (
        <BuildInfo plot={selectedPlot} />
      )}
      {message && <div className='plot-message'>{message}</div>}
    </div>
  );
}
