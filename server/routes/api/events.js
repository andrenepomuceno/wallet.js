const express = require('express');
const router = express.Router();

const Event = require('../../models/Event');

router.get('/', (req, res) => {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(404).json({ noeventsfound: 'not found' }));
});

router.get('/:id', (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(404).json({ noeventfound: 'not found' }));
});


router.post('/', (req, res) => {
    Event.create(req.body)
        .then(event => res.json({ msg: 'success' }))
        .catch(err => res.status(400).json({ error: 'failed to add event' }));
});

router.put('/:id', (req, res) => {
    Event.findByIdAndUpdate(req.params.id, req.body)
        .then(event => res.json({ msg: 'success' }))
        .catch(err =>
            res.status(400).json({ error: 'update failed' })
        );
});

router.delete('/:id', (req, res) => {
    Event.findByIdAndRemove(req.params.id, req.body)
        .then(event => res.json({ msg: 'success' }))
        .catch(err => res.status(404).json({ error: 'not found' }));
});

module.exports = router;