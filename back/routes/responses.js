import { Router } from 'express'
import Response from "../models/responseForm.model.js"

const router = Router()
router.route('/').get((req, res) => {
    Event.find()
        .then(exercises=> res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/getResponse').get((req, res) => {
    Response.find({ eventName: req.headers.name })
        .then(response => {
            /*for (var i = 0; i < response.length; i++) {
                if (response[i].eventPassword !== req.headers.password) {
                    res.status(401).json("Error: The password to this event is not correct.") ;
                    res.json(response);
                    res.end();
                    break;
                    }
            }*/ 
            res.json(response);
            res.end();
            
        })
        .catch(err => res.status(400).json("No event named " + req.headers.name + " found."))
});
router.route('/add').post((req, res) => {
    const userName = req.body.userName;
    const userEmail = req.body.userEmail;
    const Responses = req.body.Responses;
    const eventId = req.body.eventId;
    const eventName = req.body.eventName;
    const eventPassword = req.body.eventPassword;
    const newResponse = new Response({
        userName,
        userEmail,
        Responses,
        eventId,
        eventName,
        eventPassword,
    });

    newResponse.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:id').delete((req, res) => {
    Event.findByIdAndDelete(req.params.id)
        .then(() => res.json('Event deleted.'))
        .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/update/:id').post((req, res) => {
    Event.findById(req.params.id)
        .then(event => {
            event.username = req.body.username;
            event.description = req.body.description;
            event.duration = Number(req.body.duration);
            event.date = Date.parse(req.body.date);

            event.save()
                .then(() => res.json('Event updated'))
                .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
})

export default router;

