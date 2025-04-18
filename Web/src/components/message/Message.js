import React from 'react';
import './Message.css';
import PropTypes from 'prop-types';
export default class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    handleClick = () => {
        this.props.handleClick(false);
    }

    render() {
        return (
            <div className='wrap-msg'>
                <p className='msg'>{this.props.msg}</p>
                <button className='btn' type='button' onClick={this.handleClick}>Ok</button>
            </div>
        )
    }
}

Message.propTypes = {
    msg: PropTypes.string,
    handleClick: PropTypes.func,
};