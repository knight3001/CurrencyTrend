import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Picker extends Component {
    render() {
        const { value, onChange, options } = this.props

        return (
            <form className="form-horizontal col-md-2 col-md-offset-5">
                <h1>{value}</h1>
                <select className="form-control" onChange={e => onChange(e.target.value)} value={value}>
                    {options.map(option => (
                        <option value={option} key={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </form>
        )
    }
}

Picker.propTypes = {
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
}