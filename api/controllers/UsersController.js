const UsersQueries = require('../queries/UseresQueries');
const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = (req, res, next) => {
    pool.query(UsersQueries.getsUsers, (error, results) => {
        if(error) {
            console.log(error)
        }
        if(!results.rows.length) {
            res.status(200).json({
                message: "No users found"
            })
        } else {
            res.status(200).json({
                message: 'Found all Users',
                results: results.rows
            });
        }
    });
}

const getUser = (req, res, next) => {
    const userId = req.params.userId;
    pool.query(UsersQueries.getUser, [userId], (error, results) => {
        if(error) {
            console.log(error)
        }
        if(!results.rows.length) {
            res.status(200).json({
                message: "No user found"
            })
        } else {
            res.status(200).json({
                message: 'Found all User',
                results: results.rows
            });
        }
    })
}

const signUp = (req, res, next) => {
    const {name, email, password, residence} = req.body;
    pool.query(UsersQueries.checkIfEmailExists, [email], (error, results) => {
        if(results.rows.length) {
            res.status(409).json({
                message: 'The email submitted is already assigned to a user.'
            });
        } else {
            bcrypt.hash(password, 10, (error, hash) => {
                if(error) {
                    console.log(error);
                    res.status(500).json({
                        message: error
                    })
                }
                const token = jwt.sign({
                    name,
                    email
                }, process.env.JWT_KEY || "secret", 
                {
                    expiresIn: "1h"
                })
                pool.query(UsersQueries.addUser, [name, email, hash, residence], (error, results) => {
                    if(error) {
                        console.log(error)
                    }
                    res.status(201).json({
                        message: "User has been added successfully.",
                        token
                    })
                })
            })
        }

    })
}

const signIn = (req, res, next) => {
    const {email, password} = req.body;
    pool.query(UsersQueries.checkIfEmailExists, [email], (error, results) => {
        if(error) {
            console.log(error)
        }
        if(!results.rows.length) {
            res.status(404).json({
                message: 'Authentication failed. Try again.'
            })
        } else {
            bcrypt.compare(password, results.rows[0].password, (error, results) => {
                if(error) {
                    console.log(error)
                } 
                if(results) {
                    res.status(200).json({
                        message: 'You have been successfully signed in.'
                    })
                }
            } )
        }
    })
    
}

const deleteUser = (req, res, next) => {
    const userId = req.params.userId;
    pool.query(UsersQueries.deleteUser, [userId], (error, results) => {
        if(error) {
            console.log(error);
        }
        res.status(200).json({
            message: "User account deleted successfully."
        });
    });
}

module.exports = {
    getUsers,
    getUser,
    signUp,
    deleteUser,
    signIn
}