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

const createIngredient = (image, name, color) => {
  const newIngredient = `
    <div class="ingredient" data-color="${color}">
      <p>${name}</p>
      <img src="${image}">
    </div>
  `;
  return newIngredient;
};

ingredients.forEach((ingredient) => {
  ingredientWrapper.innerHTML += createIngredient(ingredient.image, ingredient.name, ingredient.color)
});

const ingredientElements = document.querySelectorAll('.ingredient');
console.log(ingredientElements);


ingredientElements.forEach((ingredientElement) => {
  ingredientElement.addEventListener('click', () => {

    AddIngredient(ingredientElement.getAttribute("data-color"))

    if (filler.childElementCount > 4) {
      window.alert("Smoothie is ready.");
      filler.classList.add("empty");
      window.setTimeout(EmptySmoothie, 500)
    }
  })
})

const EmptySmoothie = () => {
  filler.innerHTML = "";
  filler.classList.remove("empty");
}

const AddIngredient = (color) => {
  let newDiv = document.createElement('div');
  let firstDiv = document.querySelector('.filler div');

  newDiv.setAttribute('class', 'component');
  newDiv.style.backgroundColor = color;

  // If first div isn't empty
  if (firstDiv) {
    // Insert newDiv before first div
    filler.insertBefore(newDiv, firstDiv);
  } else {
    filler.appendChild(newDiv);
  }

  if(filler.childElementCount > 1){
    let currentIngredients = document.querySelectorAll('.filler div');
    let lastIngredient = document.querySelector('.filler div:last-child');
    currentIngredients.forEach((ingredient) => {
      console.log(currentIngredients);
      console.log(currentIngredients[0].style.backgroundColor);
      console.log(lastIngredient.style.backgroundColor);

      let color3 = blend_colors(
        rgbToHex(currentIngredients[0].style.backgroundColor), // Replace with first element color
        rgbToHex(lastIngredient.style.backgroundColor), // Replace with last element color
        .5 // Replace if you want some more advanced blending
      )

      ingredient.style.backgroundColor = color3;
    });
  }
}

/**
 * BLEND COLORS
 */
function blend_colors(color1, color2, percentage) {
  // check input
  color1 = color1 || '#000000';
  color2 = color2 || '#ffffff';
  percentage = percentage || 0.5;

  // 1: validate input, make sure we have provided a valid hex
  if (color1.length != 4 && color1.length != 7)
    throw new error('colors must be provided as hexes');

  if (color2.length != 4 && color2.length != 7)
    throw new error('colors must be provided as hexes');

  if (percentage > 1 || percentage < 0)
    throw new error('percentage must be between 0 and 1');

  // 2: check to see if we need to convert 3 char hex to 6 char hex, else slice off hash
  //      the three character hex is just a representation of the 6 hex where each character is repeated
  //      ie: #060 => #006600 (green)
  if (color1.length == 4)
    color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];
  else
    color1 = color1.substring(1);
  if (color2.length == 4)
    color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];
  else
    color2 = color2.substring(1);

  console.log('valid: c1 => ' + color1 + ', c2 => ' + color2);

  // 3: we have valid input, convert colors to rgb
  color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
  color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];

  console.log('hex -> rgba: c1 => [' + color1.join(', ') + '], c2 => [' + color2.join(', ') + ']');

  // 4: blend
  var color3 = [
    (1 - percentage) * color1[0] + percentage * color2[0],
    (1 - percentage) * color1[1] + percentage * color2[1],
    (1 - percentage) * color1[2] + percentage * color2[2]
  ];

  console.log('c3 => [' + color3.join(', ') + ']');

  // 5: convert to hex
  color3 = '#' + int_to_hex(color3[0]) + int_to_hex(color3[1]) + int_to_hex(color3[2]);

  console.log(color3);

  // return hex
  return color3;
}

/*
    convert a Number to a two character hex string
    must round, or we will end up with more digits than expected (2)
    note: can also result in single digit, which will need to be padded with a 0 to the left
    @param: num         => the number to conver to hex
    @returns: string    => the hex representation of the provided number
*/
function int_to_hex(num)
{
    var hex = Math.round(num).toString(16);
    if (hex.length == 1)
        hex = '0' + hex;
    return hex;
}

//
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

// Converts RGB values to Hex values
function rgbToHex(rgb) {
  //TODO: Replace '"rgb("255,255,255")"'
  //TODO  Convert values to be passable in this function

  let processedRgb = rgb.replace('rgb(', '').replace(')', '');

  let r = processedRgb[0]
  let g = processedRgb[1]
  let b = processedRgb[2]

  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}