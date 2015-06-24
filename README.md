## Notes on MongoDB

### Start mongodb at terminal
sudo mongod

### At another terminal window:
> mongo
show current db
> db
test should be answer by default
> show dbs
> use <nameOfDb>
> show collections
> db.createCollection('users');
> show collections
> show dbs

> db.users.insert({ fname: 'John', lname: 'Doe', email: 'johndoe@mail.com', password: '12345'});
WriteResult({ "nInserted" : 1 })

> db.users.find();
{ "_id" : ObjectId("558a6a6adeef9159dc36c2a9"), "fname" : "john", "lname" : "Doe", "email" : "johndoe@mail.com", "password" : "12345" }

> db.users.find().pretty();
{
	"_id" : ObjectId("558a6a6adeef9159dc36c2a9"),
	"fname" : "john",
	"lname" : "Doe",
	"email" : "johndoe@mail.com",
	"password" : "12345"
}

> db.users.insert({ fname: 'Susan', lname: 'Doe', email: 'susandoe@mail.com', password: '12345'})

> db.users.find().pretty();
{
	"_id" : ObjectId("558a6a6adeef9159dc36c2a9"),
	"fname" : "john",
	"lname" : "Doe",
	"email" : "johndoe@mail.com",
	"password" : "12345"
}
{
	"_id" : ObjectId("558a6b0cdeef9159dc36c2aa"),
	"fname" : "Susan",
	"lname" : "Doe",
	"email" : "susandoe@mail.com",
	"password" : "12345"
}

Must specify with $set option if don't want remaining fields (not updated in the call) to be lost!!
> db.users.update( { email: 'susandoe@mail.com' }, { $set: { fname: 'Susan Mary' }} );
WriteResult({ "nMatched" : 1, "nUpserted" : 0, "nModified" : 1 })
> db.users.find().pretty();


### Note on npm dependency nightmare
http://stackoverflow.com/questions/18401606/npm-doesnt-install-module-dependencies

sudo rm -rf node_modules
sudo npm install


