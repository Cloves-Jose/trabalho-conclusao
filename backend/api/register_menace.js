const axios = require("axios")

module.exports = app => {

    const date = new Date()

    /**
     * Puxa coordenadas de geolocatlização para exibir no mapa (web)
     * 
     * @param {*} req 
     * @param {*} res 
     */
    const getGeolocation = async (req, res) => {
        await app.db('register_menace')
            .select({
                latitude: 'latitude',
                longitude: 'longitude',
                created_at: 'created_at',
                updated_at: 'updated_at',
                deleted_at: 'deleted_at',
                title_menace: 'title_menace',
                menace_id: 'menace_id',
                description: 'description',
                location: 'location'
            })
            .then((geolocation) => {
                res.status(200).json(geolocation.map((item) => {
                    return {
                        type: "Feature",
                        properties: {
                            title: item.title_menace,
                            description: item.description,
                        },
                        date: {
                            created_at: item.created_at,
                            updated_at: item.updated_at,
                            deleted_at: item.deleted_at
                        },
                        geometry: {
                            coordinates: [item.longitude, item.latitude],
                            type: "Point"
                        },
                    }
                }))
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    }

    const deleteMenace = (req, res) => {
        app.db('register_menace')
            .where({ id: req.params.id })
            .update({ deleted_at: date.toISOString() })
            .then(() => res.status(204).send())
            .catch(err => res.status(500).json(err))
    }

    const getMenaceUsers = async (req, res) => {
        await app.db('register_menace')
            .select({
                latitude: 'latitude',
                longitude: 'longitude',
                created_at: 'created_at',
                updated_at: 'updated_at',
                deleted_at: 'deleted_at',
                title_menace: 'title_menace',
                location: 'location',
                id: 'id',
                description: 'description'
            })
            .then((menaceUsers) => {
                return res.status(200).json(menaceUsers.map((item) => {
                    return {
                        properties: {
                            id: item.id,
                            title: item.title_menace,
                            description: item.description,
                            location: item.location
                        },
                        date: {
                            created_at: item.created_at,
                            updated_at: item.updated_at,
                            deleted_at: item.deleted_at
                        },
                        geometry: {
                            coordinates: {
                                latitude: item.longitude, 
                                longitude: item.latitude
                            }
                        }
                    }
                }))
            })
            .catch((err) => {
                return res.status(400).json(err)
            })
    }

    /**
     * Registrando uma nova ameaça (mobile)
     * 
     * @param {req.body} req 
     * @param {res.status} res 
     * @returns 
     */
    const save = async (req, res) => {

        if(!req.body.age.trim()) {
            return res.status(400).send('Idade é um campo obrigatório')
        }

        if(!req.body.sex.trim()) {
            return res.status(400).send('Sexo é um campo obrigatório')
        }


        const location = await axios.get(`https://geocode.maps.co/reverse?lat=${req.body.latitude}&lon=${req.body.longitude}`)

        app.db('register_menace')
            .insert({
                age: req.body.age,
                sex: req.body.sex,
                reside_menace: req.body.reside_menace,
                title_menace: req.body.title_menace,
                description: req.body.description,
                image: req.body.image,
                latitude: req.body.latitude,
                longitude: req.body.longitude,
                location: location.data.address.road + " - " + location.data.address.suburb ,
                created_at: req.body.created_at,
                menace_id: req.body.menace_id
            })
            .then(_ => res.status(201).send())
            .catch(err => res.status(400).json(err))
    }

    return { save, getGeolocation, getMenaceUsers, deleteMenace }
}