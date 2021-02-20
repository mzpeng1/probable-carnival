import { Router } from 'express'
import Matching from "../models/matching.model.js"

const router = Router()
router.route('/getMatch/:id').get((req, res) => {
    Matching.findById(req.params.id)
        .then(matching => res.json(matching))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const matchings = req.body.matchings;
    const newMatching = new Matching({
        matchings: matchings
    })

    newMatching.save().then(() => res.json("Matching Added"))
        .catch(err => res.status(400).json("Error: " + err));
})

export default router;

