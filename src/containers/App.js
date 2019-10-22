import React, { Component } from 'react';
import classes from'./App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
// withClass不再是component了，所以名称首字母要改小写
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';

// 这个App就是我们的component，
class App extends Component {
  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  // 这种我们最早用的写法，是比较高级的用法，其实react已经帮我们建好constructor了和call super（props)了
  state = {
     persons: [
       { id: 'asfa1', name: 'Max', age: 28},
       { id: 'vasdf1', name: 'Manu', age: 29},
       { id: 'asdf11', name: 'Stephanie', age: 26}
     ],
     otherState: 'some other value',
     showPersons: false,
     showCockpit: true,
     changeCounter: 0
  }

  // 这个method前面要放static
  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
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

  // componentWillMount(){
  //   console.log('[App.js] componentWillMount');
  // }

  componentDidMount() {
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate() {
    console.log('[App.js] shouldComponentUpdate');
    // 必须要return东西
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

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

    this.setState((prevState, props) => {
      return {
        persons: persons,
        changeCounter: this.state.changeCounter + 1
      }; 
    });
  };

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
    console.log('[App.js] render');
    let persons = null;

    if (this.state.showPersons) {
      // 神奇的一幕，只要一个括号就能让代码变成JSX;有时候甚至不用括号
      persons = <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />;
    }

    return (
       // 这看上去是HTML，其实是JSX
        <Aux>
          <button 
            onClick={() => { this.setState( {showCockpit : false} )}}
            >
              Remove Cockpit
          </button>
          {this.state.showCockpit ? (
            <Cockpit 
              title={this.props.appTitle}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
              clicked={this.togglePersonsHandler}
            />
            ) : null}
          {persons}
        </Aux>
    );
    // return React.createElement('div', null, React.createElement('h1', null, 'Does it work now?'));
  }
}

// high order component（神奇的写法）,别担心这里export出来的还是一个component
export default withClass(App, classes.App);
