<script setup>
import { reactive, ref } from "vue"
import { useTodoStore } from '@/stores/todo'

const todoStore = useTodoStore()

const todo = reactive({
    name: '',
    description: '',
});

const showError = ref(false)

const createTodo = () => {
    if (todo.name.length === 0 || todo.description.length === 0) {
        showError.value = true
    }

    if (todo.name.length !== 0 && todo.description.length !== 0) {
        showError.value = false
        todoStore.addTodo(todo)
        todo.name = ''
        todo.description = ''
    }
};

</script>

<template>

    <div class="modal-inputs">
        <input type="text" placeholder="Название" class="input-name" v-model="todo.name">

        <textarea type="text" placeholder="Описание" class="input-description" v-model="todo.description"></textarea>
    </div>
    <button @click="createTodo">Создать</button>
    <p v-show="showError">Все поля обязательны для заполнения!</p>

</template>

<style lang="scss" scoped>
.modal-inputs {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    font-size: 12px;

    .input-name {
        width: 320px;
        margin-bottom: 12px;
        background-color: #5c529d;
        padding: 12px;
        border-radius: 12px;
        color: white;

    }

    .input-description {
        background-color: #5c529d;
        padding: 22px;
        border-radius: 12px;
        resize: none;
        overflow: hidden;
        color: white;
    }

    ::placeholder {
        color: white;
        opacity: 1;
    }
}

button {
    padding: 12px;
    margin-top: 12px;
    background-color: #352f5b;
    border-radius: 12px 12px 12px 12px;
    transition: background-color 0.2s ease-in-out;
    color: white;
}

p {
    color: red;
    margin-top: 12px;
}
</style>