// Create logic to toggle the light/dark mode styles for the page and circle. The mode should be saved to local storage.
const updateIcon = () => {
  const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
  const toggleButton = document.getElementById('theme-toggle');
  toggleButton.textContent = currentTheme === 'dark' ? '🌞' : '🌜';
  toggleButton.style.backgroundColor = currentTheme === 'dark' ? '#000' : '#fff';
  toggleButton.style.cursor = 'pointer';
  toggleButton.title = currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
  toggleButton.style.height = '5vh';
  toggleButton.style.display = 'flex';
  toggleButton.style.alignItems = 'center';
  toggleButton.style.justifyContent = 'center';
  toggleButton.style.position = 'fixed';
  toggleButton.style.right = '5px';
  const header = document.querySelector('header');
  header.style.display = 'flex';
  header.style.alignItems = 'center';
  toggleButton.style.border = currentTheme === 'dark' ? '2px solid aquamarine' : '2px solid #000';
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const toggleButton = document.createElement('button');
  document.body.classList.add('dark-mode');
  toggleButton.id = 'theme-toggle';
  header.appendChild(toggleButton);

  const toggleTheme = () => {
    document.body.classList.toggle('dark-mode');
    const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', currentTheme);
    updateIcon();
  };

  toggleButton.addEventListener('click', toggleTheme);

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    document.body.classList.add(savedTheme === 'dark' ? 'dark-mode' : 'light-mode');
  }
  updateIcon();
});

// Create a function called `readLocalStorage` that reads from local storage and returns the data. If no data exists, return an empty array.
const readLocalStorage = function () {
  const data = JSON.parse(localStorage.getItem('blogData'));
  return data ? data : [];
}

// Create a function called `storeLocalStorage` that takes a given object and saves the new data to the existing blog data in local storage.
const storeLocalStorage = function (newData) {
  let data = readLocalStorage();
  data.push(newData);
  localStorage.setItem('blogData', JSON.stringify(data));
}

// ! Use the following function whenever you need to redirect to a different page

let redirectURL = '';

const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};

