import React from 'react'
import axios from 'axios'
import { store } from '../Redux/store'
import Header from '../Components/TopHeader'
import SearchList from '../autoComponent'
import WeatherListShow from '../Components/WeatherList/WeatherList'
import './item.css';

class Searchinput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listID: "locationList",
            placeHolder: "請輸入地點(Location)",
            appID: "bd45fc9db8849cb46d00a451483ccd44",
            inputValue: ""
        }
        this.eventInput = this.eventInput.bind(this);
        this.eventKeyDown = this.eventKeyDown.bind(this);
    }
    eventInput(event) {
        this.setState(
            { inputValue: event.target.value }
        )
    }
    async eventKeyDown(event) {
        if (event.keyCode === 13) {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=${this.state.appID}`
            try {
                const res =await axios.get(url)
                if (res.status === 200) store.dispatch({ type: 'HAVE_CITY', data: res.data })
            } catch (error) {
                store.dispatch({ type: 'DO_NOT_HAVE_CITY', data: this.state.inputValue })
            }
            this.setState(
                { inputValue: "" }
            )
        }
    }
    render() {
        return (
            <div className="item">
                <Header />
                <div className="search-input">
                <input 
                    list={this.state.listID}
                    placeholder={this.state.placeHolder}
                    onInput={this.eventInput}
                    onKeyDown={this.eventKeyDown}
                    value={this.state.inputValue}
                /></div>
                <SearchList id={this.state.listID} value={this.state.inputValue} />
                <WeatherListShow show={store.getState()}/>
            </div>);
    }
}
export default Searchinput