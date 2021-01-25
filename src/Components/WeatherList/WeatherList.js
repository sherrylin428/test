import React from 'react'
import './Weather.css'

export default function WeatherListShow(props){
    let ShowText=props.show.Arr.map((item)=>
        <div className="Container" id={item.id}>
            <div className="WeatherCard">
                <div className="Location">city：{item.name}</div>
                <div className="Description">status：{item.weather[0].description}</div>
                <div className="CurrentWeather">
                    <div className="Temperature">
                        temp：{(item.main.temp - 273.15).toFixed(1) + '\xB0C'}
                    </div>
                    <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`}/>
                </div>
            </div>
        </div>
    )
    if(props.show.Msg!==""){
        ShowText.splice(0,0,props.show.Msg);
    }
    return ShowText;
}