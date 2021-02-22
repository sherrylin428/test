import React from "react";

export default function reducer(state = { Arr: [], Msg: "" }, action) {//action傳遞的資料，去判斷type&data的內容
  //Arr:[]是一個裝著所有物件的陣列，Msg:""代表aciton傳遞過來的type的錯誤訊息再去判斷
  switch (action.type) {
    case "DO_NOT_HAVE_CITY":
      state.Msg = <font>您輸入的地點 '{action.data}' 不存在</font>;
      break;
    case "HAVE_CITY":
      state.Msg = ""; //會把訊息清空
      //如果輸入重複的話會刪掉原本舊的資訊
      state.Arr.forEach((item, index) => {
        if (item.id === action.data.id) {
          state.Arr.splice(index, 1);
        }
      });
      state.Arr.unshift(action.data);//刪除陣列的舊城市
      break;
      case "LISTITEM_DELETE":
        state.Arr = [];
      break;
    default:
      break;
  }
  return state;
}