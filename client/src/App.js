import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage'
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Details from "./components/details/Details";
import Form from "./components/form/Form";
import About from "./components/about/About";
import "./App.css"

function App() {
//   let flag = true;
//   if (/localhost:3000\/*$/.test(document.URL)) flag = false
  return (   
    <div className='App'>
      <Nav className='NavBar' />
      <Routes>
          <Route path="/" element={<LandingPage />}/>        
          <Route path='home' element={<Home />} />
          <Route path='home/:id' element={<Details />} />
          <Route path='create' element={<Form />} />       
          <Route path='about' element={<About />} />
          <Route path='*' element={<p>There's nothing here!</p>} />
      </Routes>
    </div>     
  );
}

export default App;
