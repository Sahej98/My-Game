import '../styles/ActionBar.css';
import {
  Map,
  Warehouse,
  Search,
  MessagesSquare,
  ArrowLeftRight,
} from 'lucide-react';
export default function ActionBar() {
  return (
    <div className='action-bar'>
      <ul className='actions'>
        <li className='action'>
          <a href='/'>
            <Map size={28} /> <p>Map</p>
          </a>
        </li>
        <li className='action'>
          <a href=''>
            <Warehouse size={28} /> <p>Warehouse</p>
          </a>
        </li>
        <li className='action'>
          <a href=''>
            <Search size={28} /> <p>Search</p>
          </a>
        </li>
        <li className='action'>
          <a href=''>
            <MessagesSquare size={28} /> <p>Chat</p>
          </a>
        </li>
        <li className='action'>
          <a href=''>
            <ArrowLeftRight size={28} /> <p>Exchange</p>
          </a>
        </li>
      </ul>
    </div>
  );
}
