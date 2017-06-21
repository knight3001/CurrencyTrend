import React from 'react'
import FilterLink from '../containers/FilterLink'
import * as types from '../constants/ActionTypes';

const Footer = () => (
    <p>
        Show:
        {" "}
        <FilterLink filter={types.VisibilityFilters.SHOW_ALL}>
            All
        </FilterLink>
        {", "}
        <FilterLink filter={types.VisibilityFilters.SHOW_ACTIVE}>
            Active
        </FilterLink>
        {", "}
        <FilterLink filter={types.VisibilityFilters.SHOW_COMPLETED}>
            Completed
        </FilterLink>
    </p>
)

export default Footer