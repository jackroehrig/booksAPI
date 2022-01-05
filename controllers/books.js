// DEPENDENCIES
const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const db = require('../models')
const cors = require('cors')

// CONFIGURATION
const router = express.Router()
router.use(bodyParser.urlencoded({ extended: false }))
router.use(methodOverride('_method'))
// router.use(cors())

// ROUTES
router.get('/', (req, res) => {
    db.Book.find()
    .then((books) => {
        res
            .status(200)
            .json(books)
    })
    .catch(err => {
        console.log(err)
        res
            .status(404)
            .json({message: 'There was an error!'})
    })
})

router.post('/', (req, res) => {
    db.Book.create(req.body)
    .then(() => {
        db.Book.find()
        .then((books) => {
            res
                .status(201)
                .json(books)

        })
        .catch(err => {
            console.log(err)
            res
                .status(404)
                .json({message: 'There was an error!'})
        })
    })
    .catch(err => {
        console.log(err)
        res
            .status(404)
            .json({message: 'There was an error!'})
    })
})

router.get('/:id', (req, res) => {
    db.Book.findById(req.params.id)
    .then((book) => {
        res
            .status(200)
            .json(book)
    })
    .catch(err => {
        console.log(err)
        res
            .status(404)
            .json({message: 'There was an error!'})
    })
})

router.put('/:id', (req, res) => {
    db.Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .then(updatePlace => {
        res
            .status(200)
            .json(updatePlace)
    })
    .catch(err => {
        console.log(err)
        res
            .status(404)
            .json({message: 'There was an error!'})
    })
})

router.delete('/:id', (req, res) => {
    db.Book.findByIdAndDelete(req.params.id)
    .then(deletedPlace => {
        res
            .status(200)
            .json({message: 'book successfully deleted'})
    })
    .catch(err => {
        console.log(err)
        res
            .status(404)
            .json({message: 'There was an error!'})
    })
})

// EXPORT
module.exports = router