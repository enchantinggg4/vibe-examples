<template>
  <div id="app">
    <div class="todo-list">
      <input id="undoneFirst" type="checkbox" v-model="component.undoneFirst">
      <label for="undoneFirst">Show undone todos first</label>
      <table>
          <tr>
            <th>Title</th>
            <th>Description</th> 
            <th>Done</th>
          </tr>
          <template v-if="component.undoneFirst">
            <tr v-for="todo in component.undoneTodos" :key="todo.id">
              <th>{{todo.title}}}</th>
              <th>{{todo.description}}</th> 
              <th><input type="checkbox" v-model="todo.done"></th>
            </tr>
            <tr v-for="todo in component.doneTodos" :key="todo.id">
              <th>{{todo.title}}}</th>
              <th>{{todo.description}}</th> 
              <th><input type="checkbox" v-model="todo.done"></th>
            </tr>

          </template>
          <template v-else >
            <tr v-for="todo in component.doneTodos" :key="todo.id">
              <th>{{todo.title}}}</th>
              <th>{{todo.description}}</th> 
              <th><input type="checkbox" v-model="todo.done"></th>
            </tr>
            <tr v-for="todo in component.undoneTodos" :key="todo.id">
              <th>{{todo.title}}}</th>
              <th>{{todo.description}}</th> 
              <th><input type="checkbox" v-model="todo.done"></th>
            </tr>
          </template>
          
      </table>
    </div>

    <form class="new-todo" action="#">
      <input type="text" placeholder="New todo's name" v-model="newTodoTitle" />
      <textarea name="" id="" cols="10" rows="10" placeholder="Description" v-model="newTodoDescription"></textarea>
      <button @click="createNewTodo">New Todo</button>
    </form>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";
import Vibe from "vibejs";
import Todo from "../src/store/models/Todo";
import Store from "../src/store/Store";

const types = Vibe.types;

const struct = new Vibe.Struct(
  {
    structure: {
      todos: types.Array(types.Reference(Todo.name)),
      undoneFirst: types.Boolean
    },
    computed: {
      doneTodos() {
        return this.todos.filter(it => it.done);
      },
      undoneTodos() {
        return this.todos.filter(it => !it.done);
      }
    }
  },
  Store
);

export default {
  name: "app",
  data() {
    return {
      component: struct.observe(),
      newTodoTitle: "",
      newTodoDescription: ""
    };
  },
  mounted() {
    this.component.$observable.subscribe(_ => {
      this.$forceUpdate();
    });
  },
  methods: {
    createNewTodo() {
      const entity = {
        id: new Date().getTime(),
        title: this.newTodoTitle,
        description: this.newTodoDescription,
        done: false
      };
      Todo.insertEntity(entity);
      this.component.todos = this.component.todos.concat([entity.id]);

      console.log(this.component.todos);
      this.newTodoDescription = "";
      this.newTodoTitle = "";
    },
    changeUserName(user, name) {
      user.name = name;
    }
  },
  components: {}
};
</script>

<style>
.todo-item {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}

.todo-item-editor {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}
.todo-list {
  padding: 10px;
}

#app {
  width: 500px;
  margin: auto;
  margin-top: 100px;
}

.new-todo {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

table {
  width: 100%;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
th,
td {
  padding: 5px;
  text-align: left;
}
</style>
