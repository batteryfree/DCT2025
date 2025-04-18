import React from 'react';
import Message from './message/Message';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from './loader/Loader';
import Navigation from './Navigation';

export default class Form4 extends React.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio('./error10.mp3');
        this.data = {
            numTSD: 'Zebra-WEB',
            operation: '',
            base: 1,
            form: 4,
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
            nextForm: 4
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
            p3: this.data.p3,
            p4: this.data.p4,
            p5: this.data.p5,
            p6: this.data.p6
        };
        // console.log('Start data form4:', this.data);

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
                this.reqData();
            } else if (event.target.id === 'pol4') {
                this.inputs[2].focus();
            } else if (event.target.id === 'pol5') {
                this.inputs[3].focus();
            } else if (event.target.id === 'pol6') {
                this.reqData('Update');
            };
            this.visibleKeyboard = false;
            this.setState({ visibleKeyboard: this.visibleKeyboard });
        };
    }

    upDateForm = () => {
        this.setState({
            p1: this.data.p1,
            p1: this.data.p1,
            p2: this.data.p2,
            p3: this.data.p3,
            p4: this.data.p4,
            p5: this.data.p5,
            p6: this.data.p6,
        });
    }

    reqData = (operation = 'Query') => {
        this.visibleLoader(true);
        this.data.operation = operation;
        axios.post(process.env.REACT_APP_API_URL, this.data)
            .then((res) => {
                if (res.data.msg === '') {
                    if (res.data.nextForm !== this.data.nextForm && res.data.nextForm !== '') {
                        this.props.changeForm(`form${res.data.nextForm}`, this.data.d, this.data.p1, this.data.b);
                    } else {
                        for (let key in res.data) {
                            if (key !== 'msg') {
                                this.data[key] = res.data[key];
                            };
                        };
                        this.upDateForm();
                        if (operation === 'Query') {
                            this.focused = 'pol4'
                            this.inputs[1].focus();
                        } else {
                            this.inputs[0].focus();
                        }
                    };
                } else if (res.data.nextForm !== this.data.nextForm && res.data.nextForm !== '') {
                    this.visibleMessage(true, `${res.data.msg}`);
                    this.props.changeForm(`form${res.data.nextForm}`, this.data.d, this.data.p1, this.data.b);
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
        } else if (event.target.id === 'pol4') {
            this.data.p4 = event.target.value;
            this.setState({ p4: this.data.p4 });
        } else if (event.target.id === 'pol5') {
            this.data.p5 = event.target.value;
            this.setState({ p5: this.data.p5 });
        } else if (event.target.id === 'pol6') {
            this.data.p6 = event.target.value;
            this.setState({ p6: this.data.p6 });
        };
    }

    handleClickBtn = (event) => {
        this.handelClickInput(event);
        this.reqData('Update');
    }

    handelClickKeyBoard = (event) => {
        if (this.focused === 'pol4') {
            if (event.target.id === 'C') {
                this.data.p4 = '';
            } else {
                if (event.target.id === 'dot') {
                    this.data.p4 = this.data.p4 + '.';
                } else {
                    this.data.p4 = this.data.p4 + event.target.id;
                }
            };
        } else if (this.focused === 'pol5') {
            if (event.target.id === 'C') {
                this.data.p5 = '';
            } else {
                if (event.target.id === 'dot') {
                    this.data.p5 = this.data.p5 + '.';
                } else {
                    this.data.p5 = this.data.p5 + event.target.id;
                }
            };
        }
        this.setState({
            p4: this.data.p4,
            p5: this.data.p5
        });
    }

    handelClickInput = (event) => {
        if (event.target.id === 'pol4') {
            this.focused = 'pol4';
            this.visibleKeyboard = true;
        } else if (event.target.id === 'pol5') {
            this.focused = 'pol5';
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
                    formTitle='Прихід/Інветарізація'
                    changeForm={this.changeForm} />
                <label
                    className='label'
                    from='pol1'
                >ШК етикетки</label>
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
                <span className='span'>Найменування</span>
                <p className='txt'>{this.data.p2}</p>
                <span className='span'>Усього палет за документом</span>
                <p className='txt'>{this.data.p3}</p>
                <label
                    className='label'
                    from='pol4'
                >Кількість</label>
                <input
                    className='input'
                    type='text'
                    id='pol4'
                    onFocus={this.handleSelect}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    onClick={this.handelClickInput}
                    value={this.data.p4}
                    ref={this.addInput(1)}
                ></input>
                <label
                    className='label'
                    from='pol5'
                >Місце</label>
                <input
                    className='input'
                    id='pol5'
                    onFocus={this.handleSelect}
                    onKeyUp={this.handleKeyUp}
                    onChange={this.handleChange}
                    onClick={this.handelClickInput}
                    ref={this.addInput(2)}
                    value={this.data.p5}
                ></input>
                <label
                    className='label'
                    from='pol6'
                >Термін придатності</label>
                <input
                    className='input'
                    id='pol6'
                    value={this.data.p6}
                    onFocus={this.handleSelect}
                    onClick={this.handelClickInput}
                    onChange={this.handleChange}
                    onKeyUp={this.handleKeyUp}
                    ref={this.addInput(3)}

                ></input>
                <button type='button' className='btn' onClick={this.handleClickBtn}>Прийняти</button>
                {this.visibleKeyboard ? (
                    <div className='wrap-key'>
                        <div className='wrap-group-btn'>
                            <div className='wrap-btn-keyboard'>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='1'>1</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='2'>2</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='3'>3</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='4'>4</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='5'>5</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='C'>C</button>
                            </div>
                            <div className='wrap-btn-keyboard'>
                                <button className='btn-keyboard ' type='button' onClick={this.handelClickKeyBoard} id='6'>6</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='7'>7</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='8'>8</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='9'>9</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='0'>0</button>
                                <button className='btn-keyboard' type='button' onClick={this.handelClickKeyBoard} id='dot'>.</button>
                            </div>
                        </div>
                        {/* <button className='btn-keyboard btn-keyboard--c' type='button' onClick={this.handelClickKeyBoard} id='C'>C</button> */}
                    </div>
                )
                    : ''}
                {this.msg}
                {this.loader}
            </div>
        )
    }

}

Form4.propTypes = {
    changeForm: PropTypes.func,
    d: PropTypes.string,
    d1: PropTypes.string,
    b: PropTypes.string,
};