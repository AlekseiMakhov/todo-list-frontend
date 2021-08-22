<template>
    <input
        type="checkbox"
        class="checkbox"
        v-model="isChecked"
        @click.stop="$emit('onCheck', !isChecked)"
    />
</template>

<script>
export default {
  name: 'my-checkbox',
  props: {
    isChecked: {
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
    border: none;
    border-radius: 50%;
    margin: 0;
    background-image: url('../../assets/icons/checkbox-empty.svg');
    background-size: cover;
    cursor: pointer;

    &:checked {
      background-image: url('../../assets/icons/checkbox.svg');
    }
}
</style>
