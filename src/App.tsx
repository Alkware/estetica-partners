import { Login } from './pages/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Modal } from './components/ui/modal/Modal';
import { Panel } from './pages/Panel';
import { Register } from './pages/Register';

function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/' element={<Panel />} />
      </Routes>
      <Modal />
    </BrowserRouter>
  );
}

export default App;