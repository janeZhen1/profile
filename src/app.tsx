import { LocaleProvider } from '@arcblock/ux/lib/Locale/context';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import './app.css';
import Layout from './components/layout';
import { SessionProvider } from './contexts/session';
import Profile from './pages/profile';

function App() {
  return (
    <div className="app">
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Profile />} />
        </Route>
      </Routes>
    </div>
  );
}

export default function WrappedApp() {
  // While the blocklet is deploy to a sub path, this will be work properly.
  const basename = window?.blocklet?.prefix || '/';

  return (
    <SessionProvider>
      <LocaleProvider translations={{}}>
        <Router basename={basename}>
          <App />
        </Router>
      </LocaleProvider>
    </SessionProvider>
  );
}
