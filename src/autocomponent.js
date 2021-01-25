import React from 'react'
import cityList from './cities'

export default function SearchList(props) {
    let inputValue = props.value.toLowerCase();
    let listItems = inputValue.length === 0 ? [] : cityList.filter(element => element.name.toLowerCase().slice(0, inputValue.length) === inputValue).slice(0, 30)
    let listView = listItems.map((listItem,index) =>
        <option key={index}>{listItem.name}</option>
    );
    return (
        <datalist id={props.id}>{listView}</datalist>
    );
}