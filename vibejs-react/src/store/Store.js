import Vibe from 'vibejs';
import Todo from './model/Todo';

export default new Vibe.EntityStore([
    Todo
]);