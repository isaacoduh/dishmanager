const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');

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
});

app.delete('/api/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    // TODO: find and delete dish by id
});

app.put('/api/dishes/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const {name, description, price} = req.body
    // TODO: find and update dish by id 
});

app.listen(3000, () => {
    console.log('Server is up on PORT 3000');
});