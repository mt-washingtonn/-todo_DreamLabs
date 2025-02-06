<script setup>
import { useTodoStore } from './stores/todo'
import TodoItem from './components/TodoItem.vue';
import { AkPlus } from '@kalimahapps/vue-icons';
import { ref, computed } from 'vue';
import CreateModal from './components/CreateModal.vue';
import modalWindow from './components/UI/modalWindow.vue';

const todoStore = useTodoStore()
const modal = ref(false)

const openModal = () => {
  modal.value = true
}

const searchQuery = ref("");
const selectedDate = ref("");
const filterStatus = ref("all")

const filteredTodos = computed(() => {
  return todoStore.todos.filter((todo) => {
    const matchesQuery =
      todo.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesDate =
      !selectedDate.value || new Date(todo.date).toDateString() === new Date(selectedDate.value).toDateString();

    const matchesStatus =
      filterStatus.value === "all" ||
      (filterStatus.value === "finished" && todo.isFinished) ||
      (filterStatus.value === "unfinished" && !todo.isFinished);

    return matchesQuery && matchesDate && matchesStatus;
  });
});

</script>



<template>
  <modalWindow v-model:show="modal">
    <CreateModal />
  </modalWindow>
  <main>

    <h1>Todo List</h1>
    <div class="filters">
      <input v-model="searchQuery" type="text" placeholder="Поиск по названию" class="filter-input" />
      <input v-model="selectedDate" type="date" class="filter-date" />
      <select v-model="filterStatus" class="filter-status">
        <option value="all">Все</option>
        <option value="unfinished">Невыполненные</option>
        <option value="finished">Выполненные</option>
      </select>
    </div>
    <div v-if="todoStore.todos.length === 0" class="empty">Пусто, создайте свою первую тудушку! Нажмите на кнопку в
      правом нижнем углу</div>
    <div class="todo-list">
      <TodoItem v-for="todo in filteredTodos" :key="todo.id" :name="todo.name" :description="todo.description"
        :date="todo.date" :is-finished="todo.isFinished" :id="todo.id" />
    </div>
  </main>

  <button @click="openModal">
    <AkPlus class="icon" />
  </button>

</template>

<style lang="scss" scoped>
h1 {
  font-size: 42px;
  text-transform: uppercase;
  font-weight: 600;
}

button {
  padding: 12px;
  position: fixed;
  bottom: 24px;
  right: 182px;
  background-color: #423a6f;
  border-radius: 12px 12px 12px 12px;
  transition: background-color 0.2s ease-in-out;
  color: white;

  .icon {
    font-size: 1.3em;
  }

  &:hover {
    background-color: #201c38;
  }

}


.empty {
  margin-top: 42px;
  font-size: 22px;
}


.filters {
  display: flex;
  justify-content: space-between;


  .filter-status {
    margin-left: 12px;
    padding: 12px;
    margin-bottom: 12px;
    background-color: #5c529d;
    border-radius: 12px;
    cursor: pointer;
    color: white;

    option {
      color: white;
    }
  }

  input {
    margin-left: 12px;
    margin-bottom: 12px;
    background-color: #5c529d;
    padding: 12px;
    border-radius: 12px;
    cursor: pointer;
    color: white;
  }

  .filter-date {
    color: white;
  }


  ::placeholder {
    color: white;
    opacity: 1;
  }

}
</style>
