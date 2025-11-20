const mongoose = require('mongoose');
const Account = require('../class/account');
const LINQ = require('linq')

const accountCollection = mongoose.model('Account', new mongoose.Schema({
  _id: String,
  password: String
}));

module.exports.Register = async function (accountObj)
{
  const accountToSave = Account.Parse(accountObj);

  await 
    new accountCollection({ 
      _id: accountToSave.id,
      password : accountToSave.password
    }).save();
}

module.exports.List = async function () 
{
  const accountsInDb = (await accountCollection.find());
  
  return LINQ.from(accountsInDb)
    .select(entry => ({ userId: entry._id}))
    .toArray();
}

module.exports.Get = async function (id)
{
  var accountsInDb = (await accountCollection.find({_id: id}));
  
  var foundAcc = LINQ.from(accountsInDb).firstOrDefault();
  
  return foundAcc ? { userId: foundAcc._id } : null;
}

module.exports.Delete = async function (id, password)
{
  const matchingAccountId = await accountCollection.findById(id);

  if (!matchingAccountId)
      throw Error(`Account '${id}' not found`);
  
  if (password != matchingAccountId.password)
    throw Error(`Wrong password ${password} != ${matchingAccountId.password}`);

  await accountCollection.deleteOne({_id: id, password: password});
}

module.exports.IsAuthorized = async function (id, password)
{
  const matchingAccounts = (await accountCollection.find({ _id: id, password: password}));
  
  return LINQ.from(matchingAccounts).firstOrDefault() != null;
}