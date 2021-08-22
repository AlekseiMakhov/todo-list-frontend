<template>
    <button
        class="button"
        :type="type"
        :disabled="isDisabled"
        @click="$emit('handleButtonClick')"
    >
    {{ buttonText }}
    </button>
</template>

<script>

export default {
  name: 'my-button',
  props: {
    buttonText: {
      type: String,
      default: '',
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'submit',
    },
  },
  emits: ['handleButtonClick']
};
</script>

<style lang="scss">
@import '@/styles/global.scss';

.button {
    width: 100%;
    padding: 0;
    border: none;
    border-radius: 10px;
    color: $white;
    background-color: $blue;
    cursor: pointer;
    margin: 0;
    text-align: center;
    line-height: 56px;
    transition: all .25s;
    box-shadow: 0 4px 40px rgba($color: $black, $alpha: .3);

    &:hover {
        background-color: $dark-blue;
    }

    &_disabled {
        background-color: $gray;
    }
}

</style>
