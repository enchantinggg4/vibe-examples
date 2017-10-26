import Vibe from 'vibejs';

export default new Vibe.Model('Todo', {
    structure: {
        title: Vibe.types.Attribute,
        done: Vibe.types.Attribute
    },
    mutations: {
        setTitle(title){
            this.title = title;
        },
    }
})