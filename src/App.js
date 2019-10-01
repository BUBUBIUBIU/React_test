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

  switchNameHandlee = () => {
    // console.log('Was clicked!');
    // DON'T DO THIS this.state.persons[0].name = 'Maximilian'; (不能直接用=改变state里的东西)
    this.setState({
      persons: [
        {name: 'Maximilian', age: '28'},
        {name: 'Manu', age: '29'},
        {name: 'Stephanie', age: '27'}
      ]
    })
  }

  render() {
    return (
      // 这看上去是HTML，其实是JSX
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        {/* onClick里的method千万不要加(),我们要的只是method的reference, 不然的话在react
        render这段jsx代码的时候会直接call这个method */}
        <button onClick={this.switchNameHandlee}>Switch Name</button> 
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age} >My Hobbies: Racing</Person> 
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
      </div>
    );
    // return React.createElement('div', null, React.createElement('h1', null, 'Does it work now?'));
  }
}

export default App;
