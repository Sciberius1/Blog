/**
 * This script handles the dark mode toggle functionality for the webpage.
 * It sets the initial theme based on the user's preference stored in localStorage
 * and updates the toggle button's title accordingly.
 */

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Get the dark mode toggle button element by its ID.
   * Retrieve the current theme from localStorage or default to "light".
   */
  const darkModeToggle = document.getElementById("darkModeToggle");
  const currentMode = localStorage.getItem("theme") || "light";

  /**
   * Update the title attribute of the dark mode toggle button
   * based on the current theme.
   */
  function updateToggleTitle() {
    if (document.body.classList.contains("dark-mode")) {
      darkModeToggle.title = "Switch to light mode";
    } else {
      darkModeToggle.title = "Switch to dark mode";
    }
  }

  /**
   * If the current theme is "dark", apply the dark mode classes
   * to the body and the toggle button.
   */
  if (currentMode === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.classList.add("dark");
  }

  // Update the toggle button's title based on the initial theme.
  updateToggleTitle();

  /**
   * Add a click event listener to the dark mode toggle button.
   * Toggle the dark mode classes on the body and the button,
   * update the theme in localStorage, and update the button's title.
   */
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.classList.toggle("dark");

    const theme = document.body.classList.contains("dark-mode")
      ? "dark"
      : "light";
    localStorage.setItem("theme", theme);

    updateToggleTitle();
  });
});

/**
 * Redirects the page to the specified URL.
 * @param {string} url - The URL to redirect to.
 */
function redirectTo(url) {
  window.location.href = url;
}