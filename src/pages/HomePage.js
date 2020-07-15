import React, { useState,useEffect } from 'react';

import styles from './assets/Styles.module.scss';
import Toast from '../components/helpers/toast';
import UpperMenu from '../components/UI_components/UpperMenu';
import SearchBar from "../components/UI_components/SearchBar";
import GridBoxes from '../components/UI_components/HomeGridBox';

import {getForecasts, getCurrentWeather} from '../components/Weather_API';




function HomePage (props){

    const {cityFromFav}=props.history.location;
    const [forecast, setForecast]= useState(null);
    const [currentWeather, setCurrentWeather]= useState(null);
    const [city, setCity] = useState('Tel Aviv');

    useEffect(()=>{
        onGetForecast(city);
        onGetCurrentWeather(city);

    },[city]);

    useEffect(()=>{
        if(cityFromFav !== undefined) {
            setCity(cityFromFav);
        }
    },[cityFromFav]);

    const onGetForecast = (city)=>{
          getForecasts(city)
              .then(data=>{
                  if(data.Code==='ServiceUnavailable' || data === '')
                      Toast.error(data.Message);
                  else{
                      setForecast(data);
                  }})
            .catch(err=> Toast.error(err))
    };

    const onGetCurrentWeather = (city)=>{
        getCurrentWeather(city)
            .then(data=>{
                if(data.Code === 'ServiceUnavailable')
                    Toast.error(data.Message);
                else{
                    setCurrentWeather(data)
                }})
            .catch(err=> Toast.error(err))
    };


    return (
        <div >
            <UpperMenu/>
            <div className={styles.searchBar}>
                <SearchBar setCity={setCity}/>
            </div>
            <div className={styles.gridBox}>
                <GridBoxes forecast={forecast} currentWeather={currentWeather} city={city} />
            </div>
         </div>
    )
}
export default HomePage;