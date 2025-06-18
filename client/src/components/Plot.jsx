import '../styles/Plot.css';
import emptyImage from '../assets/empty.png';
import lockedImage from '../assets/locked.png';
import farmImage from '../assets/farm.png';
import groceryImage from '../assets/grocery.png';

export default function Plot({ id, plot, onClick }) {
  const { unlocked, building } = plot;

  const getImageSrc = () => {
    if (!unlocked) return lockedImage;
    if (building?.name === 'Farm') return farmImage;
    if (building?.name === 'Grocery Store') return groceryImage;
    return emptyImage;
  };

  return (
    <div
      className={`plot ${unlocked ? 'unlocked' : 'locked'}`}
      onClick={onClick}>
      <img
        src={getImageSrc()}
        alt={building?.name || 'Locked'}
        className='plot-img'
      />
    </div>
  );
}
