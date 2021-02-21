import { Router } from 'express'
import Event from "../models/event.model.js"

const router = Router()
router.route('/').get((req, res) => {
    Event.find()
        .then(exercises=> res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const fieldQuestions = req.body.fieldQuestions;
    const responses = req.body.responses;
    const date = Date.parse(req.body.date);
    const password = req.body.name;

    const newEvent = new Event({
        name,
        date,
        fieldQuestions,
        responses,
        password
    });

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/getEvent/:name/:password').get((req, res) => {
    Event.findOne({ name: req.params.name })
        .then(event => {
            console.log(event)
            console.log(event.password)
            console.log(event.name)
            console.log(req.params.password)
            return (event.password !== req.params.password) ?
                res.status(401).json("Error: The password to this event is not correct.") :
                res.json(event)
        })
        .catch(err => res.status(400).json("No event named " + req.params.name + " found."))
});

router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            let temp = event.responses;
            temp.push("6031c27ffd8cda42961dad4a");
            event.responses = temp;
            console.log(event);
            event.save()
                .then(() => res.json('Event updated'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router;

