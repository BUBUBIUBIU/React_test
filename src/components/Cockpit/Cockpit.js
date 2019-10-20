import React, { useEffect } from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {
    useEffect(() => {
      console.log('[Cockpit.js] useEffect');
      // Http request...
      const timer = setTimeout(() => {
        alert('Saved data to could!');
      }, 1000);
      // 这个return会在每一个（这里只有一个）render cycle之后运行
      return () => {
        clearTimeout(timer);
        console.log('[Cockpit.js] cleanup work in useEffect');
      };
    }, []);
    // 下面这个useEffect会在每个cycle都run
    useEffect(() => {
      console.log('[Cockpit.js] 2nd useEffect');
      return () => {
        console.log('[Cockpit.js] cleanup work in 2nd useEffect');
      };
    })

    const assignedClasses = [];
    let btnClass = '';
    if(props.showPersons){
        btnClass = classes.Red;
    }

    if (props.personsLength <= 2){
      assignedClasses.push(classes.red);
    }
    if (props.personsLength <= 1){
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

export default React.memo(cockpit);