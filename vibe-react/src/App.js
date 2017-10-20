import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Store from './store/Store';
import Todo from './store/models/Todo';
import Vibe from 'vibejs'

const types = Vibe.types;

const struct = new Vibe.Struct(
  {
    structure: {
      todos: types.Array(types.Reference(Todo.name)),
      undoneFirst: types.Boolean
    },
    computed: {
      doneTodos() {
        return this.todos.filter(it => it.done);
      },
      undoneTodos() {
        return this.todos.filter(it => !it.done);
      }
    }
  },
  Store
).observe();

const vibeReact = (component, structure) => {
  return class extends Component{ 
    
    structure = structure

    constructor(){
      super();
      this.state = {
        structure: this.structure.$json()
      }
      this.structure.$observable.subscribe(_ => {
        this.setState({
          structure: this.structure.$json()
        })
      })
    }

    render(){
      return React.createElement(component, {
          structure: this.state.structure
      })
    }
  }
}


class App extends Component {

  state = {
    todoTitle: "",
    todoDescription: ""
  }

  addNewTodo(){
    const entity = {
      id: new Date().getTime(),
      title: this.state.todoTitle,
      description: this.state.todoDescription,
      done: false
    };
    console.log(entity);
    Todo.insertEntity(entity);
    struct.todos = struct.todos.concat([entity.id]);
    
  }

  render() {
    return (
      <div className="App">
        <h1>Welcome to the vibe + react example!</h1>
        <table style={{width: '100%'}}>
          <tr style={{border: '1px solid black', borderCollapse: 'collapse' }}>
            <th style={{border: '1px solid black', borderCollapse: 'collapse' }} >Title</th>
            <th style={{border: '1px solid black', borderCollapse: 'collapse' }}>Description</th> 
            <th style={{border: '1px solid black', borderCollapse: 'collapse' }}>Done</th>
          </tr>
          {
            struct.todos.map(todo => {
              return (
                <tr style={{border: '1px solid black', borderCollapse: 'collapse' }} >
                  <th style={{border: '1px solid black', borderCollapse: 'collapse' }}>{ todo.title + ' ' + todo.done }</th>
                  <th style={{border: '1px solid black', borderCollapse: 'collapse' }}>{todo.description}</th> 
                  <th style={{border: '1px solid black', borderCollapse: 'collapse' }}>
                    <input type="checkbox" onChange={ e => todo.done = e.target.value} />
                  </th>
                </tr>
              )
            })
          }
        </table>

        <form onSubmit={this.addNewTodo.bind(this)} style={{ padding: '10px',  display: 'flex', flexDirection: 'column'}} action="#">
          <input type="text" placeholder="New todo's name" onChange={text => this.setState({todoTitle: text.target.value})} />
          <textarea name="" id="" cols="10" rows="10" placeholder="Description" onChange={text => this.setState({todoDescription: text.target.value})}></textarea>
          <input type="submit" value="Add todo" />
        </form>
      </div>
    );
  }
}

export default vibeReact(App, struct);
