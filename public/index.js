const makeRequest = function(url, callback){
  const request = new XMLHttpRequest();

  request.open("GET", url);

  request.addEventListener("load", callback);

  request.send();
};

const requestComplete = function(){
  if(this.status !== 200) return;
  const jsonString = this.responseText;
  const beers = JSON.parse(jsonString);
  populateSelect(beers);
  getBeer(beers);
}

const populateList = function(beers){
  const select = document.getElementById("beers-list")
  for (let beer of beers){
    const li = document.createElement("li");
    li.innerText = beer.name;
    select.appendChild(li);
  };
};

const populateSelect = function(beers){
  const select = document.getElementById("beers-list");
  beers.forEach(function(beer, index){
    const option = document.createElement("option");
    option.innerText = beer.name;
    option.value = index;
    select.appendChild(option);
  });
};

const getBeer = function(beers){
  const selected_beer = document.querySelector('select');
  selected_beer.addEventListener('change', function(){
    let beer = beers[this.value]
    getDetails(beer);
  })
};

const getDetails = function(beer){
  const div = document.getElementById("beer-info");
  const name = document.createElement("p");
  const img = document.createElement("IMG")
  const ingredients = document.createElement('p')
  getIngredients(beer)
  name.innerText = "Name: " + beer.name;
  ingredients.innerText = "Ingredients: " + ingredientsArray;
  img.setAttribute("src", beer.image_url);
  img.setAttribute("width", "100");
  img.setAttribute("height", "300");
  img.setAttribute("alt", "Who wants a beer!");
  div.appendChild(name);
  div.appendChild(ingredients);
  div.appendChild(img);
  return div;
}

const getIngredients = function(beer){
  ingredients = beer.ingredients
  ingredientsArray = []
  for (item in ingredients){
    ingredientsArray.push(item);
  }
  return ingredientsArray;
}

var app = function(){

  const url = "https://api.punkapi.com/v2/beers";
  makeRequest(url, requestComplete);

}

window.addEventListener('load', app);
