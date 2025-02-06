<script setup>
import { useTodoStore } from '@/stores/todo';
import modalWindow from './UI/modalWindow.vue';
import { FlDeleteDismiss, MdOutlinedDoneOutline, MaCross } from '@kalimahapps/vue-icons';
import { ref } from 'vue';
const todoStore = useTodoStore();

const props = defineProps({
    name: String,
    description: String,
    date: [String, Date],
    isFinished: Boolean,
    id: Number
});

const deleteItem = () => {
    todoStore.removeTodo(props.id);
};

const finishItem = () => {
    const updatedTodo = {
        ...props,
        isFinished: !props.isFinished,
    };
    todoStore.finishTodo(updatedTodo);
}

const showMore = ref(false)

const showMoreHandle = () => {
    showMore.value = true
}

</script>

<template>
    <div class="todo-item">
        <div class="todo-strings" @click="showMoreHandle">
            <span class="name">{{ props.name }}</span>
        </div>
        <div class="todo-date">
            <span>{{ new Date(props.date).toLocaleDateString() }}</span>
        </div>
        <div class="todo-btns">
            <button @click="finishItem">
                <MdOutlinedDoneOutline class="icon" v-if="!props.isFinished" />
                <MaCross class="icon" v-else />
            </button>
            <button @click="deleteItem">
                <FlDeleteDismiss class="icon" />
            </button>
        </div>
    </div>
    <modalWindow v-model:show="showMore">
        <div class="modal-more-content">
            <div class="modal-strings">
                <span class="modal-name">Название: {{ props.name }}</span>
                <span class="modal-description">Описание: {{ props.description }}</span>
            </div>
            <div class="modal-date">
                <span>{{ new Date(props.date).toLocaleDateString() }}</span>
            </div>
        </div>
    </modalWindow>
</template>

<style lang="scss" scoped>
.todo-item {
    margin-top: 20px;
    background-color: #423a6f;
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;

    .todo-strings {
        width: 560px;
        height: 160px;
        background-color: #352f5b;
        display: flex;
        flex-direction: column;
        border-radius: 12px;
        padding: 26px 24px;

        .name {
            margin-top: 42px;
            font-size: 24px;
            text-align: center;
            word-wrap: break-word;
        }


    }

    .todo-date {
        background-color: #352f5b;
        margin-left: 20px;
        border-radius: 12px;
        padding: 12px;
    }

    .todo-btns {
        margin-left: 20px;
        display: flex;
        flex-direction: column;
        color: white;

        button {
            padding: 12px;
            margin-bottom: 10px;
            background-color: #352f5b;
            border-radius: 12px;
            transition: background-color 0.2s ease-in-out;
            cursor: pointer;
            color: white;

            .icon {
                font-size: 1.3em;
            }

            &:hover {
                background-color: #201c38;
            }
        }
    }
}

.todo-item:hover {
    background-color: #201c38;
}

.modal-more-content {
    display: flex;
    flex-direction: column;
    padding: 20px;
    justify-content: center;

    .modal-date {
        margin-top: 45px;
        text-align: center;
    }

    .modal-strings {
        display: flex;
        flex-direction: column;

        .modal-description {
            margin-top: 25px;
            font-size: 16px;
            text-align: center;
            word-wrap: break-word;
        }

        .modal-name {
            font-size: 16px;
            text-align: center;
            word-wrap: break-word;
        }
    }




}
</style>
