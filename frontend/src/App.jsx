import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function RegisterCustomer({ onRegister }) {
  const [form, setForm] = useState({ name: '', phone: '', address: '' })
  const [error, setError] = useState('')

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) {
        const err = await res.json()
        setError(err.error || 'Registration failed')
        return
      }
      const data = await res.json()
      setForm({ name: '', phone: '', address: '' })
      onRegister(data)
    } catch (err) {
      setError('Network error')
    }
  }

  return (
    <form className="register-form" onSubmit={handleSubmit}>
      <h2>Register New Customer</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
        required
      />
      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        required
      />
      <button type="submit">Register</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

function App() {
  const [people, setPeople] = useState([])

  const fetchPeople = () => {
    fetch('/people')
      .then(res => res.json())
      .then(data => setPeople(data))
      .catch(err => console.error(err))
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  const handleRegister = () => {
    fetchPeople()
  }

  return (
    <>
      <div>
        <h1 className="main-title">Gym Management System</h1>
        <RegisterCustomer onRegister={handleRegister} />
        <div className="people-container">
          <h2 className="section-title">Members Directory</h2>
          <div className="people-grid">
            {people.map((person, idx) => (
              <div key={person.id || idx} className="person-card">
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