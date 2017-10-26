import React, { Component } from 'react';
import style from './Style.js';
import AppDirectory from '../App/AppDirectory';
import CreateTodoDirectory from './CreateTodoDirectory';
import Store from '../../store/Store';

class CreateTodo extends Component {

    createTodo(){
        AppDirectory.observe().interface.createTodo(CreateTodoDirectory.observe().interface.title)
        CreateTodoDirectory.observe().interface.clearTitle();
    }

    render() {
        console.log(this.props);

        return (
            <div className="">
                <input type="text" onChange={event => { CreateTodoDirectory.observe().interface.setTitle(event.target.value) }} />
                <button onClick={this.createTodo.bind(this)}>Add todo</button>
            </div>
        );
    }
}

export default CreateTodo;

