import Vibe from 'vibejs';
import Todo from '../../store/model/Todo';
import Store from '../../store/Store';
import AllTodosDirectory from '../AllTodos/AllTodosDirectory';

export default new Vibe.Directory('AppDirectory', {
    structure: {
        todos: Vibe.types.Array(Vibe.types.Reference(Todo.name))
    },
    computed: {
        doneTodos(){
            return this.todos.filter(it => it.done);
        }
    },
    mutations: {
        createTodo(title){
            const id = new Date().getTime();
            Todo.insertEntity(id, {
                title: title,
                done: false
            })
            this.todos = this.todos.map(it => it.id).concat([id]);
            AllTodosDirectory.observe().interface.todos = AllTodosDirectory.observe().interface.todos.map(it => it.id).concat([id])
        },
        discardTodo(id){
            
            this.todos = this.todos.map(it => it.id).filter(it => it !== id);            
        }
    }
}, Store);