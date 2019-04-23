require("dotenv").config();
const express = require('express');
const router = express.Router();

// Imports the Account Model (so we can manipulate data in the 'accounts' collection in the MongoDB)
const Account = require('../../models/Account');


// @route   GET request to the '/api/accounts' endpoint
// @desc    Retrieves all documents from the 'accounts' collection in the MongoDB
// @access  Public 
router.get('/', (req, res) => {
    Account
        .find()
        .sort({ createdDate: -1 }) // sorts all retrieved documents by createdDate; "-1" = descending order, "1" = ascending order 
        .then(accounts => {
            res.status(200).json(accounts);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});


// @route   POST request to the '/api/accounts' endpoint
// @desc    Creates a new 'accounts' document for the MongoDB
// @access  Public 
router.post('/', (req, res) => {
    // builds a new instance of 'Account' to add to the MongoDB using the 'Account' model
    const newAccount = new Account({
        role_id: req.body.role_id,
        email: req.body.email,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    }); 

     
    newAccount
        .save() // saves the new 'accounts' document in the MongoDB
        .then(account => {
            res.json(account);
        })
        .catch(err => {
            res.json(err);
        });
});


// @route   DELETE request to the 'api/accounts/:id' endpoint
// @desc    Deletes a specific account
// @access  Public 
router.delete('/:id', (req, res) => {
    Account
        .findById(req.params.id)
        .then(account => {
            account
                .remove()
                .then(() => {
                    res.status(202).json({ delete_success: true });
                })
                .catch(err => {
                    res.status(404).json({ error_message: "Something went wrong while trying to delete this account from the database" });
                });
        })
        .catch(err => {
            res.status(500).json({ error_message: "This account was not deleted because this account could not be found in the database" });
        });
});


// @route   PUT request to 'api/accounts/:id'
// @desc    Updates a specific document's information in the 'accounts' collection
// @access  Public 
router.put('/:id', (req, res) => {
    Account
        .findById(req.params.id)
        .then((account, err) => {
            if (!account) {

                res.status(404).json({ message: "The account was not updated because this account could not be found" });
            } else {

                (req.body.role_id) ? account.role_id = req.body.role_id : null;
                (req.body.email) ? account.email = req.body.email : null;
                (req.body.password) ? account.password = req.body.password : null;
                (req.body.first_name) ? account.first_name = req.body.first_name : null;
                (req.body.last_name) ? account.last_name = req.body.last_name : null;

                account
                    .save()
                    .then(account => {
                        res.status(202).json({ message: "This account was updated successfully" });
                    })
                    .catch(err => {
                        res.status(400).json({ message: "Something went wrong while trying to update this account" });
                    });
            }
        });
});



module.exports = router;