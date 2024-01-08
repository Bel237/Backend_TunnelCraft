require('dotenv').config()
const express=require('express');
const mongoose=require('mongoose')
const db=require('./db')
const bodyParser = require('body-parser');
const cors=require('cors')
const auth=require('./routes/auth-routes')
const token=require('./routes/token')
const facturation=require('./routes/facturation')
const PORT=process.env.PORT

const app=express();
app.use(cors())
app.use(bodyParser.json());
app.use('/auth',auth)
app.use('/payement',facturation)
app.use(token)


//connexion à la bse de données
mongoose.connect(db.URL,{useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log('Connecté à MongoDB'))
.catch(err=>console.log('Erreur de connexion à MongoDb',err))

//route par défaut
app.get('/',(req,res)=>{
    res.send('API d\'authnetification')
});

//démarrage du serveur sur le port 8080
app.listen(PORT,()=>{
    console.log('serveur lancé sur le port',PORT);
})