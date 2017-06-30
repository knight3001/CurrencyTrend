import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Posts extends Component {
    render() {
        return (
            <ul className="list-group">
                {this.props.posts.map((post, i) => <li className="list-group-item" key={i}>{post.title}</li>)}
            </ul>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array.isRequired
}