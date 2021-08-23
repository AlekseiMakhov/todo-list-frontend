<template>
    <form class="form" @submit.prevent="handleForm">
        <h2 class="form__title app__title">{{ title }}</h2>
        <input
            type="text"
            class="form__header"
            minlength="1"
            maxlength="100"
            required
            placeholder="Заголовок"
            v-model.trim="header"
        />
        <textarea
            name="description"
            placeholder="Описание"
            minlength="1"
            required
            class="form__desc"
            v-model.trim="description"
        >
        </textarea>
        <my-selector v-model:priority="priority" />
        <my-button
            :buttonText="buttonText"
        />
    </form>
</template>

<script>
export default {
    name: 'my-form',
    data() {
        return {
            description: '',
            header: '',
            priority: '',
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
        },
        data: {
            type: Object,
            default: () => {}
        }
    },
    inject: ['submitForm'],

    methods: {
        // проверка и подтверждение введенных данных
        handleForm(evt) {
            if (evt.target.checkValidity()) {
                [this.data.header, this.data.description, this.data.priority] = 
                [this.header, this.description, this.priority]
                this.submitForm(this.data)
            }
        },
    },
    
    mounted () {
        // копируем поля в форму для редактирования
        this.header = this.data?.header || ''
        this.description = this.data?.description || '';
        this.priority = this.data?.priority || 'l';
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
