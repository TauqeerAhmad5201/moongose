const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://tauqeerahmad:mantasha786@practicecluster.kqrhg.mongodb.net/?retryWrites=true&w=majority');

  console.log('We are connected!');
  const kittySchema = new mongoose.Schema({
    name: String
  });

  kittySchema.methods.speak = function speak() {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };
  const Kitten = mongoose.model('Kitten', kittySchema); //model

  const silence = new Kitten({ name: 'Silence' });
  console.log(silence.name); //
  silence.speak();
  silence.save();

  // concept of await async
  const kittens = await Kitten.find();
  console.log(kittens);
}