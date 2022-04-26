import Filters from "./components/Filters";
import CardContainer from "./components/CardContainer";
import Pages from './components/Pages';

const Home = () => {
  return(
    <>
      <Filters />
      <CardContainer />
      <Pages />      
    </>
  );
};

export default Home;
