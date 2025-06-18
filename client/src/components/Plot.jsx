import '../styles/Plot.css';
import emptyImage from '/assets/empty.png';
import lockedImage from '/assets/locked.png';

export default function Plot({ id, plot, onClick }) {
  const { unlocked, building } = plot;

  const getImageSrc = () => {
    if (!unlocked) return lockedImage;
    if (building?.image) return building.image; // Use dynamic image from backend
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
