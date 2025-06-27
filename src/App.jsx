import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Header from './components/Header'
import Hero from './components/Hero'
import Features from './components/Features'
import Services from './components/Services'
import Footer from './components/Footer'
import Login from './Login'
import SpaceBackground from './components/SpaceBackground'
import Signup from './Signup'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const renderPage = () => {
    switch(currentPage) {
      case 'login':
        return <Login onBack={() => setCurrentPage('home')} />
      case 'signup':
        return <Signup onLogin={() => setCurrentPage('login')} />
      case 'home':
      default:
        return (
          <>
            <Hero />
            <Features />
            <Services />
            <Footer />
          </>
        )
    }
  }

  return (
    <div className="text-white min-vh-100">
      <SpaceBackground />
      <Header 
        onLoginClick={() => setCurrentPage('login')}
        onSignupClick={() => setCurrentPage('signup')}
      />
      {renderPage()}
    </div>
  )
}

export default App