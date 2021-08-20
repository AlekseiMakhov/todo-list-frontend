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
      />
      <my-button
        type="button"
        btn-class="normal"
        buttonText="Добавить задачу"
      />
      <my-modal v-model:show="isAddModalShow">
        <my-form 

        />
      </my-modal>
      <my-modal
        v-model:show="isEditModalShow"
      />
      <my-modal
        v-model:show="isListItemInfoShow"
      />
    </body>
  </div>
</template>

<script>
import { items } from '@/config/constants.json';

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
    }
  },

  beforeMount () {
    this.listItems = [...items];
    this.date = new Date().toISOString().slice(0,10);
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
