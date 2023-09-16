import { useState } from "react";
import './styles.css';


const Content = () => {
  return (
    <div>
      <Part1 /> ja tehtävämäärä: <Exercises1 />
      <Part2 /> ja tehtävämäärä: <Exercises2 />
      <Part3 /> ja tehtävämäärä: <Exercises3 />
    </div>
  )
}

const Course = () => {
  return(
  <div>Half Stack application development</div>
  )
}

const Part1 = () => {
  return(
    <div>Fundamels of React</div>
  )
}

const Exercises1 = () => {
  const a = 10
  return (
   a
  )
}
const Part2 = () => {
  return(
    <div>Using props to pass data</div>
  )
}
const Exercises2 = () => {
  const b = 7
  return (
    b
  )
}
const Part3 = () => {
  return(
    <div>State of Component</div>
  )
}
const Exercises3 = () => {
  const c = 14
  return (
    c
  )
}

const TotalSum = () => {
  const aValue = Exercises1();
  const bValue = Exercises2();
  const cValue = Exercises3();
  const sum = aValue + bValue + cValue;

  return (
    <div>
      <p>Kokonaismäärä tehtäviä: {sum}</p>
    </div>
  );
};





// app

const App = () => {


  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  const kurssi = 'Half Stack application development'
  const osaset = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const kurssia = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

const [good, setGood] = useState(0)
const [neutral, setNeutral] = useState(0)
const [bad, setBad] = useState(0)
const [allClicks, setAll] = useState([])
const [total, setTotal] = useState(0) // laskee totalin
const [average, setAverage] = useState(0)
const [positivepros, setPositive] = useState(0)

const handleGoodClick = () => {
  setAll(allClicks.concat('Good'))
  const updatedGood = good + 1
  setGood(updatedGood)
  setTotal(updatedGood + neutral + bad)
  setAverage(updatedGood + neutral - bad / total)
  setPositive(good / total * 100)
}
const handleNeutralClick = () => {
  setAll(allClicks.concat('Neutral'))
  const updatedNeutral = neutral + 1
  setNeutral(updatedNeutral)
  setTotal(updatedNeutral + bad + good)
 // setAverage(updatedNeutral + good / total)

}
const handleBadClick = () => {
  setAll(allClicks.concat('Bad'))
  const updatedBad = bad + 1
  setBad(updatedBad)
  setTotal(updatedBad + good + neutral)
  setAverage(updatedBad - 1 + good / total)
}



  
  return (
    
    <div>
      <h1>Step 1</h1>
     <h1><Course /></h1>
        <Part1 />
        <Exercises1 /> 
        <Part2 />
        <Exercises2 />
        <Part3 /> 
        <Exercises3 />

      <h1>Step 2</h1> 
      <Content />


      <h2>
      <TotalSum />
      </h2>

      <h1>Step 3</h1>
      <h2>{course}</h2>
          <ul>
         <li>{part1.name} and {part1.exercises} exercises</li>
         <li>{part2.name} and {part2.exercises} exercises</li>
         <li>{part3.name} and {part3.exercises} exercises</li>
         </ul>

      <h1>Step 4</h1>
      <h2>{kurssi}</h2>
      <ul>
        {osaset.map((part, index) => (
          <li key={index}>
            {part.name}: {part.exercises} exercises
          </li>
        ))}
      </ul>
      
      <h1>Step 5</h1>
      <h2>{kurssia.name}</h2>
      <ul>
        {kurssia.parts.map((part, index) => (
          <li key={index}>
            {part.name}: {part.exercises} exercises
          </li>
        ))}
      </ul>

      <h1>Step 6</h1>
      <h2>Unicafe feedback</h2>
      <button className="button" onClick={handleGoodClick}>Good</button>
      <button className="button" onClick={handleNeutralClick}>Neutral</button>
      <button className="button" onClick={handleBadClick}>Bad</button>



          <h2>Tulokset</h2>
          <div>Good: {good}</div>
          <div>Neutral: {neutral}</div>
          <div>Bad: {bad}</div>
          <div>Total: {total}</div>
          <div>Average: {average} </div>
          <div>Positive: {positivepros} %</div>




        </div>

  
  
  
  )
}

export default App