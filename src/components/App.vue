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
          @change="dateSelect"
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
        v-else-if="isError"
        type="error"
        altText="Что-то пошло не так ((("
      />
      <my-alt-image 
        v-else-if="isEmpty"
        type="empty"
        altText="На сегодня задач пока нет"
      />
      <my-todo-list 
        v-else
        :listItems="this.listItems"
        @showEditModal="showEditModal"
      />
      <my-button
        type="button"
        btn-class="normal"
        buttonText="Добавить задачу"
        @click="() => isAddModalShow = true"
      />
      <my-modal v-model:show="isAddModalShow">
        <my-form 
        />
      </my-modal>
      <my-modal :show="isEditModalShow">
        <my-form 
          title="Редактировать"
          buttonText='Сохранить'
          :data="task"
        />
      </my-modal>
    </body>
  </div>
</template>

<script>
// import { items } from '@/config/constants.json';
import { getTasks } from '@/utils/queries.js';

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
      isListItemInfoShow: false,
      isLoading: false,
      task: {},
      newTask: {}
    }
  },
  beforeMount() {
    this.date = new Date().toISOString().slice(0,10);
  },

  mounted() {
    this.isLoading = true
    getTasks(this.date)
    .then(response => {
      console.log(response)
      if (!response.data) throw new Error('Not found')
      if (!response.data.length) this.isEmpty = true
      this.listItems = response.data
    })
    .catch(err => console.log(err.message))
    .finnally(this.isLoading = false)
  },

  provide() {
    return {
      setCurTask: (task) => task = this.task,
      getNewTask: (data) => this.newTask = data,
      getTask: (data) => this.task = data,
      showEditModal: (data) => this.isEditModalShow = data
    }
  },
  methods: {
    dateSelect() {
      console.log(this.date)
      this.isLoading = true
      getTasks(this.date)
        .then(response => {
          if (!response.data.length) this.isEmpty = true
          this.listItems = response.data
        })
        .catch(err => console.log(err.message))
        .finnally(this.isLoading = false)
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
      background: url('../assets/icons/calendar-icon.svg');
      background-size: cover;
    }
  }
}
</style>
