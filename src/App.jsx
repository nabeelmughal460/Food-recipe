import React, { useState, useEffect } from 'react'
import Mainpage from './Components/Mainpage'
import { Routes, Route, useLocation } from 'react-router-dom'
import Mealinfo from './Components/Mealinfo'
import './App.css';

const foodImages = [
  "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=1600&q=80",
  "https://images.unsplash.com/photo-1574653853027-5382a3d23a15?w=1600&q=80",
  "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1600&q=80",
  "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=1600&q=80",
  "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=1600&q=80",
  "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?w=1600&q=80",
]

const App = () => {
  const [bgIndex, setBgIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const location = useLocation()

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setBgIndex(prev => (prev + 1) % foodImages.length)
        setFade(true)
      }, 600)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const showBg = location.pathname === '/'

  return (
    <div style={{ position: 'relative', minHeight: '100vh' }}>

      {/* Background Slider — only on homepage */}
      {showBg && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          overflow: 'hidden',
        }}>
          {/* Sliding image */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${foodImages[bgIndex]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: fade ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }} />

          {/* Dark overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.7) 100%)',
          }} />

          {/* Dot indicators */}
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            zIndex: 2,
          }}>
            {foodImages.map((_, i) => (
              <div
                key={i}
                onClick={() => setBgIndex(i)}
                style={{
                  width: i === bgIndex ? '24px' : '8px',
                  height: '8px',
                  borderRadius: '4px',
                  background: i === bgIndex ? '#ff6b35' : 'rgba(255,255,255,0.5)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Page content sits above the background */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/:mealid' element={<Mealinfo />} />
        </Routes>
      </div>

    </div>
  )
}

export default App