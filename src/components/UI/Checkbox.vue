<template>
    <button
        type="button"
        v-bind:class="['checkbox', isDone ? 'checkbox_done' : '']"
        @click.stop="$emit('onCheck', !isDone)"
    >
    </button>
</template>

<script>
export default {
  name: 'my-checkbox',
  props: {
    isDone: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.checkbox {
    width: 20px;
    height: 20px;
    border: 2px solid $gray;
    border-radius: 50%;
    margin: 0;
    padding: 0;
    background-size: cover;
    background-color: $white;
    cursor: pointer;

    &_done {
      border: none;
      background-image: url('../../assets/icons/checkbox.svg');

      &:hover {
        background-image: url('../../assets/icons/checkbox-dark.svg');
      }
    }

    &:hover {
      background-color: $light-gray;
      border-width: 3px;
    }
}
</style>
