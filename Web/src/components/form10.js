import React from 'react';
import Message from './message/Message';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from './loader/Loader';
import Navigation from './Navigation';


export default class Form10 extends React.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio('./error10.mp3');
        this.data = {
            numTSD: 'Zebra-WEB',
            operation: '',
            base: 1,
            form: 10,
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
            nextForm: 10
        };
        this.visibleKeyboard = false;
        this.msg = '';
        this.loader = '';
        this.inputs = [];
        this.focused = '';
        this.state = {
            msg: this.msg,
            loader: this.loader,
            visibleKeyboard: this.visibleKeyboard,
            p1: this.data.p1,
            p2: this.data.p2,
            p3: this.data.p3
        };
        // console.log('Start data form10:', this.data);
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
                this.inputs[2].focus();
            } else if (event.target.id === 'pol3') {
                this.reqData('Update');
            };
            this.visibleKeyboard = false;
            this.setState({ visibleKeyboard: this.visibleKeyboard });
        };
    }

    upDateForm = () => {
        this.setState({
            p1: this.data.p1,
            p2: this.data.p2,
            p3: this.data.p3,
        });
    }

    reqData = (operation = 'Query') => {
        this.visibleLoader(true);
        this.data.operation = operation;
        axios.post(process.env.REACT_APP_API_URL, this.data)
            .then((res) => {
                if (res.data.msg === '') {
                    this.props.changeForm(`menu2`);
                } else {
                    this.visibleMessage(true, `${res.data.msg}`);
                };
            })
            .catch((err) => {
                this.visibleMessage(true, `${JSON.stringify(err)}`);
            })
            .then(() => {
                this.visibleLoader(false);
                this.focused = '';
            });
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

    handleChange = (event) => {
        if (event.target.id === 'pol1') {
            this.data.p1 = event.target.value;
            this.setState({ p1: this.data.p1 });
        } else if (event.target.id === 'pol2') {
            this.data.p2 = event.target.value;
            this.setState({ p2: this.data.p2 });
        } else if (event.target.id === 'pol3') {
            this.data.p3 = event.target.value;
            this.setState({ p3: this.data.p3 });
        };
    }

    handleClickBtn = (event) => {
        this.handelClickInput(event);
        this.reqData('Update');
    }

    handelClickKeyBoard = (event) => {
        if (this.focused === 'pol3') {
            if (event.target.id === 'C') {
                this.data.p3 = '';
            } else {
                this.data.p3 = `00000${event.target.id}`;
            };
        }

        this.setState({
            p3: this.data.p3,
        });
    }

    handelClickInput = (event) => {
        if (event.target.id === 'pol3') {
            this.focused = 'pol3';
            this.visibleKeyboard = true;
        } else {
            this.focused = '';
            this.visibleKeyboard = false;
        }
        this.setState({ visibleKeyboard: this.visibleKeyboard });
    }

    render() {
        return (
            <div className='wrap-comp'>
                <Navigation
                    formTitle='Відкрити лист з-ння'
                    changeForm={this.changeForm} />
                <label
                    className='label'
                    from='pol1'
                >ЛИСТ ЗАВАНТАЖЕННЯ</label>
                <input
                    className='input'
                    type='text'
                    id='pol1'
                    onFocus={this.handleSelect}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    onClick={this.handelClickInput}
                    value={this.data.p1}
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
                    onChange={this.handleChange}
                    onClick={this.handelClickInput}
                    value={this.data.p2}
                    ref={this.addInput(1)}
                ></input>
                <label
                    className='label'
                    from='pol3'
                >БРАМА</label>
                <input
                    className='input'
                    id='pol3'
                    onFocus={this.handleSelect}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    onClick={this.handelClickInput}
                    ref={this.addInput(2)}
                    value={this.data.p3}
                ></input>
                {this.visibleKeyboard ? (
                    <div className='wrap-key-6'>
                        <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='1'>1</button>
                        <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='2'>2</button>
                        <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='3'>3</button>
                        <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='4'>4</button>
                        <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='5'>5</button>
                        <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='5'>6</button>
                    </div>
                )
                    : ''}
                <button type='button' className='btn' onClick={this.handleClickBtn}>Прийняти</button>
                {this.msg}
                {this.loader}
            </div>
        )
    }
}

Form10.propTypes = {
    changeForm: PropTypes.func,
    d: PropTypes.string,
    d1: PropTypes.string,
    b: PropTypes.string,
};