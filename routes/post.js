const { Router } = require("express");
const post = require("../models/post");
const { title } = require("process");

Router.post('/',async (req,res) => {
         
    const post = new post({
        title: req.body.title,
        description: req.body.description
    });
    try {
        const savedPost = await post.save(); //Método que guarda en la BD
    res.json(savedPost);
    } catch (error) {
        res.json({message:error});
    }
});

//Bloque para mostrar solo un post por el ID
    Router.get('/postId', async (req,res) => {
        try {
            const post = await post.findById(req.params.postId); //Encontrar por ID
            res.json(post);
        } catch (error) {
            res.json({message: error});
        }
    });

//Bloque para borrar un post
    Router.delete('/postId', async (req,res) => {
        try {
            const removedPost = await post.remove({_id: req.params.postId}); // Borrar el post
            res.json(removedPost);
        } catch (error) {
            res.json({message: error});
        }
    });

//Bloque para actualizar un post
    Router.patch('/:postId', async (req,res) => {
        try {
            const updatePost = await post.updateOne( //Actualizar de uno en uno
                {_id: req.params.postId},
                {$set: {title: req.body.title}});
            res.json(updatePost);
        } catch (error) {
            res.json ({message: error});
        }
    });

    module.exports = Router; //Devuelve como módulo lo que se le asigna a route