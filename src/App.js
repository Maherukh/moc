import React, { useState } from 'react';
import logo from './images/logo.png';
import Main from './components/Main';

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);

  return (
    <div className='App'>
      <header className='App-header'>
        <img height={70} src={logo} alt='logo' />
        <h1>Monk Upsell & Cross-sell</h1>
      </header>
      <hr />
      <Main selectedProducts={selectedProducts} setSelectedProducts={setSelectedProducts} />
    </div>
  );
}

export default App;