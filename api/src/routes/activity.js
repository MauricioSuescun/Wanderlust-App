const { Router } = require('express');
const { Activity, Country } = require('../db.js');
const { Op } = require("sequelize")


const router = Router();

// Ruta para desplegar actividades

router.get('/activities', async (req, res) => {
    try {
        let result = await Activity.findAll();
        if (!result.length) {
            return res.status(200).send("No activities found")
        }
        return res.status(200).json(result)
    } catch (error) {
        console.log(error)
    }
});

router.post("/activities" , async (req, res) =>{
    try{
        const {name, difficulty, duration, season, countries} = req.body
        if(name && difficulty && duration && season && countries){
            const activity = await Activity.create({
                name,
                difficulty,
                duration,
                season,
            })
            countries.forEach(async (c) => {
                const country = await Country.findOne({ where: { name: c } }); 
                if (country) { await activity.addCountry(country) };            
            });
            return res.status(201).send("Activity created")
        }else{
            return res.status(404).json("Incomplete form")
        }
    }catch (error) {
        console.log(error)

    }
})

module.exports = router;