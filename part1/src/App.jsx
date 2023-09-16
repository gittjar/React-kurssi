import { useState } from 'react'
import './styles.css'; // Import the external CSS file


const App = () => {

  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)


  const increaseByOne = () => {
    console.log('increasing, value before', counter)
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)
  }
  
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }

  const handleClick = () => {
    console.log('clicked')
  }


  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  const Display = ({ counter }) => {
    const displayStyle = {
      fontSize: '60px',
      color: 'blue',
    };
  
    return <div style={displayStyle}>{counter}</div>;
  };

  const Button = (props) => {
    return (
      <button className="button" onClick={props.handleClick}>
        {props.text}
      </button>
    )
  }

  return (
    <div className='center'>
      <h1>Counter App</h1>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  )
}

export default App