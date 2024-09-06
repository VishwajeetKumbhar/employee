import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Pages/header/Header';
import Dashboard from './Pages/Dashboard/Dashboard';
import Nomatch from './Pages/NoMatch/Nomatch';
import PostUser from './Pages/Employee/PostUser';
import UpdateUser from './Pages/UpdateUser/UpdateUser';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/employee' element={<PostUser />} />
        <Route path='/employee/:id' element={<UpdateUser />} />
        <Route path='*' element={<Nomatch />} />
      </Routes>

    </>
  );
}

export default App;
