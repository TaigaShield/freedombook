class Account {
  
  constructor(id, password) 
  {
    if (!id || id.trim() === "")
      throw new Error("id cannot be empty");

    if (!password || password.trim() === "")
      throw new Error("password cannot be empty");

    this.id = id;
    this.password = password;
  }
}

/**
 * @param {object} object
 * @return {Account}
 */
const Parse = (object) => new Account(object.id ?? object._id, object.password);

module.exports = { Account, Parse };