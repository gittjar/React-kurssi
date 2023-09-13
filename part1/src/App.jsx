const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}

// footer
const Footer = () => {
  return (
    <div>
      greeting app created by 
      <a href="https://github.com/gittjar">Giiitjar</a>
    </div>
  )
}

  // testing rendering from array
  const Friends = [
    { name: 'Leevi', age: 4 },
    { name: 'Venla', age: 10 },
  ]

const App = () => {

  const nimi = 'Pekka'
  const ika = 10



  return (
    <div>
      <h1>Greetings</h1>

      <Hello name="Maya" age={26 + 10 + 5} />
      <Hello name={nimi} age={ika + 4} />
      
      <p>{Friends[0].name} - years {Friends[0].age} old</p>
      <p>{Friends[1].name} - years {Friends[1].age} old</p>
      <Footer/>
    </div>
    
  )
}

export default App