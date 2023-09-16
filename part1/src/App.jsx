import { useState } from 'react'
import './styles.css'; // Import the external CSS file

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button2 = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {

  const [ counter, setCounter ] = useState(0)

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0) // laskee totalin


  // laskee kaikki painallukset LEFT napista
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + right)

  }


  const increaseByOne = () => {
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    setCounter(counter - 1)
  }
  
  const setToZero = () => {
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

      <div>
      {left}
        <Button2 handleClick={handleLeftClick} text='left' />
        <Button2 handleClick={handleRightClick} text='right' />
        {right}
        <p>total {total}</p>
        <History allClicks={allClicks} />
      </div>



    </div>
  )
}

export default App