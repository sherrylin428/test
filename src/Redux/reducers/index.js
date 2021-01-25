import React from 'react'

export default function reducer(state = { Arr: [], Msg: "" }, action) {
    switch (action.type) {
        case "DO_NOT_HAVE_CITY":
            state.Msg = <font>您輸入的地點 '{action.data}' 不存在</font>;
            break;
        case "HAVE_CITY":
            state.Msg = "";
            state.Arr.forEach((item, index) => {
                if (item.id === action.data.id) {
                    state.Arr.splice(index, 1);
                }
            });
            state.Arr.unshift(action.data)
            break;
        default:
            break;
    }
    return state;
}