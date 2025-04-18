import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation'

export default class Menu2 extends React.Component {

    changeFormNext = (event) => {
        this.props.changeForm(event.target.id);
    }

    changeForm = (form) => {
        this.props.changeForm(form);
    }

    render() {
        return (
            <div className='wrap-comp'>
                <Navigation
                    formTitle='КПП'
                    changeForm={this.changeForm} />
                <button className="btn" type="button" id="form10" onClick={this.changeFormNext} >Відкрити лист завантаження</button>
                <button className="btn" type="button" id="form13" onClick={this.changeFormNext}>Закрити лист завантаження</button>
                <button className="btn" type="button" id="form8" onClick={this.changeFormNext}>Перевірка відвантаження</button>
            </div>
        );
    }
}

Menu2.propTypes = {
    changeForm: PropTypes.func,
};

