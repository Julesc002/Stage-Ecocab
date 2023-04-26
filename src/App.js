import React from 'react';
import { BrowserRouter} from 'react-router-dom';
import Footer from './components/Footer';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <footer>
          <Footer/>
        </footer>
      </BrowserRouter>
    </>
  );
};

export default App;