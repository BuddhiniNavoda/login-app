import { Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage.tsx'
import TokenPage from './pages/TokenPage.tsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/token" element={<TokenPage />} />
    </Routes>
  )
}

export default App
