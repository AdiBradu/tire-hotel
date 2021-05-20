import React from 'react'
import './FilterOrders.component.scss'
import FilterRadio from '../../components/FilterRadio/FilterRadio.component'

export default function FilterOrders(props) {
  const activeClass = props.showFilters ? "active" : ""
  return (
    <div className={`filter-tab ${activeClass}`}>
      {
        props.filtersList.map((el, index) => {
          return <FilterRadio key={index} onFilterChange={el.onFilterChange} name={el.name} currentFilter={el.currentFilter} />
        })
      }
    </div>
  )
}