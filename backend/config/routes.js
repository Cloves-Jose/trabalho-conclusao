const fileUpload = require('express-fileupload')

module.exports = app => {

    app.use(
        fileUpload({
            limits: {
                fileSize: 10000000,
            },
            abortOnLimit: true,
        })
    )

    /**
     * User
     */
    app.post('/signup', app.api.user.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    /**
     * Menace
     */
    app.post('/register', app.api.menace.save)
    app.get('/getMenace', app.api.menace.getMenace)
    app.delete('/deleteMenace/:id', app.api.menace.deleteMenace)
    app.put('/update/:id', app.api.menace.updateMenace)
    // app.post('/upload', app.api.menace.uploadImage)


    /**
     * Register menace
     */
    app.post('/registerMenace', app.api.register_menace.save)
    app.get('/getGeolocation', app.api.register_menace.getGeolocation)
    app.get('/menaceUsers', app.api.register_menace.getMenaceUsers)
    app.delete('/deleteMenaceUser/:id', app.api.register_menace.deleteMenace)

    /**
     * Category
     */
    app.post('/registerCategory', app.api.category.save)
    app.get('/getCategory', app.api.category.getCategory)
    app.put('/updateCategory/:id', app.api.category.updateCategory)
    app.delete('/deleteCategory/:id', app.api.category.deleteCategory)
}