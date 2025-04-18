import React from 'react';
import PropTypes from 'prop-types';
import './Loader.css';

export default class Loader extends React.Component {
    constructor(props) {
        super(props);
        this.backForm = 'menu1';
        this.state = { loader: null }; // Инициализируем состояние
        this.getLoaderExit();
        this.runTimer();
    }

    getLoaderExit = (active = true) => {
        if (active) {
            this.setState({
                loader: <div className='loader'></div>
            });
        } else {
            this.setState({
                loader: <div className='loader loader1' onClick={this.changeForm}></div>
            });
        }
    }

    runTimer = () => {
        setTimeout(() => { this.getLoaderExit(false) }, 5000);
    }

    changeForm = () => {
        this.props.changeForm(this.backForm);
    }

    render() {
        return (
            <div className='loader-wrap'>
                {this.state.loader} {/* Используем состояние для отображения загрузчика */}
            </div>
        )
    }
}

Loader.propTypes = {
    changeForm: PropTypes.func,
}
