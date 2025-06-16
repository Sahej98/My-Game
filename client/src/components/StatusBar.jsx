import '../styles/StatusBar.css'
import { Menu, IndianRupee } from 'lucide-react';
import {Link} from 'react-router-dom';

export default function StatusBar() {
  return (
    <div className='status-bar'>
      <div className='game-info'>
        <div className='menu-toggle'>
          <Menu />
        </div>
        <h2>Business Master</h2>
      </div>

      <div className='exp'>
        <p className='prev-level'>Level 1</p>
        <div className='expbar'>
          <div className='progress'></div>
        </div>
        <p className='next-level'>25/100</p>
      </div>

      <div className='status-info'>
        <div className='money'>
          <IndianRupee className='money-logo' />
          <p>20.86 K</p>
        </div>
        {/* <Link to=''>
          <img src='' alt='' />
        </Link> */}
        <img src="" alt="" />
      </div>
    </div>
  );
}
