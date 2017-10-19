<template>
  <div id="app">
    <div class="todo-list">
      <div v-for="user in component.users" class="todo-item" :key="user.id">
          <div>{{user.shortInfo}}</div> 
          <div class="todo-item-editor">
            <input style="flex: 1;" type="text" :value="user.name" v-model="user.name" />
            <input type="checkbox" v-model="user.adult">
          </div>
      </div>
    </div>

    <form class="new-todo" action="#">
      <input type="text" placeholder="New user's name" v-model="newUserName" />
      <button @click="createNewUser">New user</button>
    </form>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Vibe from "vibe";
import User from "../src/store/models/User";
import Store from '../src/store/Store'

const struct = new Vibe.Struct({
  structure: {
    users: Vibe.types.Array(Vibe.types.Reference(User.name))
  },
  computed: {

  }
}, Store);

export default {
  name: "app",
  data() {
    return {
      component: struct.observe(),
      newUserName: ""
    };
  },
  mounted() {
    this.component.$observable.subscribe(_ => {
      this.$forceUpdate();
    })
  },
  methods: {
    createNewUser() {
      const entity = {
        id: new Date().getTime(),
        name: this.newUserName,
        adult: true
      }
      User.insertEntity(entity);
      this.component.users = this.component.users.concat([User.observe(entity.id)])
      console.log(this.component.users);
    },
    changeUserName(user, name){
      user.name = name;
    }
  },
  components: {}
};
</script>

<style>

.todo-item{
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.todo-item-editor{
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.todo-list{
  padding: 10px;
}

#app{
  width: 500px;
  margin: auto;
  margin-top: 100px;
}


.new-todo{
  padding: 10px;
}

</style>
