import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

// 这个App就是我们的component，
class App extends Component {

  state = {
     persons: [
       { id: 'asfa1', name: 'Max', age: '28'},
       { id: 'vasdf1', name: 'Manu', age: '29'},
       { id: 'asdf11', name: 'Stephanie', age: '26'}
     ],
     otherState: 'some other value',
     showPersons: false
  }

  /**  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS this.state.persons[0].name = 'Maximilian'; (不能直接用=改变state里的东西)
    this.setState({
      persons: [
        {name: newName, age: '28'},
        {name: 'Manu', age: '29'},
        {name: 'Stephanie', age: '27'}
      ]
    })
  } */

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    // We cannot mutate the state, ... do the same thing to object like to array (也可以拆散object)
    // 方法一
    const person = {
      ...this.state.persons[personIndex]
    };

    // 方法二
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person; 

    this.setState({ persons: persons })
  }

  deletePersonHandler = (personIndex) => {
    // 这里再次解释一下更改const的原因，这个persons里其实是指向array的reference，我们本质上没有更改persons
    // 这里我们不提倡用splice，因为它会直接操作state里的property，我们可以使用另外两种方法
    // 在不改变state的情况下完成任务
    // const persons = this.state.persons.slice(); (方法1)
    const persons = [...this.state.persons];  // (方法2，利用ES6新特性) 
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  // 这里提了一下arrow function中this key word的功能的不一样
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {
    const style = {
      backgroundColor: 'green',
      color: 'white',  // 字体颜色还是要白色的哈
      font: 'inherit',
      boder: '1px solid blue',
      padding: '8px',
      // 这个属性让鼠标hover在按钮上时呈手状
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color: 'black'
      }
    }

    let persons = null;

    if (this.state.showPersons) {
      // 神奇的一幕，只要一个括号就能让代码变成JSX
      persons = (
        <div>
          {/* tips， arrow function 有两个arguments时要用小括号括起来 */}
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name}
              age={person.age}
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)} />
          })}
        </div> 
      );

      style.backgroundColor = 'red';
      // 因为key是string，所以我们不用.符号
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'black'
      }
    }

    const classes = [];
    if (this.state.persons.length <= 2){
      classes.push('red');
    }
    if (this.state.persons.length <= 1){
      classes.push('bold');
    }

    return (
       // 这看上去是HTML，其实是JSX
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          {/* onClick里的method千万不要加(),我们要的只是method的reference, 不然的话在react
          render这段jsx代码的时候会直接call这个method */}
          <button 
            style = {style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button> 
            {persons}
        </div>
      </StyleRoot>
    );
    // return React.createElement('div', null, React.createElement('h1', null, 'Does it work now?'));
  }
}

// high order component（神奇的写法）,别担心这里export出来的还是一个component
export default Radium(App) ;
