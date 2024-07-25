const fetchRamenData = async () => {
  const response = await fetch('http://localhost:3000/ramens');
  return response.json();
};
const handleClick = (ramen) => {
  const detailImage = document.querySelector('#ramen-detail .detail-image');
  const nameElement = document.querySelector('#ramen-detail .name');
  const restaurantElement = document.querySelector('#ramen-detail .restaurant');
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  nameElement.textContent = ramen.name;
  restaurantElement.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating || '';
  commentDisplay.textContent = ramen.comment || '';
};
const displayRamens = async () => {
  const ramenData = await fetchRamenData();
  const ramenMenu = document.getElementById('ramen-menu');
  ramenMenu.innerHTML = '';

  ramenData.forEach(ramen => {
    const img = document.createElement('img');
    img.src = ramen.image;
    img.alt = ramen.name;
    img.classList.add('ramen-image');
    img.addEventListener('click', () => handleClick(ramen));
    ramenMenu.appendChild(img);
  });
};
const addNewRamen = (event) => {
  event.preventDefault();
  const name = document.getElementById('new-name').value;
  const restaurant = document.getElementById('new-restaurant').value;
  const image = document.getElementById('new-image').value;
  const newRamen = { name, restaurant, image };

  const img = document.createElement('img');
  img.src = newRamen.image;
  img.alt = newRamen.name;
  img.classList.add('ramen-image');
  img.addEventListener('click', () => handleClick(newRamen));
  
  document.getElementById('ramen-menu').appendChild(img);
  event.target.reset();
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', addNewRamen);
};

const main = async () => {
  await displayRamens();
  addSubmitListener();
};
  
document.addEventListener('DOMContentLoaded', main);
// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};
