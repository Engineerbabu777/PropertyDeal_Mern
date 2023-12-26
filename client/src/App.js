import { BrowserRouter } from 'react-router-dom'

import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
          <Navbar />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
