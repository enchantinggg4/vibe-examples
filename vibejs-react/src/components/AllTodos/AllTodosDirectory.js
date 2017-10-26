import Vibe from 'vibejs';
import Todo from '../../store/model/Todo';
import Store from '../../store/Store';

export default new Vibe.Directory('AppDirectory', {
    structure: {
        todos: Vibe.types.Array(Vibe.types.Reference(Todo.name))
    },
}, Store);
