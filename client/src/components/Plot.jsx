import '../styles/Plot.css';
import emptyImage from '../assets/empty.png';
import lockedImage from '../assets/locked.png';
import farmImage from '../assets/farm.png';
import ranchImage from '../assets/ranch.png';
import groceryImage from '../assets/grocery.png';

export default function Plot({ id, plot, onClick }) {
  if (!plot) return <div className='plot'>Loading...</div>;

  const { unlocked, building } = plot;

  const getImageSrc = () => {
    if (!unlocked) return lockedImage;
    if (building === 'Farm') return farmImage;
    if (building === 'Grocery Store') return groceryImage;
    return emptyImage;
  };

  return (
    <div
      className={`plot ${unlocked ? 'unlocked' : 'locked'}`}
      onClick={onClick}>
      <img
        src={getImageSrc()}
        alt={building || 'Locked'}
        className='plot-img'
      />
    </div>
  );
}
