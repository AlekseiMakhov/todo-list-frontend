<template>
  <ul class="todo-list">
    <my-todo-item
      v-for="item in listItems"
      :key="item.id"
      :data="item"
    />
  </ul>
</template>

<script>

export default {
  name: 'my-todo-list',

  props: {
    listItems: {
      type: Array,
      default: []
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.todo-list {
  margin: 50px 0;
  padding: 0;
  display: flex;
  list-style-type: none;
  flex-direction: column;
  justify-content: space-between;
}
</style>
