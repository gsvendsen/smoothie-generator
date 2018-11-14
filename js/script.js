const ingredientWrapper = document.querySelector('.ingredients-wrapper');
const filler = document.querySelector('.filler');

const ingredients = [
  { name: 'Apple', color: '#ffb3ba', image: './images/apple.png' },
  { name: 'Banana', color: '#FFF9C7', image: './images/banana.png' },
  { name: 'Carrot', color: '#ffdfba', image: './images/carrot.png' },
  { name: 'Strawberry', color: '#FF4859', image: './images/strawberry.png' },
  { name: 'Orange', color: '#FF9145', image: './images/orange.png' },
  { name: 'Grapes', color: '#D7BDFF', image: './images/grapes.png' },
  { name: 'Kiwi', color: '#CBFF7B', image: './images/kiwi.png' }
]

const createIngredient = (image, name, color)=>{
  const newIngredient = `
    <div class="ingredient" data-color="${color}">
      <p>${name}</p>
      <img src="${image}">
    </div>
  `;
  return newIngredient;
};

ingredients.forEach((ingredient)=>{
  ingredientWrapper.innerHTML += createIngredient(ingredient.image, ingredient.name, ingredient.color)
});

const ingredientElements = document.querySelectorAll('.ingredient');
console.log(ingredientElements);


ingredientElements.forEach((ingredientElement) => {
  ingredientElement.addEventListener('click', ()=>{

      AddIngredient(ingredientElement.getAttribute("data-color"))

      if(filler.childElementCount == 6){
        filler.classList.add("empty");
        window.setTimeout(EmptySmoothie, 500)
        window.alert("Smoothie is ready.");
      }
  })
})

const EmptySmoothie = ()=>{
  filler.innerHTML = "";
  filler.classList.remove("empty");
}

const AddIngredient = (color)=>{
  var newDiv = document.createElement('div');

  newDiv.setAttribute('class', 'component');
  newDiv.style.backgroundColor = color;
  filler.appendChild(newDiv);
}
