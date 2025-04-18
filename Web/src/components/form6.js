import React from 'react';
import Message from './message/Message';
import PropTypes from 'prop-types';
import axios from 'axios';
import Loader from './loader/Loader';
import Navigation from './Navigation';


export default class Form6 extends React.Component {
    constructor(props) {
        super(props);
        this.audio = new Audio('./error10.mp3');
        this.data = {
            numTSD: 'Zebra-WEB',
            operation: '',
            base: 1,
            form: 6,
            p1: '',
            p2: '',
            p3: '',
            p4: '',
            p5: '',
            p6: '',
            p7: '',
            p8: this.props.p8,
            d: this.props.d,
            d1: this.props.d1,
            b: this.props.b,
            nextForm: 6
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
                this.reqData('Update');
            };
        };
    }

    reqData = (operation = 'Query') => {
        this.visibleLoader(true);
        this.data.operation = operation;
        axios.post(process.env.REACT_APP_API_URL, this.data)
            .then((res) => {
                if (res.data.msg === '') {
                    if (res.data.nextForm !== this.data.nextForm && res.data.nextForm !== '') {
                        this.props.changeForm(`form${res.data.nextForm}`, this.data.d, '', this.data.b);
                    } else {
                        this.props.changeForm('form6', this.data.d, '', this.data.b);
                    };
                } else if (res.data.nextForm !== this.data.nextForm && res.data.nextForm !== '') {
                    this.visibleMessage(true, `${res.data.msg}`);
                    this.props.changeForm(`form${res.data.nextForm}`, this.data.d, '', this.data.b);
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

    handleClickBtn = () => {
        this.reqData('Update');
    }

    render() {
        return (
            <div className='wrap-comp'>
                <Navigation
                    formTitle='Витрати'
                    changeForm={this.changeForm} />
                <label
                    className='label'
                    from='pol1'
                >ШК контейнера</label>
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
                <button type='button' className='btn' onClick={this.handleClickBtn}>Прийняти</button>
                {this.msg}
                {this.loader}
            </div>
        )
    }
}

Form6.propTypes = {
    changeForm: PropTypes.func,
    d: PropTypes.string,
    d1: PropTypes.string,
    b: PropTypes.string,
    p8: PropTypes.string,
};