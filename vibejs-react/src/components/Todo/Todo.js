import React, { Component, PureComponent } from 'react';
import style from './Style.js';
import TodoModel from '../../store/model/Todo';
import AppDirectory from '../App/AppDirectory';
import FontAwesome from 'react-fontawesome'
class Todo extends PureComponent {

  state = {
    editing: false,
  }

  constructor(props) {
    super(props);
  }

  renderTitle() {
    if (!this.state.editing) {
      return <div style={{
        textDecoration: this.props.todo.done ? 'line-through' : 'none',
        fontSize: '20px',
        flex: 1
      }} onClick={t => this.setState({ editing: true })}>{this.props.todo.title}</div>
    } else {
      return <input
        style={{
          textDecoration: this.props.todo.done ? 'line-through' : 'none',
          fontSize: '18px',
          flex: 1
        }}
        onBlur={t => this.setState({ editing: false })}
        value={this.props.todo.title}
        onChange={event => {
          TodoModel.observe(this.props.todo.id).interface.setTitle(event.target.value)
        }} />
    }
  }

  toggleDone(event) {
    const i = TodoModel.observe(this.props.todo.id).interface;
    console.log(i.done, "oke");
    i.done = !i.done;
  }

  discardTodo() {
    AppDirectory.observe().interface.discardTodo(this.props.todo.id)
  }

  render() {
    return (
      <div className="" style={{
        display: 'flex',
        flexDirection: 'row',
        border: '1px solid black',
        padding: '10px',
        alignItems: 'center'
      }}>
        {
          this.renderTitle()
        }
        <div style={{
          marginRight: '10px'
        }}>
          {
            this.props.removable && <FontAwesome
            onClick={this.discardTodo.bind(this)} style={{ cursor: 'pointer' }}
            size='1x'
            name='times' /> || null
          }
        </div>
        <div style={{
          marginRight: '10px'
        }}>
          <FontAwesome
            onClick={_ => this.setState({ editing: true })} style={{ cursor: 'pointer' }}
            size='1x'
            name='pencil' />
        </div>
        <input
          type="checkbox" checked={this.props.todo.done} onChange={this.toggleDone.bind(this)} />
      </div>

    );
  }
}

export default Todo;
