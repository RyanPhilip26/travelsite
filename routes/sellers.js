const express = require('express');
const seller = require('../models/seller');
const router = express.Router();
const Seller = require('../models/seller');

// all seller routes

router.get('/', async (req, res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i');
    }
    try{
        const sellers = await Seller.find(searchOptions)
        res.render('sellers/index', { sellers: sellers, searchOptions: req.query});
    }catch {
        res.redirect('/');
    }

    
})

// new seller route

router.get('/new', (req, res) => {
    res.render('sellers/new', { seller: new Seller()})
})

// Create Author
router.post('/', async (req, res) => {
    const seller = new Seller({
        name: req.body.name
    })
    try{
        const newSeller = await seller.save()
         // res.redirect(`sellers/ ${newSeller.id}`);
        res.redirect(`sellers`);
    } catch {
        res.render('sellers/new', {
            seller: seller,
            errorMessage: 'Error creating seller'
        })
    }
    })

module.exports = router;