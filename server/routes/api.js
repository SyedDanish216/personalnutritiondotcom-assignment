const express = require('express');
const router = express.Router();
const Counter = require('../model/Counter');





// Fetch all counters
router.get('/counters', async (req, res) => {
    try {
      const counters = await Counter.find({});
      res.json(counters);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });


  
// Create a new counter
router.post('/counters', async (req, res) => {
  const { name} = req.body;
  const counter = await Counter.findOne({name});
  if(counter!==null)
  res.status(500).json({error:"The counter with this name already present"});
  try {
   
    const newCounter = new Counter({ name, value: 0 });
    await newCounter.save();
    res.status(201).json(newCounter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Increment a counter
router.put('/counters/:id/increment', async (req, res) => {
  try {
    const counter = await Counter.findById(req.params.id);
    counter.value++;
    await counter.save();
    res.json(counter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Decrement a counter
router.put('/counters/:id/decrement', async (req, res) => {
  try {
    const counter = await Counter.findById(req.params.id);
    counter.value--;
    await counter.save();
    res.json(counter);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});



// Delete a counter
router.delete('/counters/:id', async (req, res) => {
    try {
      await Counter.findByIdAndRemove(req.params.id);
      res.status(204).end();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;