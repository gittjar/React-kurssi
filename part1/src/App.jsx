const Hello = (props) => {

  props = {
    name: 'Pekto',
    age: 36,
  }
  const name = props.name
  const age = props.age


  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>

      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born {bornYear()}</p>
    </div>
  )
}

// footer
const Footer = () => {
  return (
    <div>
      greeting app created by :
      <a href="https://github.com/gittjar">gittjar</a>
    </div>
  )
}

const App = () => {

  const nimi = 'Pekka'
  const ika = 10



  return (
    <div>
      <h1>Greetings</h1>
      <Hello />
      <Footer/>
    </div>
    
  )
}

export default App