import React from 'react'
import './SectionTitle.component.scss'
import SearchBar from '../../components/SearchBar/SearchBar.component'

export default function SectionTitle(props) {
    return (
        <div className="section-title">
            <h1>{props.text}</h1>
            {props.showSearchBar && <SearchBar searchBarVal={props.searchBarVal} onSearchBarChange={props.onSearchBarChange} />}
        </div>
    )
}
