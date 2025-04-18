import React from 'react';
import Message from './message/Message';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from './loader/Loader';
import Navigation from './Navigation';


export default class Form8 extends React.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio('./error10.mp3');
        this.data = {
            numTSD: 'Zebra-WEB',
            operation: '',
            base: 1,
            form: 8,
            p1: '',
            p2: '',
            p3: '',
            p4: '',
            p5: '',
            p6: '',
            p7: '',
            p8: '',
            d: this.props.d,
            d1: this.props.d1,
            b: this.props.b,
            nextForm: 8
        };
        this.msg = '';
        this.loader = '';
        this.inputs = [];
        this.state = {
            msg: this.msg,
            loader: this.loader,
        };
    }

    changeForm = (form) => {
        this.props.changeForm(form);
    }

    addInput(index) {
        return input => {
            this.inputs[index] = input;
        };
    }
    handleSelect = (event) => {
        event.target.select();
    };

    handleKeyUp = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (event.target.id === 'pol1') {
                this.inputs[1].focus();
            } else if (event.target.id === 'pol2') {
                this.reqData('Update');
            };
        };
    }

    reqData = (operation = 'Query') => {
        this.visibleLoader(true);
        this.data.operation = operation;
        axios.post(process.env.REACT_APP_API_URL, this.data)
            .then((res) => {
                console.log(res.data)
                if (res.data.msg === '') {
                    if (res.data.nextForm !== this.data.nextForm && res.data.nextForm !== '') {
                        this.props.changeForm(`form${res.data.nextForm}`, this.data.p1, this.data.d1, this.data.p2);
                    } else {
                        this.props.changeForm('form8', this.data.p1, '', this.data.p2);
                    };
                } else if (res.data.nextForm !== this.data.nextForm && res.data.nextForm !== '') {
                    this.visibleMessage(true, `${res.data.msg}`);
                    this.props.changeForm(`form${res.data.nextForm}`, this.data.p1, this.data.d1, this.data.p1);
                } else {
                    this.visibleMessage(true, `${res.data.msg}`);
                };
            })
            .catch((err) => {
                this.visibleMessage(true, `${JSON.stringify(err)}`);
            })
            .then(() => { this.visibleLoader(false); });
    }

    visibleMessage = (isVisible, msg = '') => {
        if (isVisible) {
            this.audio.play();
            this.msg = <Message msg={msg} handleClick={this.visibleMessage}></Message>
        } else {
            this.msg = '';
        }
        this.setState({
            msg: this.msg,
        });
        this.inputs[0].focus();
    }

    visibleLoader = (isVisible) => {
        this.loader = isVisible ? <Loader changeForm={this.changeForm} /> : '';
        this.setState({
            loader: this.loader,
        });
    }

    handleChangePol1 = (event) => {
        this.data.p1 = event.target.value;
    }

    handleChangePol2 = (event) => {
        this.data.p2 = event.target.value;
    }

    handleClickBtn = () => {
        this.reqData('Update');
    }

    render() {
        return (
            <div className='wrap-comp'>
                <Navigation
                    formTitle='Перевірка в-ння'
                    changeForm={this.changeForm} />
                <label
                    className='label'
                    from='pol1'
                >РЕАЛІЗАЦІЯ</label>
                <input
                    className='input'
                    type='text'
                    id='pol1'
                    onFocus={this.handleSelect}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChangePol1}
                    ref={this.addInput(0)}
                    autoFocus={true}
                ></input>
                <label
                    className='label'
                    from='pol2'
                >КОНТРОЛЕР</label>
                <input
                    className='input'
                    type='text'
                    id='pol2'
                    onFocus={this.handleSelect}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChangePol2}
                    ref={this.addInput(1)}
                ></input>
                <button type='button' className='btn' onClick={this.handleClickBtn}>Прийняти</button>
                {this.msg}
                {this.loader}
            </div>
        )
    }
}

Form8.propTypes = {
    changeForm: PropTypes.func,
    d: PropTypes.string,
    d1: PropTypes.string,
    b: PropTypes.string,
};