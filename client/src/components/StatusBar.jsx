import { useEffect, useState } from 'react';
import '../styles/StatusBar.css';
import MainMenu from './MainMenu';
import { Menu } from 'lucide-react';
import axios from 'axios';

export default function StatusBar() {
  const [visible, setVisible] = useState(false);
  const [userData, setUserData] = useState(null);
  const [levelConfig, setLevelConfig] = useState([]);

  const userId = localStorage.getItem('userId'); // stored at login

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, configRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/user/${userId}`),
          axios.get('http://localhost:5000/api/level-config'),
        ]);
        setUserData(userRes.data);
        setLevelConfig(configRes.data);
      } catch (err) {
        console.error('Error fetching user or level config:', err);
      }
    };

    fetchData();
  }, [userId]);

  const handleClick = () => setVisible(!visible);

  if (!userData || levelConfig.length === 0)
    return <div className='status-bar'>Loading...</div>;

  const { cash, level, exp, profilePic } = userData;

  // Sort and compute level progress
  const sortedConfig = [...levelConfig].sort((a, b) => a.level - b.level);
  const nextLevelObj = sortedConfig.find((lvl) => lvl.level > level);
  const currentLevelObj = sortedConfig.reduce((prev, curr) => {
    return curr.level <= level ? curr : prev;
  }, sortedConfig[0]);

  const nextLevelExp =
    nextLevelObj?.requiredExp || currentLevelObj.requiredExp + 1000;
  const currentExpBase = currentLevelObj?.requiredExp || 0;
  const expGainedThisLevel = exp - currentExpBase;
  const expToNextLevel = nextLevelExp - currentExpBase;
  const progressPercent = Math.min(
    (expGainedThisLevel / expToNextLevel) * 100,
    100
  );

  return (
    <div className='status-bar'>
      <div className='game-info'>
        <div className='menu-toggle' onClick={handleClick}>
          <Menu size={28} />
        </div>
        <h2>Business Master</h2>
      </div>

      <div className='status-info'>
        <div className='status'>
          <div className='money-bar'>
            <div className='money'>₹{cash.toLocaleString()}</div>
          </div>

          <div className='exp-bar'>
            <p className='exp-first'>Level {level}</p>
            <p className='exp-second'>
              {expGainedThisLevel}/{expToNextLevel}
            </p>
            <div
              className='progress'
              style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>

        {profilePic && (
          <img src={profilePic} alt='Profile' className='profile-pic' />
        )}
      </div>

      {visible && <MainMenu />}
    </div>
  );
}
