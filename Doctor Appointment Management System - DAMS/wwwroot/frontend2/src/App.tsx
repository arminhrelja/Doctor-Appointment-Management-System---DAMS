import { useLocation } from 'react-router-dom';
import AppRouter from "./pages/AppRouter";
import Header from './components/Header';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
      {!hideHeader && <header>{<Header/>}</header>}
      <AppRouter />
    </div>
  );
}

export default App;