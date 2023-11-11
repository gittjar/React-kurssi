import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'
import './styles.css'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const ok = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const bad = () => {
    store.dispatch({
      type: 'BAD'
    })
  }

  const zero = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }



  return (
    <div className='main'>
      <button onClick={good}>Good</button> 
      <button onClick={ok}>OK</button> 
      <button onClick={bad}>Bad</button>
      <button onClick={zero}>Reset stats</button>
      <div className='value'>Good: {store.getState().good}</div>
      <div className='value'>Ok: {store.getState().ok}</div>
      <div className='value'>Bad: {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
