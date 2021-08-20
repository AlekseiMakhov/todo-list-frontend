<template>
    <button
        type="button"
        v-bind:class="['icon-button', `icon-button_type_${type}`, isDisabled ? 'icon-button_disabled' : '']"
        :disabled="isDisabled"
    >
    </button>
</template>

<script>
    export default {
        name: 'my-icon-button',
        props: {
            isDisabled: {
                type: Boolean,
                default: false
            },
            type: {
                type: String,
                default: 'edit'
            }
        },
    }
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.icon-button {
    width: 24px;
    height: 24px;
    color: $blue;
    cursor: pointer;
    border: none;
    outline: none;
    transition: color .25s;
    background-color: transparent;

    &:hover {
        color: $dark-blue;
    }

    &_type {

        &_edit {
            background-image: url('../../assets/icons/pencil-icon.svg');
            margin-right: 10px;
        }

        &_delete {
            background-image: url('../../assets/icons/trash-icon.svg');
        }
    }

    &_disabled {
        background-image: url('../../assets/icons/pencil-icon-gray.svg');
        cursor: default;
    }
    
}

</style>