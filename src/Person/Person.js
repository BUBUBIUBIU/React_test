import React from 'react';
import './Person.css';

// 这里用const，我们不希望这个function被更改
const person = (props) => {
    return (
        <div className='Person'>
            <p onClick={props.click}>I'm a {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
            {/* value attribute 就是field里自动出现的default选项 */}
            <input type='text' onChange={props.changed} value={props.name} />
        </div>    
    ) 
}

export default person;
