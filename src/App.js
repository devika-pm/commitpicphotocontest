import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Home from './Components/Home';
import Contest from './Components/Contest';
import Auth from './Components/Auth';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/contest' element={<Contest/>}/>
        <Route path='/register' element={<Auth register/>}/>
        <Route path='/login' element={<Auth login/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
