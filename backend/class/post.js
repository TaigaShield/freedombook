class Post {
    
    constructor(author, content, createdAt) 
    {
        if(!author || author.trim() === "")
            throw new Error("author cannot be empty");

        if(!content || content.trim() === "")
            throw new Error("content cannot be empty");
        
        if (!createdAt || !(createdAt instanceof Date))
            throw new Error("date must be of Date type");

        this.author = author;
        this.content = content;
        this.createdAt = createdAt;
    }
}


/**
 * @param {object} object
 * @return {Post}
 */
const Parse = (object) => new Post(object.author, object.content, object.createdAt);

module.exports = { Post, Parse };