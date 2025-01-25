// Create a variable that selects the main element, and a variable that selects the back button element
const mainElement = document.querySelector('main');
const backButton = document.querySelector('.back-button');

// Create a function that builds an element and appends it to the DOM
function buildAndAppendElement(tag, content, parent) {
    const element = document.createElement(tag);
    element.textContent = content;
    parent.appendChild(element);
}

// Create a function that handles the case where there are no blog posts to display
function handleNoPosts() {
    const noPostsMessage = document.createElement('p');
    noPostsMessage.textContent = 'No blog posts available.';
    mainElement.appendChild(noPostsMessage);
}

// Create a function that reads the data from blog.json and local storage then renders the blog list
function renderBlogList() {
    const localPosts = JSON.parse(localStorage.getItem('blogData')) || []; // Read from local storage
    fetch('./assets/js/blog.json')
        .then(response => response.json())
        .then(posts => {
            const combinedPosts = posts.concat(localPosts);
            if (combinedPosts.length === 0) {
                handleNoPosts();
                return;
            }

            const blogContainer = document.createElement('div');

            combinedPosts.forEach(post => {
                const postCard = document.createElement('div');
                postCard.classList.add('post-card');

                buildAndAppendElement('h2', post.blogTitle, postCard);
                buildAndAppendElement('p', `By: ${post.blogAuthor}`, postCard);
                buildAndAppendElement('p', post.blogContent, postCard);

                blogContainer.appendChild(postCard);
            });

            mainElement.appendChild(blogContainer);
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
            handleNoPosts();
        });
}

// Redirect to the home page using the `redirectPage` function found in logic.js when the back button is clicked
if (backButton) {
    backButton.addEventListener('click', () => {
        redirectPage();
    });
}