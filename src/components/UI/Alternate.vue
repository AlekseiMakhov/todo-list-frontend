<template>
    <transition name="fade-slide">
        <div class="alternate">
            <div v-bind:class="['alternate__image', imageClass]"></div>
            <p v-bind:class="['alternate__text', textClass]">{{ altText }}</p>
        </div>
    </transition>
    
</template>

<script>
    export default {
        name: 'my-alt-image',
        data() {
            return {
                imageClass: '',
                textClass: '',
            }
        },
        props: {
            type: {
                type: String,
                default: ''
            },
            altText: {
                type: String,
                default: '',
            }
        },
        beforeMount () {
            this.imageClass = `alternate__image_type_${this.type}`;
            this.textClass = `alternate__text_type_${this.type}`;
        },
    }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.fade-slide-enter-active, .fade-slide-leave-active {
  transition: transform 2s
}

.fade-slide-appear {
  transition: transform 2s
}

.fade-slide-appear-from {
  opacity: 0;
  transform: translate(-100px);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translate(-100px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translate(100px);
}

.alternate {
    padding: 110px 0;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    &__image {
        margin: 0 auto;
        background-size: contain;
        background-position: center;
        background-repeat: no-repeat;
        width: 250px;
        height: 250px;
        
        &_type {

            &_empty {
                background-image: url('../../assets/empty.svg');
            }

            &_error {
                background-image: url('../../assets/error.svg');
            }
        }
    }

    &__text {
        margin: 30px auto 0;
        font-size: 24px;
        line-height: 29px;
        text-align: center;

        &_type {

            &_empty {
                color: $blue;
            }

            &_error {
                color: $red;
            }
        }
    }
}

</style>