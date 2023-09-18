import React from 'react';

const Part = ({ part }) => (
  <p>
    {part.name} - {part.exercises} exercises
  </p>
);

const Course = ({ course }) => (
  <div>
    <h1>{course.name}</h1>
    {course.parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
    <p>
      Total exercises:{' '}
      {course.parts.reduce((total, part) => total + part.exercises, 0)}
    </p>
  </div>
);


const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'C# Jatkokurssi',
        exercises: 190,
        id: 4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App