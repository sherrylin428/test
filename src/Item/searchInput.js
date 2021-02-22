import React from "react";
import axios from "axios";
import { store } from "../Redux/store";
import Header from "../Components/TopHeader"; //輸入匡的上方標題
import SearchList from "../autoComponent"; //輸入時會有提示字元
import WeatherListShow from "../Components/WeatherList/WeatherList"; //顯示天氣資訊在畫面上
import "./item.css";

class Searchinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listID: "locationList",
      placeHolder: "請輸入地點(Location)", //輸入匡上的為輸入時的提醒文字
      appID: "bd45fc9db8849cb46d00a451483ccd44", //抓天氣API
      inputValue: "", //數入的內容
    };
    this.eventInput = this.eventInput.bind(this); //輸入內容的事件
    this.eventKeyDown = this.eventKeyDown.bind(this); //輸入完成按下enter的事件
    this.clear = this.clear.bind(this);
  }
  eventInput(event) {
    this.setState({ inputValue: event.target.value }); //用inputValue來取代輸入匡的內容
  }
  async eventKeyDown(event) {
    if (event.keyCode === 13) {
      //如果按下Enter
      //就會開始去抓輸入的城市的Api
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.inputValue}&appid=${this.state.appID}`;
      try {
        const res = await axios.get(url); //用res來代替取到城市的API
        if (res.status === 200) {
          //http回應200代表，api回應成功
          if (localStorage.getItem("city") === null) {
            //如果貨櫃裡面找不到叫city的籃子
            let newCityArray = []; //就建立新的籃子自己取名為newCityArray
            localStorage.setItem("city", JSON.stringify(newCityArray)); //把newCityArray放進貨櫃裡面，告訴貨櫃這叫"city"
          }
          let newCityArray = JSON.parse(localStorage.getItem("city")); //我叫貨櫃把之前放進去的city的籃子拿出來
          newCityArray.push(res.data); //把蘋果轉乘字串放進newCityArray裡面
          localStorage.setItem("city", JSON.stringify(newCityArray));
          store.dispatch({
            //利用store.dispatc用Action傳遞到reducer裡
            type: "HAVE_CITY", //代表有搜尋到城市
            data: JSON.parse(JSON.stringify(res.data)), //這個data就會代表"city"所存取的內容
          });
          localStorage.setItem("city", JSON.stringify(store.getState().Arr));
        }
      } catch (error) {
        //如果抓不到呈現error
        store.dispatch({
          type: "DO_NOT_HAVE_CITY", //代表沒有找到該輸入的城市
          data: this.state.inputValue, //這個data只會把輸入的列印出來
        });
      }
      this.setState({ inputValue: "" }); //代表把輸入匡清空
    }
  }

  clear() {
    store.dispatch({
      type: "LISTITEM_DELETE",
    });
    localStorage.clear();
    this.setState({ inputValue: "" });
  }
  componentDidMount() {
    //重新載入的時候
    const redata = JSON.parse(localStorage.getItem("city")); //用redata來取代輸入程式的data
    if (redata === null) return;
    for (let i = redata.length - 1; i >= 0; i--) {
      console.log(redata[i], typeof redata[i]);
      this.setState({
        ShowText: store.dispatch({ type: "HAVE_CITY", data: redata[i] }), //重新載入的時候，直接顯示該城市資哩奧
      });
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
          />
        </div>
        {(JSON.parse(localStorage.getItem("city")) != null) && (
          <div className="search-input">
            <button onClick={this.clear}>X</button>
          </div>
        )}
        <SearchList id={this.state.listID} value={this.state.inputValue} />
        <WeatherListShow show={store.getState()} />
      </div>
    );
  }
}
export default Searchinput;
