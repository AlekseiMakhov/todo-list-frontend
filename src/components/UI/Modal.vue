<template>
    <transition name="fade" mode="out-in">
        <div class="modal" v-if="show" @click.stop="closeModal">
            <div class="modal__container" @click.stop>
            <div class="modal__content">
                <slot></slot> 
            </div>
            <div class="modal__close-button" @click="closeModal"></div>
            </div>
        </div>
    </transition>
    
</template>

<script>
export default {
  name: 'my-modal',
  props: {
      show: {
          type: Boolean,
          default: false
      }
  },
  methods: {
      closeModal() {
          this.$emit('update:show', false);
      },
  },
};

</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.fade-enter-active, .fade-leave-active {
  transition: opacity .25s
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.modal {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba($color: $black, $alpha: .5);
    display: flex;
    justify-content: center;
    align-items: center;

    &__content {
        box-sizing: border-box;
        position: relative;
        width: $max-width;
        z-index: 1;
        background-color: $white;
        display: flex;
        flex-direction: column;
        align-items: center;
        box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.1);
        border-radius: 20px;
    }

    &__container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__close-button {
        background-color: $blue;
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        position: relative;
        margin-top: 40px;
        box-shadow: 0 4px 40px rgba(0, 0, 0, 0.4);
        cursor: pointer;
        border-radius: 50%;
        transition: background-color .25s;

        &:hover {
            background-color: $dark-blue;
        }

        &::before {
            content: '';
            position: absolute;
            background-color: $white;
            width: 40px;
            height: 3px;
            border-radius: 5px;
            box-sizing: border-box;
            transform: rotate(45deg) translate(42px, 12px);
        }

        &::after {
            content: '';
            position: absolute;
            background-color: $white;
            width: 40px;
            height: 3px;
            border-radius: 5px;
            box-sizing: border-box;
            transform: rotate(-45deg) translate(-12px, 42px);
        }
    }

}
</style>
