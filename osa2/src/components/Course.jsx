const Part = ({ part }) => (
    <p>
      {part.name} = {part.exercises} exercises
    </p>
  );

const Course = ({ course }) => (
    <div>
      <h1>{course.name}</h1>
      {course.parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
      <b>
        Total exercises:{' '}
        {course.parts.reduce((total, part) => total + part.exercises, 0)}
      </b>
    </div>
  );

  export default Course