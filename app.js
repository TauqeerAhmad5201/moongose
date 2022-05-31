const mongoose = require('mongoose');
var express = require('express')
var bodyParser = require('body-parser')
const port = 3000
main().catch(err => console.log(err));

var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/sign', (req, res) => {
  res.sendFile(__dirname + '/public/html/signin.html')
})

async function main() {
  await mongoose.connect('mongodb+srv://tauqeerahmad:mantasha786@practicecluster.kqrhg.mongodb.net/?retryWrites=true&w=majority');

  console.log('We are connected!');
  const kittySchema = new mongoose.Schema({
    name: {
      first : String,
      last : String 
    }
  });
  console.log(kittySchema.path('name'))
  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };
  const Kitten = mongoose.model('Kitten', kittySchema); //model
  // mongoose.model(modelName, schema):
  app.post('/sign', (req, res) => {
    const silence = new Kitten({name : { first: req.body.name, last : req.body.password }});
    console.log(silence.name); //
    silence.save();
    res.send('Thanks for submitting')
  })
  
  // silence.speak();
  

  // concept of await async
  const kittens = await Kitten.find();
  // console.log(kittens);
  const datafind = await Kitten.find({ _id : "62941771affe10bf448ce739"});
  console.log(datafind)
}
//express method to listen at certain port
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})