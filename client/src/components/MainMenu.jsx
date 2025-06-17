import '../styles/MainMenu.css';

export default function MainMenu() {
  const handleLogout = (e) => {
    e.preventDefault(); // prevent page jump
    localStorage.removeItem('token'); // correct key
    window.location.href = '/login'; // force redirect
  };

  return (
    <ul className='main-menu'>
      <li>
        <a href='#'>About</a>
      </li>
      <li>
        <a href='#'>Achievements</a>
      </li>
      <li>
        <a href='#'>Encyclopedia</a>
      </li>
      <li>
        <a href='#'>Settings</a>
      </li>
      <li>
        <a href='#' onClick={handleLogout}>
          Logout
        </a>
      </li>
    </ul>
  );
}
