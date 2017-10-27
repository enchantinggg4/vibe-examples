import React, { Component } from 'react';
import style from  './Style.js';
import AppDirectory from './AppDirectory';
import Todo from '../Todo/Todo';
import CreateTodo from '../CreateTodo/CreateTodo';
import AllTodos from '../AllTodos/AllTodos';

class App extends Component {

  directory = AppDirectory.observe()

  state = {
    directory: null
  }

  rendersCount = 0

  constructor(){
    super();
    this.directory.observable.subscribe(_ => {
      this.setState({
        directory: this.directory.asObject(1)
      })
    })
    this.state.directory = this.directory.asObject(1);
  }

  componentDidMount(){
    this.directory.interface.createTodo("Default one");
  }

  render() {
    const struct = this.state.directory;
    console.log(struct);
    return (
      <div style={{
          display: 'flex',
          flexDirection: 'column'
      }}>
        <div>Done: {struct.doneTodos.length} / {struct.todos.length} </div>
        {
          struct.todos.map(todo => {
            return <Todo removable={true} key={todo.id} todo={todo} />
          })
        }

        <CreateTodo />


        <hr/>
        <h2>All todos pool</h2>
        <AllTodos />
      </div>
    );
  }
}

export default App;
