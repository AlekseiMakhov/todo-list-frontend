<template>
  <div class="app">
    <body class="app__content">
      <h1 class="app__title">Список задач</h1>
      <div class="app__date-container">
        <input
          id="date"
          type="date"
          v-model="date"
          class="app__date-input"
          @change="getTasksOnSelectedDate"
        />
      </div>
      <loader
        v-if="isLoading"
        object="#fda05d"
        color1="#f06969"
        color2="#4d42c6"
        size="5"
        speed="2"
        bg="#343a40"
        objectbg="#999793"
        opacity="50"
        name="circular"
      >
      </loader>

      <my-alt-image
        v-if="isError"
        type="error"
        :altText="errorText"
      />
      
      <my-alt-image 
        v-else-if="isEmpty"
        type="empty"
        altText="День пока свободен!"
      />

      <my-todo-list v-else :listItems="this.listItems" />

      <my-button
        type="button"
        buttonText="Добавить задачу"
        @click="isAddModalShow = true"
      />

      <my-modal v-model:show="isAddModalShow">
        <my-form
          :data="{}"
        />
      </my-modal>

      <my-modal v-model:show="isEditModalShow">
        <my-form 
          title="Поправить задачу"
          buttonText="Сохранить"
          :data="task"
        />
      </my-modal>

    </body>
  </div>
</template>

<script>

import {
  getTasks, editTask, deleteTask, addTask
} from '@/utils/queries.js';

import { BAD_REQUEST_TEXT } from '@/config/constants.json';

export default {
  name: 'App',
  data() {
    return {
      listItems: [],
      date: '',
      isEmpty: false,
      isError: false,
      isAddModalShow: false,
      isEditModalShow: false,
      isLoading: false,
      task: {},
      errorText: ''
    }
  },
  beforeMount() {
    this.date = new Date().toISOString().slice(0,10);
  },

  mounted() {
    this.getTasksOnSelectedDate()
  },

  provide() {

    return {
      getTask: data => this.task = data,

      showEditModal: value => this.isEditModalShow = value,

      clickTrashButton: id => this.handleDeleteTask(id),

      submitForm: data => {
        if (data._id === undefined) this.handleAddTask(data)
        else this.handleEditTask(data)
      },

      putDoneFlag: data => this.handleEditTask(data)
    }
  },
  methods: {
    getTasksOnSelectedDate() {
      this.isError = false
      this.isLoading = true
      getTasks(this.date)
      .then(response => {
        if (response.statusCode == 400) throw new Error(BAD_REQUEST_TEXT)
        this.isEmpty = !response.data.length
        this.listItems = response.data
      })
      .catch(err => {
        this.isError = true
        this.errorText = err.message
      })
      .finally(() => {
        setTimeout(() => this.isLoading = false, 500)
      })
    },

    handleEditTask(data) {
      this.isError = false
      this.isLoading = true
      editTask(data._id, { 
        header: data.header, 
        description: data.description, 
        priority: data.priority,
        date: data.date,
        done: data.done
      })
      .then(response => {
        if (response.statusCode == 400) throw new Error(BAD_REQUEST_TEXT)
      })
      .catch(err => {
        this.isError = true
        this.errorText = err.message
      })
      .finally(_ => {
        this.isEditModalShow = false
        setTimeout(_ => this.isLoading = false, 500)
      })
    },

    handleDeleteTask(id) {
      this.isError = false
      this.isLoading = true
      deleteTask(id)
      .then(_ => {
        this.listItems = this.listItems.filter(item => item._id != id)
      })
      .catch(err => {
        this.isError = true
        this.errorText = err.message
      })
      .finally(_ => {
        this.isEmpty = !this.listItems.length
        setTimeout(_ => this.isLoading = false, 500)
      })
    },

    handleAddTask(data) {
      this.isError = false
      this.isLoading = true
      data.done = false, data.date = this.date
      addTask(data)
      .then(response => {
        if (response.statusCode == 400) throw new Error(BAD_REQUEST_TEXT)
        this.listItems = [...this.listItems, response.data]
      })
      .catch(err => {
        console.log(err)
        this.isError = true
        this.errorText = err.message
      })
      .finally(_ => {
        this.isAddModalShow = false
        this.isEmpty = !this.listItems.length
        setTimeout(_ => this.isLoading = false, 500)
      })
    },
  },

};
</script>

<style lang="scss">
@import '@/styles/global.scss';

.loader-circular {
  width: 100px !important;
  height: 100px !important;
}

.app {
  font-family: Inter, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  $background-color: $white;
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: center;
  box-sizing: border-box;

  &__content {
    margin: 0 auto;
    width: $max-width;
  }

  &__title {
    margin: 100px 0 0;
    font-size: 44px;
    line-height: 54px;
    font-weight: 600;
  }

  &__date-container {
    width: 100%;
    margin: 20px 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__date-input {
    font-size: 22px;
    line-height: 24px;
    color: $text-color;
    padding: 0;
    margin: 0;
    width: 170px;
    height: 30px;
    border: none;
    outline: 0;
    
    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      width: 22px;
      height: 22px;
      transform: translateX(-10px);
      color: $blue;
      background: url('./assets/icons/calendar-icon.svg');
      background-size: cover;
    }
  }
}
</style>
