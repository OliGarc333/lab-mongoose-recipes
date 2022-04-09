const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create(
      {
        title: "Franconian Schäufele",
        level: "Amateur Chef",
        ingredients: [
          '1½ kg	Pork shoulder',
          '1	Soup greens (2 carrots, celery, leek, parsley)',
          '2	onion',
          '4	carnation',
          '2	Garlic cloves',
          '1 teaspoon	Caraway seeds',
          '½ tsp	Pepper, black, ground', 
          '½ tsp	Marjoram, dried',
          '1 pinch	nutmeg',
          '1 branch/s	rosemary (small sprig)',
          '1 liter	Meat broth, instant',
          '200ml	Beer, strong, light or semi-dark, not bitter (no pilsner)'
        ],
        cuisine: 'German',
        dishType: 'main_course',
        duration: 130,
        
      }
    )
    { timestamps: true }
  })
  .then((recipe) =>{
    console.log(`Created a recipe with name: ${recipe.title}`);
    return Recipe.insertMany(data);
  })
  .then((recipes) =>{
    console.log(`Added multiple recipes: `, recipes);
    return Recipe.findOneAndUpdate(
      {title: 'Rigatoni alla Genovese'},
      {duration: 100 },
      { new: true }
    );
  })
  .then((recipe) =>{
    console.log(`The recipe has been updated!`, recipe);
    return Recipe.deleteOne({title: 'Carrot Cake'});
  })
  .then((recipe) =>{
    console.log(`The recipe has been deleted!`);
    return mongoose.disconnect();
  })
  .then(()=>{
    console.log(`You are no longer connected to MongoDB!`);
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
