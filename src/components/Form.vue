<template>
    <form class="form">
        <h2 class="form__title app__title">{{ title }}</h2>
        <input 
            type="text"
            class="form__header"
            minlength="1"
            maxlength="100"
            placeholder="Заголовок"
            v-model.trim="data.header"
        />
        <textarea 
            name="desc"
            id="desc"
            class="form__desc"
            v-model.trim="data.description"
        >
        </textarea>
        <my-selector :priority="data.priority" />
        <my-button 
            :buttonText="buttonText"
            placeholder="Описание"
            @click.prevent="buttonClick"
        />
    </form>
</template>

<script>
export default {
  name: 'my-form',
  data() {
      return {
          data: this.$attrs.data || {}
      }
  },
  props: {
      title: {
          type: String,
          default: 'Новое задание',
      },
      buttonText: {
          type: String,
          default: 'Добавить задачу'
      }
  },
  inject: ['setCurTask', 'getNewTask'],
  methods: {
      buttonClick() {
        //   console.log(this.$attrs.data.desc)
        //   setCurTask($this.$attrs)
        //   getNewTask({ desc: this.description, header: this.header, priority: this.priority, ...task})
      },
  },
  
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.form {
    position: relative;
    box-sizing: border-box;
    display: grid;
    width: 100%;
    gap: 30px;
    padding: 40px;
    grid-template-columns: 100%;

    &__title {
        margin: 0 auto 0 0;
    }

    &__header {
        border: none;
        font-size: 18px;
        line-height: 60px;
        padding: 0 15px;
        margin: 0;
        outline-color: rgba($color: $gray, $alpha: .2);
        border-radius: 10px;
        background-color: $light-gray;
    }

    &__desc {
        box-sizing: border-box;
        border: none;
        padding: 15px;
        width: 100%;
        min-height: 140px;
        resize: none;
        border-radius: 10px;
        outline-color: rgba($color: $gray, $alpha: .2);
        background-color: $light-gray;
    }
}

</style>
