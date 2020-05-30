import React from 'react';

//import logo from './logo.svg';
import './App.css';
import Layout from './components/Layout/Layout';
import Airlines from './containers/Airlines/Airlines';


function App() {
  return (    
    <div className="App">    
      <Layout>
        <Airlines />
      </Layout>
    </div>
  );
}

export default App;
