import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import ListUsers from './components/ListUsers';
import AddUser from './components/AddUser';
import UpdateUser from './components/UpdateUser';
import ViewUser from './components/ViewUser';
import DeleteUser from './components/DeleteUser';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route index element={<ListUsers />} />
          <Route path="/add" element={<AddUser />} />
          <Route path="/update/:id" element={<UpdateUser />} />
          <Route path="/view/:id" element={<ViewUser />} />
          <Route path="/delete/:id" element={<DeleteUser />} />
          <Route path="/list" element={<ListUsers />} />          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
