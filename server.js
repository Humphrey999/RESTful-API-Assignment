    const express = require('express');
    const fs = require('fs');
    const app = express();
    const PORT = 5000;
    app.get('/', (req, res) => {
        res.send('Welcome to the API!'); 
    });
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });



    const getUsersData = () => {
        const data = fs.readFileSync('./users.json');
        return JSON.parse(data);
    };

    app.get('/users', (req, res) => {
        const users = getUsersData();
        res.json(users);
    });

    app.get('/users/:id', (req, res) => {
        const users = getUsersData();
        const user = Object.values(users).find(u => u.id === parseInt(req.params.id));
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "There is no user with this id" });
        }
    });

    app.get('/users/profession/:profession', (req, res) => {
        const users = getUsersData();
        const result = Object.values(users).filter(u => u.profession === req.params.profession);
        if (result.length > 0) {
            res.json(result);
        } else {
            res.status(404).json({ message: "There is no user with this profession" });
        }
    });

    app.get('/users/name/:name', (req, res) => {
        const users = getUsersData();
        const user = Object.values(users).find(u => u.name === req.params.name);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ message: "THere is no user with this name" });
        }
    });