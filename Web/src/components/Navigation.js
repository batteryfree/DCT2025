import React from 'react';
import PropTypes from 'prop-types';
export default class Navigation extends React.Component {

    hanelClickBack = () => {
        this.props.changeForm(this.props.backForm);
    }

    hanelClickHome = () => {
        this.props.changeForm('menu1');
    }

    render() {
        return (
            <div className={this.props.backIsVisible ? 'wrap-nav' : 'wrap-nav-invisbtn'
            }>
                <svg
                    className='icon'
                    onClick={this.hanelClickHome}>
                    <use xlinkHref='icons.svg#icon-home2' />
                </svg>
                <p className={this.props.backIsVisible ? 'form-tittle' : 'form-tittle-invisbtn'}>
                    {this.props.formTitle}</p>
                {this.props.backIsVisible ? <svg className='icon' onClick={this.hanelClickBack}><use xlinkHref="icons.svg#icon-arrow-left" /></svg> : ''}

            </div >

        )
    }
}


Navigation.propTypes = {
    changeForm: PropTypes.func,
    formTitle: PropTypes.string,
    backIsVisible: PropTypes.bool,
    backForm: PropTypes.string
};