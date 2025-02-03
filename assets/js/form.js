document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("blogForm");
  const errorElement = document.getElementById("error");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const username = form.username.value.trim();
    const title = form.title.value.trim();
    const content = form.content.value.trim();
    let hasError = false;

    // Reset error styles
    form.username.style.borderColor = "";
    form.title.style.borderColor = "";
    form.content.style.borderColor = "";

    if (!username) {
      form.username.style.borderColor = "red";
      hasError = true;
    }
    if (!title) {
      form.title.style.borderColor = "red";
      hasError = true;
    }
    if (!content) {
      form.content.style.borderColor = "red";
      hasError = true;
    }

    if (hasError) {
      errorElement.style.display = "block";
      return;
    }

    errorElement.style.display = "none";

    const newPost = { username, title, content };

    // Store the new post in local storage
    storeLocalStorage("blogData", newPost);

    // Redirect to the blog page
    window.location.href = "blog.html";
  });

  /**
   * Function to store data in local storage.
   * @param {string} key - The key under which the data is stored.
   * @param {Object} value - The data to be stored.
   */
  function storeLocalStorage(key, value) {
    let existingData = localStorage.getItem(key);
    existingData = existingData ? JSON.parse(existingData) : [];
    if (!Array.isArray(existingData)) {
      existingData = [];
    }
    existingData.push(value);
    localStorage.setItem(key, JSON.stringify(existingData));
  }
});
