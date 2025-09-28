import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [people, setPeople] = useState([])

  useEffect(() => {
    fetch('/people')
      .then(res => res.json())
      .then(data => setPeople(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <div>
        <h1 className="main-title">Gym Management System</h1>
        <div className="people-container">
          <h2 className="section-title">Members Directory</h2>
          <div className="people-grid">
            {people.map((person, idx) => (
              <div key={idx} className="person-card">
                <h3 className="person-name">{person.name}</h3>
                <div className="person-details">
                  <p className="detail-item">
                    <span className="label">Phone:</span>
                    <span className="value">{person.phone}</span>
                  </p>
                  <p className="detail-item">
                    <span className="label">Address:</span>
                    <span className="value">{person.address}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default App