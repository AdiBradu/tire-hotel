import React from 'react'
import './SearchBar.component.scss'
import { ReactComponent as SearchLogo } from '../../assets/search.svg';

export default function SearchBar(props) {
    return (
        <div className="search-bar">
            <input type="search" onChange={props.onSearchBarChange} value={props.searchBarVal} placeholder="cauta"/>
            <SearchLogo/>
        </div>
    )
}
