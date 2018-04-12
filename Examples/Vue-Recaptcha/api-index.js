"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post('/signup', (req, res) => {
    if (!req.body.recaptchaToken) {
        return res.status(400).json({message: "recaptchaToken is required"});
    }
    if (!req.body.email || !req.body.password) {
        return res.status(400).json({message: "email and password are required."});
    }
    const verifyCaptchaOptions = {
        uri: "https://www.google.com/recaptcha/api/siteverify",
        json: true,
        form: {
            secret: process.env.CAPTCHA_SECRET,
            response: req.body.recaptchaToken
        }
    };

    request.post(verifyCaptchaOptions, (err, response, body) => {
        if (err) {
            return res.status(500).json({message: "oops, something went wrong on our side"})
        }

        if (!body.success) {
            return res.status(500).json({message: body["error-codes"].join(".")});
        }

        // Save the user to the database. At this point they have been verified.
        res.status(201).json({message: "Congratulations! We think you are human."});
    });
});