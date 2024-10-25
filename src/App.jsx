import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import { CiSearch } from "react-icons/ci";
import weatherImg from './assets/cloud1_processed.jpg'
import { LuWind } from "react-icons/lu";
import { WiHumidity } from "react-icons/wi";
import axios from 'axios';


function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const handleSearch = () => {
    if (searchTerm !== "") {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&appid=f28b729bd1cecc130860189c20e576c8&&units=metric`;
      axios.get(apiUrl).then(res => {
        setWeatherData(res.data);
        setError(null)
      }).catch(err => {
        setError(err.response.data.message);
        setWeatherData(null)
      })
    }
  }

  return (
    <div className='container'>
      <div style={{ height: '200px' }} className="row min-vh-100 d-flex align-items-center justify-content-center w-100">
        <div className="col-12 col-sm-8 col-md-6 col-lg-4">
          <Card className="text-center card">
            <Card.Body>
              <input
                type="text"
                className='searchBar text-center'
                placeholder='search'
                onChange={e => setSearchTerm(e.target.value)}
              />
              <button onClick={handleSearch} className='searchBtn ms-1'><CiSearch size={20} /></button>
              <img style={{ width: '100%', height: '250px', objectFit: 'contain', marginTop: '-20px' }} src={weatherImg} alt="" />
              <h1 className='textColor'>{weatherData ? `${weatherData.main.temp}°C` : '0°C'}</h1>
              <h6 className='textColor'>{weatherData ? `${weatherData.name}` : null}</h6>
              <div className='d-flex  justify-content-evenly textColor1'>
                <div>
                  <h4>   <WiHumidity style={{ marginBottom: '3px' }} size={35} />Humidity</h4>
                  <p>{weatherData ? `${weatherData.main.humidity}%` : '0%'}</p>
                </div>
                <div>
                  <h4><LuWind size={29} className='me-2' />Wind</h4>
                  <p style={{ marginTop: '13px' }}>{weatherData ? `${weatherData.wind.speed} km/h` : '0 km/h'}</p>
                </div>
              </div>
              {error && <p className="text-danger">{error}</p>}
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App