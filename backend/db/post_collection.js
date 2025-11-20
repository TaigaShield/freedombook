
const AccountsRepository = require('./account_collection');
const { randomUUID } = require("crypto");
const mongoose = require('mongoose');
const Post = require('../class/post');
const LINQ = require('linq');

const postCollection = mongoose.model(
  'Post', 
  new mongoose.Schema({
    _id: String,
    author: String,
    content: String,
    createdAt: Date,
    reacts: {
      likers: {
        type: [String], 
        validate: arr => arr.length === new Set(arr).size
      }
    },
    comments: [{ 
      commentor: String,
      content: String
    }]
  }));

/**
 * @param {object} postObj
 * @param {object} creds
 */
module.exports.Create = async function (postObj, creds)
{
  const isAuthorized = await AccountsRepository
          .IsAuthorized(creds.username, creds.password);

  if(!isAuthorized)
    throw new Error("Unauthorized to post");

  postObj.author = creds.username;
  postObj.createdAt = new Date(Date.now());

  const postToSave = Post.Parse(postObj);
  
  const postId = randomUUID().replace(/-/g, "");
  await 
    new postCollection({ 
      _id: postId,
      author: postToSave.author,
      content: postToSave.content,
      createdAt: postToSave.createdAt
    }).save();

  return postId;
}

module.exports.List = async function (userFilter) 
{
  const postInDB = await postCollection
    .find({ author: { $regex: new RegExp(userFilter, "i") } });
  
  return LINQ.from(postInDB)
    .select(entry => ({ 
        postId: entry._id, 
        author: entry.author, 
        content: entry.content,
        createdAt: new Date(entry.createdAt),
        likes: entry.reacts.likers,
        comments: entry.comments
      }))
    .toArray();
}

module.exports.Get = async function (postId) 
{
  const post = await postCollection.findById(postId);  

  if (!post)
    throw new Error(`post:${postId} not found`);

  return ({
    postId: post._id, 
    author: post.author, 
    content: post.content,
    createdAt: new Date(post.createdAt),
    likes: post.reacts.likers,
    comments: post.comments
  });
}

/**
 * @param {string} postId
 * @param {object} creds
 */
module.exports.Delete = async function (postId, creds) 
{
  const postToDelete = await postCollection.findById(postId);
  if (!postToDelete)
    throw new Error(`post:${postId} not found`);

  const isAuthorized = await AccountsRepository
      .IsAuthorized(creds.username, creds.password)
      && postToDelete.author == creds.username;
  
  if(!isAuthorized)
    throw Error("Unauthorized to delete post");

  await postCollection.findByIdAndDelete(postId);
}

// LIKE/DISLIKE shit

module.exports.LikePost = async function (creds, postId) 
{
    const isAuthorized = await AccountsRepository
        .IsAuthorized(creds.username, creds.password);
    
    if(!isAuthorized) throw new Error("Unauthorized");

    await postCollection.findOneAndUpdate(
      { _id: postId },
      { $addToSet: { "reacts.likers": creds.username }},
      { new: true }
    );  
}

module.exports.DislikePost = async function (creds, postId) 
{
    const isAuthorized = await AccountsRepository
        .IsAuthorized(creds.username, creds.password);
    
    if(!isAuthorized) throw new Error("Unauthorized");

    await postCollection.findOneAndUpdate(
      { _id: postId },
      { $pull: { "reacts.likers": creds.username }},
      { new: true }
    );  
}

module.exports.AddComment = async function (creds, postId, comment)
{
    const isAuthorized = await AccountsRepository
        .IsAuthorized(creds.username, creds.password);
    
    if(!isAuthorized) throw new Error("Unauthorized");

    await postCollection.updateOne(
      { _id: postId },
      { 
        $push: { 
          comments: { 
            commentor: creds.username, 
            content: comment 
          }
        } 
      });

}