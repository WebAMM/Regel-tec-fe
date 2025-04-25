import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomeLayout } from './components'
import { Home } from './pages'

function App() {
  return (
   <>
   <Routes>
      <Route path="/" element={<HomeLayout />}>
         <Route path="" element={<Home />} />
      </Route>
   </Routes>
   </>
  )
}

export default App
