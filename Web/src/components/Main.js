import React from 'react';
import Form2 from './form2';
import Form4 from './form4';
import Form5 from './form5';
import Form6 from './form6';
import Form7 from './form7';
import Form8 from './form8';
import Form9 from './form9';
import Form10 from './form10';
import Form11 from './form11';
import Form12 from './form12';
import Form13 from './form13';
import Menu from './Menu';
import Menu2 from './Menu2';
//import Loader from '../components/loader/Loader';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.form = null;
        this.getForm('menu1');
        this.state = { form: this.form };
    }
    //D410140795110724
    changeForm = (form, d = '', d1 = '', b = '', p8 = '') => {
        this.form = '';
        this.setState({
            form: this.form,
        });
        this.getForm(form, d, d1, b, p8);
        this.setState({
            form: this.form,
        });
    }

    getForm = (form, d = '', d1 = '', b = '', p8 = '') => {
        if (form === 'menu1') {
            this.form = <Menu changeForm={this.changeForm} />;
        } else if (form === 'menu2') {
            this.form = <Menu2 changeForm={this.changeForm} />;
        } else if (form === 'form12') {
            this.form = <Form12 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form2') {
            this.form = <Form2 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form7') {
            this.form = <Form7 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form4') {
            this.form = <Form4 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form5') {
            this.form = <Form5 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form8') {
            this.form = <Form8 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form10') {
            this.form = <Form10 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form13') {
            this.form = <Form13 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form11') {
            this.form = <Form11 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form9') {
            this.form = <Form9 changeForm={this.changeForm} d={d} d1={d1} b={b} />;
        } else if (form === 'form6') {
            this.form = <Form6 changeForm={this.changeForm} d={d} d1={d1} b={b} p8={p8} />;
        };
    }
    render() {
        return (
            <div>
                {this.form}

            </div>
        )
    }
}
