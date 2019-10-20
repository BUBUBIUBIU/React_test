import React, { Component } from 'react';
import Aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import classes from './Person.css';

class Person extends Component{

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
                    onChange={this.props.changed} 
                    value={this.props.name} 
                />
            </Aux>
        );
    }
}

export default withClass(Person, classes.Person);
