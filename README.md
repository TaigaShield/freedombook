<h1>Overview/Summary</h1>
Freedombook is an blogposting app for students. 
## Prerequisites - mongo - nodejs, npm # Backend ### start the mongodb server ``` podman run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_ROOT_USERNAME=user -e MONGO_INITDB_ROOT_PASSWORD=password -v mongodb_data:$pwd/data/db docker.io/library/mongo:latest ``` Connection string: mongosh mongodb://user:password@localhost:27017 ### calling endpoints using httpie http POST http://localhost:8000/api/accounts id=test password=test http DELETE http://localhost:8000/api/account/userId password=password http -a user:pass POST localhost:8000/api/posts content='your content here ' # freedombook

<h2>**Statement of the problem**</h2>  
Social media has become the norm overtaking a lot of physical activities. Being able to express emotions/venting has also been an issue for both students and the school with its reputation.
To counteract this issue before the freedomwall on the 3rd floor of magis was made for students to let out creativity & frustrations. these days especially after COVID, students nowadays have been more digital leaving
freedomwall to be barely used.

<h2>Solution</h2>
Online freedomwall or freedombook for short. a basic/simple express platform (similar to twitter)
Students want something simple and freeing while institutions would like to keep things within & potentially solve the issue students have. 
hence students can now interact on freedombook where rules are a lot more lax (still follows student handbook).
login, post comment & like. 
