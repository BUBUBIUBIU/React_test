import React from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {
    const assignedClasses = [];
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }

    if (props.persons.length <= 2){
      assignedClasses.push(classes.red);
    }
    if (props.persons.length <= 1){
      assignedClasses.push(classes.bold);
    }
    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working!</p>
            {/* onClick里的method千万不要加(),我们要的只是method的reference, 不然的话在react
            render这段jsx代码的时候会直接call这个method */}
            <button 
                className={btnClass}
                onClick={props.clicked}>Toggle Persons</button> 
        </div>
    );
}

export default cockpit;