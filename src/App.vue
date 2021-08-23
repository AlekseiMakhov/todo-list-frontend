<template>
    <div class="app">
        <body class="app__content">
            <h1 class="app__title">Список задач</h1>
            <div class="app__date-container">
                <input
                    id="date"
                    type="date"
                    v-model="date"
                    class="app__date-input"
                    @change="getTasksOnSelectedDate"
                />
            </div>
            <loader
                v-if="isLoading"
                object="#fda05d"
                color1="#f06969"
                color2="#4d42c6"
                size="5"
                speed="2"
                bg="#343a40"
                objectbg="#999793"
                opacity="50"
                name="circular"
            >
            </loader>

            <my-alt-image
                v-if="isError"
                type="error"
                :altText="errorText"
            />
            
            <my-alt-image 
                v-else-if="isEmpty"
                type="empty"
                altText="День пока свободен!"
            />

            <my-todo-list v-else :listItems="this.listItems" />

            <my-button
                type="button"
                buttonText="Добавить задачу"
                @click="isAddModalShow = true"
            />

            <my-modal v-model:show="isAddModalShow">
                <my-form
                    :data="{}"
                />
            </my-modal>

            <my-modal v-model:show="isEditModalShow">
                <my-form 
                    title="Поправить задачу"
                    buttonText="Сохранить"
                    :data="task"
                />
            </my-modal>
        </body>
    </div>
</template>

<script>

import {
    getTasks, editTask, deleteTask, addTask
} from '@/utils/queries.js';

import { BAD_REQUEST_TEXT } from '@/config/constants.json';

export default {
    name: 'App',
    data() {
        return {
            listItems: [],            // список задач на текущую дату
            date: '',                 // дата
            isEmpty: false,           // флаг пустого списка
            isError: false,           // флаг ошибки
            isAddModalShow: false,    // флаг окна с формой добавления задачи
            isEditModalShow: false,   // флаг окна с формой редактирования
            isLoading: false,         // флаг отображения прелоадера
            task: {},                 // выбранный элемент
            errorText: '',            // текст ошибки
        }
    },
    beforeMount() {
        // перед монтированием устанавливаем сегодняшнюю дату
        this.date = new Date().toISOString().slice(0,10);
    },

    mounted() {
        // при монтировании отправляем запрос списка задач
        this.getTasksOnSelectedDate();
    },

    provide() {

        return {
            // получение выбранной задачи
            getTask: data => this.task = data,
            // установка флага отображения окна редактирования из компонента TodoItem
            showEditModal: value => this.isEditModalShow = value,
            // передача Id удаляемой задачи
            clickTrashButton: id => this.handleDeleteTask(id),
            // подтверждение формы
            submitForm: data => {
                if (data._id === undefined) this.handleAddTask(data);
                else this.handleEditTask(data);
            },
            // установка/снятие флага выполнения задачи
            putDoneFlag: data => this.handleEditTask(data),
        }
    },
    methods: {
        /**
        * Метод отправляет запрос на сервер для получения списка задач
        * 
        * @param {}
        * @returns {Array} - массив задач на текущую дату
        */
        getTasksOnSelectedDate() {
            this.isError = false;
            this.isLoading = true;
            getTasks(this.date)
            .then(response => {
                if (response.statusCode == 400) throw new Error(BAD_REQUEST_TEXT);
                this.isEmpty = !response.data.length;
                this.listItems = response.data;
            })
            .catch(err => {
                this.isError = true;
                this.errorText = err.message;
            })
            .finally(_ => {
                setTimeout(_ => this.isLoading = false, 500);
            })
        },

        /**
        * Метод отправляет запрос на сервер для редактирования задачи
        * 
        * @param {Object} - новые данные задачи
        * @returns {Object} - возвращает новые данные задачи (подтверждение)
        */
        handleEditTask(data) {
            this.isError = false;
            this.isLoading = true;
            editTask(data._id, { 
                header: data.header, 
                description: data.description, 
                priority: data.priority,
                date: data.date,
                done: data.done,
            })
            .then(response => {
                if (response.statusCode == 400) throw new Error(BAD_REQUEST_TEXT);
            })
            .catch(err => {
                this.isError = true;
                this.errorText = err.message;
            })
            .finally(_ => {
                this.isEditModalShow = false;
                setTimeout(_ => this.isLoading = false, 500);
            })
        },

        /**
        * Метод отправляет запрос на сервер для удаления задачи
        * 
        * @param {ObjectID} - Id задачи в БД
        * @returns {ObjectID} - возвращает удаленный Id
        */
        handleDeleteTask(id) {
            this.isError = false;
            this.isLoading = true;
            deleteTask(id)
            .then(_ => {
                this.listItems = this.listItems.filter(item => item._id != id);
            })
            .catch(err => {
                this.isError = true;
                this.errorText = err.message;
            })
            .finally(_ => {
                this.isEmpty = !this.listItems.length;
                setTimeout(_ => this.isLoading = false, 500);
            })
        },

        /**
        * Метод отправляет запрос на сервер для добавления новой задачи
        * 
        * @param {Object} - данные задачи
        * @returns {Object} - новая задача
        */
        handleAddTask(data) {
            this.isError = false;
            this.isLoading = true;
            data.done = false, data.date = this.date;
            addTask(data)
            .then(response => {
                if (response.statusCode == 400) throw new Error(BAD_REQUEST_TEXT);
                this.listItems = [...this.listItems, response.data];
            })
            .catch(err => {
                console.log(err);
                this.isError = true;
                this.errorText = err.message;
            })
            .finally(_ => {
                this.isAddModalShow = false;
                this.isEmpty = !this.listItems.length;
                setTimeout(_ => this.isLoading = false, 500);
            })
        },
    },
}
</script>

<style lang="scss">
@import '@/styles/global.scss';

.loader-circular {
    width: 100px !important;
    height: 100px !important;
}

.app {
    font-family: Inter, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    $background-color: $white;
    display: flex;
    flex-direction: column;
    position: relative;
    justify-content: center;
    box-sizing: border-box;

    &__content {
        margin: 0 auto;
        width: $max-width;
        min-width: 375px;
    }

    &__title {
        margin: 100px 0 0;
        font-size: 44px;
        line-height: 54px;
        font-weight: 600;
    }

    &__date-container {
        width: 100%;
        margin: 20px 0 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    &__date-input {
        font-size: 22px;
        line-height: 24px;
        color: $text-color;
        padding: 0;
        margin: 0;
        width: 170px;
        height: 30px;
        border: none;
        outline: 0;

        &::-webkit-calendar-picker-indicator {
            cursor: pointer;
            width: 22px;
            height: 22px;
            transform: translateX(-10px);
            color: $blue;
            background: url('./assets/icons/calendar-icon.svg');
            background-size: cover;
        }                       
    }
}

@media screen and (max-width: 620px) {
    .app {

        &__content {
            margin: 0 20px;
            width: auto;
        }

        &__title {
            margin: 80px 0 0;
            font-size: 32px;
            line-height: 36px;
            text-align: center;
        }

        &__date-input {
            margin: 0 auto;
        }
    }
}

</style>
