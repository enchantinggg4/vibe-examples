import Vibe from 'vibe'
const types = Vibe.types;
export default new Vibe.Model('User', {
    structure: {
        name: types.String,
        adult: types.Boolean 
    },
    computed: {
        shortInfo(){
            return `${this.name}, ${this.adult && 'Adult' || 'Yung boy' }`
        }
    }
})