import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';
import PropTypes from 'prop-types';

class Person extends Component{
    constructor(props){
        super(props);
        this.inputElementRef = React.createRef();
    }

    componentDidMount(){
        /**
         * It is a general web or browser feature, a general DOM selector and 
         * it always works on the entire DOM, it doesn't care whether we use React or not
         */
        // document.querySelector('input').focus();
        // this.inputElement.focus();
        this.inputElementRef.current.focus();
    }
    render(){
        console.log('[Person.js] rendering...');
        console.log('this props in Person:', this.props);
        return (
            <Aux>
                <p onClick={this.props.click}>
                    I'm a {this.props.name} and I am {this.props.age} years old!
                </p>
                <p >{this.props.children}</p>
                {/* value attribute 就是field里自动出现的default选项 */}
                <input 
                    type='text' 
                    // ref={(inputEl) => {this.inputElement = inputEl}}
                    ref={this.inputElementRef}
                    onChange={this.props.changed} 
                    value={this.props.name} 
                />
            </Aux>
        );
    }
}

// 这里的propTypes的p应该是小写，因为他是Person的一个property
Person.propTypes = {
    // 这句话指明了click必须是指向一个function的pointer
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
}

export default withClass(Person, classes.Person);
