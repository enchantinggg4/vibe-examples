import Vibe from 'vibejs';
import Todo from './models/Todo'

export default new Vibe.EntityStore([
    Todo
]);