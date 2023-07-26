import React, { useState, useEffect } from 'react'
import { fetchDataFromAPI } from './utils/api'

function App() {
  const [count, setCount] = useState(0);


  const apiTestting = async() =>{
    const data = await fetchDataFromAPI('/movie/popular');
    console.log(data);
  }

  useEffect(() => {
    apiTestting();
  }, []);

  return (
    <React.Fragment>
      <div>App</div>
    </React.Fragment>
  )
}

export default App
