document.addEventListener("DOMContentLoaded", function () {
  const mainElement = document.getElementById("blogContent");
  const backButton = document.getElementById("backButton");

  function buildElement(tag, content, parent, className = "") {
    const element = document.createElement(tag);
    element.textContent = content;
    if (className) {
      element.classList.add(className);
    }
    parent.appendChild(element);
  }

  function noPosts() {
    buildElement("p", "No Blog posts yet...", mainElement);
  }

  function readLocalStorage(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  }

  async function fetchBlogPosts() {
    try {
      const response = await fetch("./assets/js/blog.json"); // Ensure this path is correct
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch blog posts:", error);
      return [];
    }
  }

  async function renderBlogList() {
    const blogData = readLocalStorage("blogData");
    const jsonBlogData = await fetchBlogPosts();
    const allBlogData = [...jsonBlogData, ...blogData];

    if (allBlogData.length === 0) {
      noPosts();
    } else {
      allBlogData.forEach((post) => {
        const postContainer = document.createElement("div");
        postContainer.classList.add("post-card");

        buildElement("h2", post.title, postContainer, "post-title");
        buildElement(
          "h3",
          `By: ${post.username}`,
          postContainer,
          "post-author"
        );
        buildElement("p", post.content, postContainer, "post-content");

        mainElement.appendChild(postContainer);
      });
    }
  }

  renderBlogList();

  /**
   * Event listener for the back button to navigate back to the index page.
   */
  backButton.addEventListener("click", () => {
    window.location.href = "index.html";
  });
});
