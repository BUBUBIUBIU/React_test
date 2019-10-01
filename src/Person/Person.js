import React from 'react';

// 这里用const，我们不希望这个function被更改
const person = (props) => {
    return (
        <div>
            <p>I'm a {props.name} and I am {props.age} years old!</p>
            <p>{props.children}</p>
        </div>    
    ) 
}

export default person;
