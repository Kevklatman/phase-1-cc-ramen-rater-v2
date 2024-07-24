const fetchRamenData = async () => {
  const response = await fetch('http://localhost:3000/ramens');
  return response.json();
};
const handleClick = (ramen) => {
  const detailDiv = document.getElementById('ramen-detail');
  detailDiv.innerHTML = `
    <h2>${ramen.name}</h2>
    <img src="${ramen.image}" alt="${ramen.name}">
    <p>Restaurant: ${ramen.restaurant}</p>
    <p>Comment: ${ramen.comment || 'insert comment here'}</p>
    <p>Rating: ${ramen.rating || 'insert rating here'}</p>
  `;
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
