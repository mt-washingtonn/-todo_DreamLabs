import { defineStore } from 'pinia'
import { ref, onBeforeMount } from 'vue'

export const useTodoStore = defineStore('todo', () => {
  const todos = ref([])
  const id = ref(1)

  const loadTodos = () => {
    const storedTodos = localStorage.getItem('todos')
    const storedId = localStorage.getItem('id')

    if (storedTodos) {
      todos.value = JSON.parse(storedTodos)
      id.value = parseInt(storedId) || 1
    } else {
      todos.value = [
        {
          name: 'Проснуться в 8 утра',
          description: 'Проснуться рано утром, чтобы потом выполнить тестовое задание',
          date: new Date(),
          isFinished: false,
          id: 1,
        },
        {
          name: 'Позавтракать',
          description: 'Позавтракать, чтобы потом выполнить тестовое задание',
          date: new Date(),
          isFinished: true,
          id: 2,
        },
      ]
      id.value = 3
    }
  }

  onBeforeMount(loadTodos)

  const saveTodos = () => {
    localStorage.setItem('todos', JSON.stringify(todos.value))
    localStorage.setItem('id', id.value.toString())
  }

  function addTodo(todo) {
    todos.value.push({
      name: todo.name,
      description: todo.description,
      date: new Date(),
      isFinished: false,
      id: id.value,
    })
    id.value++
    saveTodos()
  }

  function removeTodo(todoId) {
    todos.value = todos.value.filter((todo) => todo.id !== todoId)
    saveTodos()
  }

  const finishTodo = (updatedTodo) => {
    const index = todos.value.findIndex((todo) => todo.id === updatedTodo.id)
    if (index !== -1) {
      todos.value[index] = updatedTodo
      saveTodos()
    }
  }

  return { todos, id, addTodo, removeTodo, finishTodo }
})
