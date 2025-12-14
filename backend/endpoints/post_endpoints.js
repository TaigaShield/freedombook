const PostsRepository = require('../db/post_collection.js');
const AccountsRepository = require('../db/account_collection');
const {ReactEnum} = require('../class/reacts.js');

const EXPRESS = require('express');
module.exports.PostsAPI = EXPRESS();
this.PostsAPI.use(EXPRESS.json());

const {BAuth, AssertParams} = require(`./request_helper_methods.js`);


this.PostsAPI.post('/api/posts', async (req, res) => 
{
    try{
        AssertParams(req.body, 'content');
        const postId = await PostsRepository
            .Create(req.body, BAuth(req));
        
        return res.status(201).send(`Created post id:${postId}`);
    } catch (error) {
        return res.status(400).send({error: `${error}`});
    }
});

this.PostsAPI.get('/api/posts', async (req, res) => 
{
    try
    {
        const creds = BAuth(req);
        const isAuthorized = await AccountsRepository.IsAuthorized(creds.username, creds.password);
        if (!isAuthorized)
            res.status(401).send({message: "Wrong username or password"});

        const posts = await PostsRepository.List(req.query.author);
        res.status(200).send(posts);
    } catch (error) {
        return res.status(400).send({error: `${error}`});
    }
});

this.PostsAPI.get('/api/post/:id', async (req, res) => 
{
    try {
        const post = await PostsRepository.Get(req.params.id);
        res.status(200).send(post);
    } catch (error) {
        return res.status(400).send({error: `${error}`});
    }
});


this.PostsAPI.delete('/api/post/:id', async (req, res) => 
{   
    try
    {
        await PostsRepository.Delete(req.params.id, BAuth(req));
        res.status(200).send(`post:${req.params.id} deleted.`);
    } catch (error) {
        res.status(400).send(error);
    }
});

this.PostsAPI.post('/api/post/:id/reacts', async (req, res) => {
    try
    {
        switch(req.body.react)
        {
            case ReactEnum.LIKE:
                await PostsRepository.LikePost(BAuth(req), req.params.id);
                break;
            
            case ReactEnum.DISLIKE:
                await PostsRepository.DislikePost(BAuth(req), req.params.id);
                break;
            
            default:
                throw new Error("Invalid reaction");
        }

        res.status(200).send(`${req.body.react} @ post:${req.params.id}.`);
    } catch (error) {
        res.status(400).send(error);
    }
});

this.PostsAPI.post('/api/post/:id/comments', async (req, res) => 
{
    try
    {
        AssertParams(req.body, 'comment');
        await PostsRepository.AddComment(BAuth(req), req.params.id, req.body.comment)
        res.status(200).send(`commented on post:${req.params.id}.`);
    } catch (error) {
        res.status(400).send(error);
    }
});

