const { Router } = require("express");
const axios = require("axios");
const { Op } = require("sequelize")
const { Country, Activity } = require("../db")


const router = Router();


const countriesApi = async () => {
    // console.log("Inicia request de info a la API externa")
    const response = await axios.get("https://restcountries.com/v3/all")

    const arrCountries = response.data.map(c => {
        // let languages="";
        // if (el.languages) { languages = Object.values(el.languages).join(", ") }
        // console.log(languages);
        
        const country ={
            id: c.cca3,
            name: c.name.common,
            capital: c.capital?c.capital[0]:"Capital not found",
            region: c.region,
            continent: c.continents[0],
            subregion: c.subregion?c.subregion:"Subregion not found",
            area: c.area,
            languages: c.languages?c.languages[0]:"Not found",
            population: c.population,
            flag: c.flags[1],
            // flagBig: el.flags[0]

        };
        return country
    });
    // console.log("Fin de request API externa")
    return arrCountries;
};

const getCountriesToDb = async () => {
    try {
        // console.log("Iniciandop consulta a la BD")
        const countries = await Country.findAll();
        // console.log("Consulta terminada")
        if(!countries.length){
            // console.log("cargando datos");
            const array = await countriesApi();
            // console.log("iniciando bulk");
            await Country.bulkCreate(array)
            // console.log("bulk terminado");
        }
    }catch(error){
        console.log(error)
    }
}

const loadCountries = async () => {
    await getCountriesToDb()
}
loadCountries();


router.get("/countries", async (req, res) => {
    
    const {name} = req.query
        
    try{
       if(!name){
            const countries = await Country.findAll({
                include:[{
                    model: Activity,
                    attributes: [ 'name', 'difficulty', 'duration', 'season',],
                    through: { attributes:[] }
                }]
            })
        
        if(countries){
            return res.status(200).json(countries);
        }else{
            return res.status(404).send("No se encontró paises");
        }
     } else {
        const country = await Country.findAll({
            where: {
                name: {[Op.iLike]: `%${name}%`} 
            },
            include: [{ 
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
        })  
        if(country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).send("País no encontrado");
        }
    }    
} catch (error) {
    console.log(error)
}
});




// router.get("/countries", async (req, res) => {
//     const { name } = req.query;
//     try{
//         await getCountriesToDb();
//         if (name){
//             let result = await Country.findAll({where:{name:{[Op.iLike]:`%${name}%`}}});
//             if(!result.length){ return res.status(200).send("El pais ingresado no existe")}
//             return res.status(200).json(result)
//         }
//     }catch(error){
//         console.log(error);
//     }

// })





router.get('/countries/:idPais', async (req, res) => {
    const idPais = req.params.idPais
    
    try {
        const country = await Country.findOne({
            where: {
                id: idPais.toUpperCase()
            }, 
            include: [{ 
                model: Activity,
                attributes: [ 'name', 'difficulty', 'duration', 'season',],
                through: { attributes: [] }
            }] 
          })
          if(country) {
            return res.status(200).json(country);
        } else {
            return res.status(404).send(`No se encuentran paises con el id ${idPais}`);
        } 
    } catch (error) {
        console.log(error)
    }
});






module.exports = router;