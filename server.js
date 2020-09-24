const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const dish = require('./models/dish');

const app = express();

app.use(bodyParser.json());
// Static files

app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/dishes', (req, res) => {
    // TODO: retrieve all available dishes and send via response object
    return db.Dish.findAll()
        .then((dishes) => res.send(dishes))
        .catch((err) => {
            console.log('There was an issue retrieving dishes', JSON.stringify(err))
            return res.send(err)
        });
} );

app.post('/api/dishes', (req, res) => {
    // TODO: create a dish
    const {title, description, price} = req.body;
    return db.Dish.create({title, description, price})
        .then((dish) => res.send(dish))
        .catch((err) => {
            console.log('***There was an error creating a new dish', JSON.stringify(err))
            return res.send(err)
        });
});

app.delete('/api/dishes/:id', (req, res) => {
    // TODO: find and delete dish by id
    const id = parseInt(req.params.id);
    return db.Dish.findByPk(id)
    .then((dish) => dish.destroy())
    .then(() => res.send({id}))
    .catch((err) => {
        console.log('***Error Deleting dish information', JSON.stringify(err))
        res.status(400).send(err)
    })
});

app.put('/api/dishes/:id', (req, res) => {
    // TODO: find and update dish by id 
    const id = parseInt(req.params.id);
    return db.Dish.findByPk(id)
    .then((dish) => {
        const {title, description, price} = req.body
        return dish.update({title, description, price})
            .then(() => res.send(dish))
            .catch((err) => {
                console.log('***Error Updating dish information', JSON.stringify(err))
                res.status(400).send(err)
            })
    })

});

app.listen(3000, () => {
    console.log('Server is up on PORT 3000');
});