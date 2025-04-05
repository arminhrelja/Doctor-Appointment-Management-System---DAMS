import { useLocation } from 'react-router-dom';
import AppRouter from "./pages/AppRouter";
import Header from './components/Header';
import { Toaster } from './components/ui/sonner';


function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login' || location.pathname === '/register';

  return (
    <div>
          {!hideHeader && <header>{<Header />}</header>}
          <Toaster position="top-right" richColors />
      <AppRouter />
    </div>
  );
}

export default App;