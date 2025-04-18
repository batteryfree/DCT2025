import React from 'react';
import PropTypes from 'prop-types';

export default class Menu extends React.Component {

    changeForm = (event) => {
        this.props.changeForm(event.target.id);
    }

    render() {
        return (
            <div className="wrap-comp">
                <button className="btn" type="button" id="form12" onClick={this.changeForm}>Витрата</button>
                <button className="btn" type="button" id="form7" onClick={this.changeForm}>Прихід/Інветарізація</button>
                <button className="btn" type="button" id="menu2" onClick={this.changeForm}>КПП</button>
                <button className="btn" type="button" id="form5" onClick={this.changeForm}>Відділ якості</button>
            </div>
        );
    }
}

Menu.propTypes = {
    changeForm: PropTypes.func,
};

