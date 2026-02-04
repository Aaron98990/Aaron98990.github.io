import RoomCountIndicator from '../RoomCountIndicator/RoomCountIndicator';
import styles from './ProjectTile.module.css';

const ProjectTile = ({ 
  title, 
  description, 
  buttonText, 
  buttonUrl, 
  roomCount = 0, 
  onMouseOver, 
  isAnimated = false,
  isInternal = false 
}) => {
  const handleClick = () => {
    if (isInternal) {
      // Handle internal navigation with React Router if needed
      window.location.href = buttonUrl;
    } else {
      window.open(buttonUrl, '_blank');
    }
  };

  const tileClasses = `${styles.tile} ${isAnimated ? 'animate__animated animate__fadeInDown' : ''}`;

  return (
    <div className={styles.spacer}>
      <div className={tileClasses} onMouseOver={onMouseOver}>
        <div className={styles.tileBody}>
          <h2 className={styles.header}>
            {title}
            <RoomCountIndicator 
              count={roomCount} 
              href="https://buzzin.feleke.xyz/visual" 
            />
          </h2>
          <div className={styles.icon}></div>
          <div className={styles.description}>{description}</div>
          <button onClick={handleClick} className={styles.button}>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectTile;