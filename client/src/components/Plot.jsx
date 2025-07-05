import '../styles/Plot.css';
import emptyImage from '/assets/empty.png';
import lockedImage from '/assets/locked.png';

export default function Plot({ id, plot, onClick }) {
  const { unlocked, building } = plot;

  const getImageSrc = () => {
    if (!unlocked) return lockedImage;
    if (building?.image) return building.image;
    return emptyImage;
  };

  const label = !unlocked ? 'Locked Plot' : (building?.name || 'Empty Plot');

  return (
    <div
      className={`plot ${unlocked ? 'unlocked' : 'locked'}`}
      onClick={() => onClick(plot)}
      title={label}>
      <img
        src={getImageSrc()}
        alt={label}
        aria-label={label}
        className='plot-img'
      />
    </div>
  );
}
