import React, { Component } from 'react';
import AllTodosDirectory from './AllTodosDirectory';
import Todo from '../Todo/Todo';
import CreateTodo from '../CreateTodo/CreateTodo';

class App extends Component {

  directory = AllTodosDirectory.observe()
  state = {
    directory: null
  }
  constructor(){
    super();
    this.directory.observable.subscribe(_ => {
      this.setState({
        directory: this.directory.asObject(1)
      })
    })
    this.state.directory = this.directory.asObject(1);
  }
  

  render() {
    const struct = this.state.directory;
    return (
      <div className="">
        {
          struct.todos.map(todo => {
            return <Todo key={todo.id} todo={todo} />
          })
        }
      </div>
    );
  }
}

export default App;
