const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php';

let listCocktails = [];
async function getCocktailsStartsWith(letter) {
  try{
    let response = await fetch(`${URL}?f=${letter}`);
    let cocktails = await response.json();
    return cocktails;
  }catch(e){
    console.log(e);
  }
  
}

getCocktailsStartsWith('g').then(cocktails => {
  listCocktails = cocktails;
  let strListCocktails = [];
  //console.log('** Cocktails beginning with G:**')
  listCocktails.drinks.forEach(drink => {
    strListCocktails.push(drink.strDrink);
  })
  //console.log("Total:" + listCocktails.drinks.length);
  console.log(strListCocktails.join(","));
  
  getExtravagantCocktails(listCocktails);
});

function getExtravagantCocktails(listCocktails){
  let extravagant = [];
  listCocktails.drinks.forEach(drink =>{
    if(drink.strIngredient4 != null)
      extravagant.push(drink);
  });
  //console.log('** Cocktails with more than 4 ingredients:**')
  extravagant.forEach(drink =>{
    //console.log(drink.strDrink)
  })
  readableList(extravagant);
}

function readableList(listCocktails){
  let list = [];
  let list2 = [];
  listCocktails.forEach(drink => {
    let listIngredientsQuantities = [];
    let ingredients = [];
    let quantities = [];
    for (const key in drink) {
      if(key.startsWith("strIngredient") && drink[key] != null){
         ingredients.push(drink[key]);   
      }
      if(key.startsWith("strMeasure") && drink[key] != null){
         quantities.push(drink[key]);   
      }
    }
    
    for(let i = 0; i < ingredients.length; i++){
      listIngredientsQuantities = [...listIngredientsQuantities, {name: ingredients[i], quantity: quantities[i]}]
    }
    list = [...list, {alcoholic: drink.strAlcoholic === "Alcoholic", name: drink.strDrink, id: drink.idDrink, ingredients:listIngredientsQuantities}];
       list2 = [...list2, {name: drink.strDrink, id: drink.idDrink, ingredients:listIngredientsQuantities}];
  })//For each
  //console.log(list2)
  separateAlcoholic(list)
}

function separateAlcoholic(listCocktails){
    let alcoholicDrinks = [];
    let nonAlcoholicDrinks = [];
    listCocktails.forEach(drinks =>{
      if(drinks.alcoholic){
        alcoholicDrinks = [...alcoholicDrinks, drinks];
      }else{
        nonAlcoholicDrinks = [...nonAlcoholicDrinks, drinks];
      }
    });
  
  console.log(nonAlcoholicDrinks)
}
