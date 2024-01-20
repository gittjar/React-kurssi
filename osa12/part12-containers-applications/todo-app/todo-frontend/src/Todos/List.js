import React from 'react'

const TodoList = ({ todos, deleteTodo, completeTodo }) => {
  const onClickDelete = (todo) => () => {
    deleteTodo(todo)
  }

  const onClickComplete = (todo) => () => {
    completeTodo(todo)
  }

  return (
    <table className='listaus' >
      <tbody>
        {todos.map((todo, index) => (
          <tr key={index} style={{ borderBottom: '1px solid #ddd', padding: '10px' }}>
            <td>{todo.text}
            <div style={{ fontSize: '0.8em' }}>
            {todo.done ? 'This todo is done' : 'This todo is not done'}
            </div>
            
            </td>
            <td style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8em' }}>
                
              </div>
              <button onClick={onClickDelete(todo)}>Delete</button>
              {todo.done ? null : <button onClick={onClickComplete(todo)}>Set as done</button>}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   
  )
}

export default TodoList