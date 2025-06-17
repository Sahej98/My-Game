import './styles/index.css';
import GameArea from './pages/GameArea';
import BuildMenu from './pages/BuildMenu';
import StatusBar from './components/StatusBar';
import ActionBar from './components/ActionBar';

export default function App() {
  return (
    <>
      <StatusBar />
      <GameArea />
      <ActionBar />
    </>
  );
}
