<template>
    <div class="selector">
        <p
            @click="$emit('update:priority', 'l')"
            v-bind:class="['selector__priority-level', priority == 'l' ? 'selector__priority-level_type_l' : '']">
            Обычное
        </p>
        <p
            @click="$emit('update:priority', 'm')"
            v-bind:class="['selector__priority-level', priority == 'm' ? 'selector__priority-level_type_m' : '']">
            Важное
        </p>
        <p
            @click="$emit('update:priority', 'h')"
            v-bind:class="['selector__priority-level', priority == 'h' ? 'selector__priority-level_type_h' : '']">
            Очень важное
        </p>
    </div>
</template>

<script>
    export default {
        name: 'my-selector',
        props: {
            priority: {
                type: String,
                default: 'l'
            },
        },
    }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.selector {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);

    &__priority-level {
        margin: 0;
        color: $gray;
        font-size: 18px;
        line-height: 40px;
        vertical-align: top;
        border-bottom: 3px solid $gray;
        cursor: pointer;

        &_type {

            &_l {
                color: $blue;
                border-bottom-color: $blue;
                cursor: default;
            }

            &_m {
                color: $orange;
                border-bottom-color: $orange;
                cursor: default;
            }

            &_h {
                color: $red;
                border-bottom-color: $red;
                cursor: default;
            }
        }
    }
}

</style>