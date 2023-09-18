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

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <div>
      <h2>Statistics</h2>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>Total: {total}</p>
      <p>Average: {average || 0}</p>
      <p>Positive: {positive || 0} %</p>
    </div>
  );
};

const StatisticLine = ({ text, value }) => (
  <p>
    {text}: {value}
  </p>
);

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

//
// Random anecdotes

const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  'The only way to go fast, is to go well.',
  'Tämä on random Anecdote!'
]

const [selected, setSelected] = useState(0)
const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));
const mostVotedIndex = votes.indexOf(Math.max(...votes));

const getRandomAnecdote = () => {
  const randomIndex = Math.floor(Math.random(5) * anecdotes.length);
  setSelected(randomIndex);
};

const handleVoteClick = () => {
  const updatedVotes = [...votes];
  updatedVotes[selected] += 1;
  setVotes(updatedVotes);
};

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

<table>
      <tr><h1>Step 6</h1></tr>
      <tr><h2>Unicafe feedback</h2></tr>
      <tr><h1>Give Feedback</h1></tr>
      <tr>
      <button className="button" onClick={handleGoodClick}>Good</button>
      <button className="button" onClick={handleNeutralClick}>Neutral</button>
      <button className="button" onClick={handleBadClick}>Bad</button>
      </tr>
      <tr>
      {total === 0 ? (
        <h3>No feedback given</h3>
      ) : (
        <div className="cellstyle">
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="total" value={total} />
          <StatisticLine text="average" value={average || 0} />
          <StatisticLine text="positive" value={`${positivepros || 0}%`} />
        </div>
      )}
      </tr>
</table>

      <div>
        <h1>Anecdotes</h1>
      <div><h4>{anecdotes[selected]}</h4></div>
        <h4>Has {votes[selected]} votes</h4>
        <button className="buttonAnecdote" onClick={handleVoteClick}>Vote</button>
      <button className="buttonAnecdote" onClick={getRandomAnecdote}>Next Anecdote</button>
      </div>
      <div>
        <h2>Most Voted Anecdote</h2>
        {votes[mostVotedIndex] > 0 ? (
          <div>
            <h4>{anecdotes[mostVotedIndex]}</h4>
            <h4>Has {votes[mostVotedIndex]} votes</h4>
          </div>
        ) : (
          <h3>No votes yet</h3>
        )}
      </div>

        </div>
  )
}

export default App