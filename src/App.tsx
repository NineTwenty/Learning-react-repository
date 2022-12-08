import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dialogs from 'common/components/Dialogs/Dialogs';
import Profile from 'common/components/Profile/Profile';
import HomeProfile from 'common/components/Profile/HomeProfile';
import Page from 'common/components/Page';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path='/' element={<Page />}>
        {/* Index route to ensure that page isn't empty &
            profile always get necessary id param */}
        <Route index element={<HomeProfile />} />
        <Route path='profile/:id/*' element={<Profile />}>
          <Route path=':entity' element={<Profile />} />
        </Route>
        <Route path='dialogs' element={<Dialogs />}>
          <Route path=':id' element={<Dialogs />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}

export default function AppWithClientProviders() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
