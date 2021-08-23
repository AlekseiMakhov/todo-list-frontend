<template>
    <transition name="fade-slide" mode="out-in">
        <li class="todo-item" @click.stop="taskClick">
            <div 
                v-bind:class="[
                    data.priority 
                        ? `todo-item__priority_level_${data.priority}` 
                        : '', 'todo-item__priority'
                    ]"
            >
            </div>
            <div class="todo-item__container">
                <div class="todo-item__task-container">
                    <my-checkbox 
                        :isDone="data.done"
                        @click.stop="handleCheckButton"
                    />
                    <p 
                        v-bind:class="[data.done ? 'todo-item__task_done' : '', 'todo-item__task']"
                    >
                    {{ data.header }}
                    </p>
                </div>
                <my-icon-button 
                    @click.stop="clickIcon"
                /> 
            </div>     
        </li>
    </transition>
</template>

<script>

export default {
    name: 'my-todo-item',
    data() {
      return {
        done: false
      }
    },
    props: {
        data: {
            type: Object,
            default: {}
        },
    },
    // проброс методов из корневого компонента
    inject: [
        'getTask', 'showEditModal', 'clickTrashButton', 'putDoneFlag'
    ],

    methods: {
        // открытие окна и передача в него данных для редактирвания по клику
        taskClick() {
            this.getTask(this.data);
            this.showEditModal(true);
        },
        // обработка клика по кнопке удаления
        clickIcon() {
            this.clickTrashButton(this.data._id);
        },
        // обработка клика по кнопке выполнения задачи
        handleCheckButton() {
            const newData = JSON.parse(JSON.stringify(this.data))
            this.done = !this.done
            newData.done = this.done
            this.putDoneFlag(newData)
        },
        // update() {
          // console.log('here')
            // this.done = this.data.done;
            // this.$forceUpdate()
        // }
    },
    mounted() {
        this.done = this.data.done;
    }
};
</script>

<style lang="scss" scoped>
@import '@/styles/global.scss';

.todo-item {
    padding: 0;
    margin: 0 0 20px;
    position: relative;
    display: flex;
    align-items: center;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 40px rgba($color: $black, $alpha: .1);
    overflow: hidden;
    transition: transform .2s;
    cursor: pointer;
    opacity: 1;

    &:hover {
        transform: translateY(-6px);
    }

    &:last-of-type {
        margin: 0;
    }

    &__priority {
        height: 66px;
        width: 12px;
        background-color: $blue;

        &_level_h {
            background-color: $red;
        }

        &_level_m {
            background-color: $orange;
        }

        &_level_l {
            background-color: $blue;
        }
    }

    &__container {
        width: calc(100% - 40px);
        display: flex;
        justify-content: space-between;
        margin: 0 20px;
        align-items: center;
    }

    &__task-container {
        margin: 0 auto 0 0;
        display: flex;
        justify-content: space-between;
        overflow: hidden;
        align-items: center;  
    }

    &__task {
        font-size: 18px;
        line-height: 22px;
        color: $text-color;
        margin: 0 0 0 15px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 400px;

        &_done {
            text-decoration: line-through;
            color: $gray;
        }
    }
}

</style>
