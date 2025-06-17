import { useState } from 'react';
import '../styles/StatusBar.css';
import MainMenu from './MainMenu';
import { Menu, IndianRupee } from 'lucide-react';
import {Link} from 'react-router-dom';

export default function StatusBar() {
  const [visible, setVisible] = useState(false);

  const handleClick = ()=> {
    setVisible(!visible);
  }

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
            <div className='money'>₹2000</div>
          </div>
          <div className='exp-bar'>
            <p className='exp-first'>Level 1</p>
            <p className='exp-second'>50/100</p>
            <div className='progress'></div>
          </div>
        </div>

        <img src='' alt='' />
      </div>

      {visible && <MainMenu/>}
    </div>
  );
}
