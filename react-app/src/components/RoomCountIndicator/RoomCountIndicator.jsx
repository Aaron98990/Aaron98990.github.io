import styles from './RoomCountIndicator.module.css';

const RoomCountIndicator = ({ count, href = '#' }) => {
  if (count <= 0) return null;

  const text = `${count} room${count === 1 ? '' : 's'} in last 24h`;

  return (
    <a href={href} className={styles.roomCountIndicator}>
      {text}
    </a>
  );
};

export default RoomCountIndicator;