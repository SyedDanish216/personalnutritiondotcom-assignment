import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [counters, setCounters] = useState([]);
  const [newCounterName, setNewCounterName] = useState('');

  useEffect(() => {
    // Fetch counters from the server
    fetchCounters();
  }, []);

  const fetchCounters = () => {
    axios.get('/api/counters')
      .then((response) => {
        setCounters(response.data);
      })
      .catch((error) => {
        console.error('Error fetching counters:', error);
      });
  };

  const createCounter = () => {
    axios.post('/api/counters', { name: newCounterName })
      .then((response) => {
        setCounters([...counters, response.data]);
        setNewCounterName('');
      })
      .catch((error) => {
        console.error('Error creating counter:', error);

      });
  };

  const incrementCounter = (id) => {
    axios.put(`/api/counters/${id}/increment`)
      .then((response) => {
        const updatedCounters = counters.map((counter) => {
          if (counter._id === response.data._id) {
            return response.data;
          }
          return counter;
        });
        setCounters(updatedCounters);
      })
      .catch((error) => {
        console.error('Error incrementing counter:', error);
      });
  };

  const decrementCounter = (id) => {
    axios.put(`/api/counters/${id}/decrement`)
      .then((response) => {
        const updatedCounters = counters.map((counter) => {
          if (counter._id === response.data._id) {
            return response.data;
          }
          return counter;
        });
        setCounters(updatedCounters);
      })
      .catch((error) => {
        console.error('Error decrementing counter:', error);
      });
  };

  const removeCounter = (id) => {
    axios.delete(`/api/counters/${id}`)
      .then(() => {
        const updatedCounters = counters.filter((counter) => counter._id !== id);
        setCounters(updatedCounters);
      })
      .catch((error) => {
        console.error('Error removing counter:', error);
      });
  };

  return (
    <div className="App">
      <h1 className="app-title">Real-time Counter App</h1>
      <div className="counter-create">
        <input
          type="text"
          placeholder="Enter counter name"
          value={newCounterName}
          onChange={(e) => setNewCounterName(e.target.value)}
          className="input-text"
        />
        <button onClick={createCounter} className="create-button">Create Counter</button>
      </div>
      <div className="counters">
      
        {counters.map((counter) => (
          <div key={counter._id} className="counter-card">
            <h2 className="counter-name">{counter.name}</h2>
            <p className="counter-value">Count: {counter.value}</p>
            <div className="button-container">
              <button onClick={() => incrementCounter(counter._id)} className="increment-button">+</button>
              <button onClick={() => decrementCounter(counter._id)} className="decrement-button">-</button>
              <button onClick={() => removeCounter(counter._id)} className="remove-button">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;