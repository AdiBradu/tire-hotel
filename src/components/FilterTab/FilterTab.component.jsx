import React from 'react'
import './FilterTab.component.scss'
import Filter from '../../components/Filter/Filter.component'

export default function FilterTab(props) {
  const activeClass = props.showFilters ? "active" : ""
  return (
    <div className={`filter-tab ${activeClass}`}>
      {
        props.filtersList.map((el, index) => {
          return <Filter key={index} onFilterChange={el.onFilterChange} name={el.name} filterInfo={el.filterInfo} currentFilter={el.currentFilter} />
        })
      }
    </div>
  )
}
