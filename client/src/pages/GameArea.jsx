import { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/GameArea.css';
import Plot from '../components/Plot';

export default function GameArea() {
  const [plots, setPlots] = useState([]);

  useEffect(() => {
    const fetchPlots = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/plots');
        console.log('✅ Fetched plots:', res.data); // ← Add this
        setPlots(res.data.plots);
      } catch (err) {
        console.error('❌ Error fetching plots:', err);
      }
    };

    fetchPlots();
  }, []);  

  return (
    <div className='game-cont'>
      {plots.length > 0 ? (
        plots.map((plot, i) => <Plot key={i} id={i + 1} plot={plot} />)
      ) : (
        <p>Loading plots...</p>
      )}
    </div>
  );
}
