import '../styles/GameArea.css';
import Plot from '../components/Plot';

export default function GameArea() {
  return (
    <div className='game-cont'>
      {Array.from({ length: 32 }).map((_, i) => (
        <Plot key={i} />
      ))}
    </div>
  );
}
