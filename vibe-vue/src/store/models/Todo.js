import Vibe from 'vibejs'

const types = Vibe.types;
export default new Vibe.Model('Todo', {
    structure: {
        title: types.String,
        description: types.String,
        done: types.Boolean
    }
})