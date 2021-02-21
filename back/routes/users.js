import { Router } from 'express'
import User from '../models/user.model.js'
import Event from '../models/event.model.js'

const router = Router()
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
})

router.route('/getUser/:email').get((req, res) => {
    User.find({ email: req.params.email })
        .then(user => res.json(user))
        .catch(err => res.status(400).json("Error: " + err));
})

router.route('/add').post((req, res) => {
    const displayName = req.body.displayName;
    const email = req.body.email;
    const photo = req.body.photo;
    const events = [];
    const newUser = new User({displayName, email, photo, events});

    newUser.save().then(() => {
        res.json('User added!')
    }).catch(err => res.status(400).json('Error: ' + err));
})

router.route('/:user/update/:id').post((req, res) => {
    User.findById(req.params.user)
        .then((user) => {
            user.displayName = user.displayName;
            user.email = user.email;
            user.photo = user.photo;
            let temp = user.events;
            let alreadyExists = false;
            for (let i = 0; i < temp.length; i++) {
                if (temp[i] == req.params.id) {
                    alreadyExists = true;
                }
            }
            if (!alreadyExists) {
                temp.push(req.params.id);
            }
            user.events = temp;
            console.log(req.params.id);
            console.log(user.events);
            user.save()
                .then(() => res.json("Updated User!"))
                .catch((err) => res.status(400).json("Error: " + err))
        })
        .catch((err) => res.status(400).json("Error: " + err))
})



export default router;