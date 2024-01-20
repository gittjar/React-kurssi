import React, { useEffect, useState } from 'react'
import axios from '../util/apiClient'

import List from './List'
import Form from './Form'

const Base_URL = 'http://localhost:3000'

const TodoView = () => {
  const [todos, setTodos] = useState([])

  const refreshTodos = async () => {
    const { data } = await axios.get(Base_URL+'/todos')
    setTodos(data)
  }

  useEffect(() => {
    refreshTodos()
  }, [])

  const createTodo = async (todo) => {
    const { data } = await axios.post('/todos', todo)
    setTodos([...todos, data])
  }

  const deleteTodo = async (todo) => {
    await axios.delete(`/todos/${todo._id}`)
    refreshTodos()
  }

  const completeTodo = async (todo) => {
    await axios.put(`/todos/${todo._id}`, {
      text: todo.text,
      done: true
    })
    refreshTodos()
  }

  return (
    <>
      <section className='header'>
      <h1>Todos</h1>
      <Form createTodo={createTodo} />
      </section>
      <section className='main'>
      <List todos={todos} deleteTodo={deleteTodo} completeTodo={completeTodo} />
      </section>  
    </>
   
  )
}

export default TodoView
