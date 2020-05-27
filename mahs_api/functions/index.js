const functions = require('firebase-functions');
const admin = require('firebase-admin');

var serviceAccount = require("./permissions.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://mahs-6b98c.firebaseio.com"
});


const express = require('express');
const app = express();
const db = admin.firestore();

const cors = require('cors');
app.use(cors({origin:true}));


//routes
app.get('/hello-world', (req, res) => {
    return res.status(200).send('hello world')
});

//create
app.post('/api/create', (req, res) => {
    (async () => {
        try {
            await db.collection('posts').doc('/' + req.body.id + '/')
            .create({
                title: req.body.title,
                description: req.body.description,
                author: req.body.author
            })

            return res.status(200).send();
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//read by id
app.get('/api/read/:id', (req, res) => {
    (async () => {
        try {
            const document = db.collection('posts').doc(req.params.id);
            let post = await document.get();
            let response = post.data();

            return res.status(200).send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});

//read all
app.get('/api/read', (req, res) => {
    (async () => {
        try {
            let query = db.collection('posts');
            let response = [];

            await query.get().then(querySnapshot => {
                let docs = querySnapshot.docs;

                for (let doc of docs) {
                    const selectedItem = {
                        id: doc.id,
                        title: doc.data().title,
                        description: doc.data().description,
                        author: doc.data().author,
                    };
                    response.push(selectedItem);
                }
                return response;
            })

            return res.status(200).send(response);
        }
        catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    })();
});


//update

//delete

//Export the api to firebase cloud functions
exports.app = functions.https.onRequest(app);