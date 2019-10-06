import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

// 这个App就是我们的component，
class App extends Component {

  state = {
     persons: [
       {name: 'Max', age: '28'},
       {name: 'Manu', age: '29'},
       {name: 'Stephanie', age: '26'}
     ],
     otherState: 'some other value'
  }

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS this.state.persons[0].name = 'Maximilian'; (不能直接用=改变state里的东西)
    this.setState({
      persons: [
        {name: newName, age: '28'},
        {name: 'Manu', age: '29'},
        {name: 'Stephanie', age: '27'}
      ]
    })
  }

  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    })
  }

  render() {
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      boder: '1px solid blue',
      padding: '8px',
      // 这个属性让鼠标hover在按钮上时呈手状
      cursor: 'pointer'
    }

    return (
      // 这看上去是HTML，其实是JSX
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        {/* onClick里的method千万不要加(),我们要的只是method的reference, 不然的话在react
        render这段jsx代码的时候会直接call这个method */}
        <button 
          style = {style}
          onClick={() => this.switchNameHandler('Maximilian')}>Switch Name</button> 
        <Person 
        name={this.state.persons[0].name} 
        age={this.state.persons[0].age} />
        <Person 
        name={this.state.persons[1].name} 
        age={this.state.persons[1].age} 
        click={this.switchNameHandler.bind(this, 'Max!')}
        changed={this.nameChangedHandler}>My Hobbies: Racing</Person> 
        <Person 
        name={this.state.persons[2].name} 
        age={this.state.persons[2].age}/>
      </div>
    );
    // return React.createElement('div', null, React.createElement('h1', null, 'Does it work now?'));
  }
}

export default App;
