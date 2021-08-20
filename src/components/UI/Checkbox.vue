<template>
    <input
        type="checkbox"
        v-bind:class="[isChecked ? 'checkbox_checked' : '', 'checkbox']"
        :checked="isChecked"
        @click="onCheck"
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
  methods: {
      onCheck() {
        return this.$emit('checkHandler', this)
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

    &_checked {
      background-image: url('../../assets/icons/checkbox.svg');
    }
}
</style>
