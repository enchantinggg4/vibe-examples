import Vibe from 'vibejs';
import Todo from '../../store/model/Todo';
import Store from '../../store/Store';

export default new Vibe.Directory('CreateTodo', {
    structure: {
        title: Vibe.types.Attribute
    },
    mutations: {
        setTitle(newTitle){
            this.title = newTitle;
        },
        clearTitle(){
            this.setTitle("");
        }
    }
}, Store);