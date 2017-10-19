import Vibe from 'vibe';
import User from './models/User'

export default new Vibe.EntityStore([
    User
]);