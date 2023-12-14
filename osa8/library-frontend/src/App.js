import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import './styles.css';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

const App = () => {
  const [page, setPage] = useState('authors')

  return (
    
    <div className='main'>
      

      <section className='navbuttons'>
      
        <button onClick={() => setPage('authors')}>authors <ArrowForwardIosRoundedIcon className='iconfwd' fontSize="small"></ArrowForwardIosRoundedIcon></button>
        <button onClick={() => setPage('books')}>books <ArrowForwardIosRoundedIcon className='iconfwd' fontSize="small"></ArrowForwardIosRoundedIcon></button>
        <button onClick={() => setPage('add')}>add book <ArrowForwardIosRoundedIcon className='iconfwd' fontSize="small"></ArrowForwardIosRoundedIcon></button>
      </section>

      <section className='content'>
      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />
      </section>
    </div>
  )
}

export default App
