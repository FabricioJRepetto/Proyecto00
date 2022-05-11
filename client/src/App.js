import { Route, Routes } from 'react-router-dom';
import LandingPage from './components/landingpage/LandingPage'
import Nav from "./components/nav/Nav";
import Home from "./components/home/Home";
import Details from "./components/details/Details";
import Form from "./components/form/Form";
import About from "./components/about/About";
import Favs from "./components/Favs/Favs";
import "./App.css"

function App() {
  return (   
    <div className='App'>
      <Nav className='NavBar' />
      <Routes>
          <Route path="/" element={<LandingPage />}/>        
          <Route path='home' element={<Home />} />
          <Route path='home/:id' element={<Details />} />
          <Route path='create' element={<Form />} />       
          <Route path='about' element={<About />} />
          <Route path='favourites' element={<Favs />} />
          <Route path='*' element={<p>There's nothing here!</p>} />
      </Routes>
    </div>     
  );
}

export default App;
