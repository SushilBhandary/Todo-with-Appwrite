import { BrowserRouter, Route, Routes} from 'react-router-dom'
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/homePage' element={<HomePage/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;