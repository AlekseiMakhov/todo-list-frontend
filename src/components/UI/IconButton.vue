<template>
    <button
        type="button"
        class="icon-button"
    >
    </button>
</template>

<script>
    export default {
        name: 'my-icon-button',
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
    transition: all .25s;
    background-color: transparent;
    background-image: url('../../assets/icons/trash-icon-default.svg');

    &:hover {
        color: $dark-blue;
        background-image: url('../../assets/icons/trash-icon.svg');
    }
    
}

</style>