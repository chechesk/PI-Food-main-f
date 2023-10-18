import { Route, Routes } from 'react-router-dom'
import './App.css'

function Home() {
  return <div>Esta es la página de inicio</div>
}

function About() {
  return <div>Esta es la página de Acerca de</div>
}

function Contact() {
  return <div>Esta es la página de Contacto</div>
}

function NotFound() {
  return <div>Página no encontrada</div>
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/home/id' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/nav' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
