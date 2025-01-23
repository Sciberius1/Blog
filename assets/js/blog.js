// TODO: Create a variable that selects the main element, and a variable that selects the back button element
const mainElement = document.querySelector('main');
const backButton = document.querySelector('.back-button');

// TODO: Create a function that builds an element and appends it to the DOM
function buildAndAppendElement(tag, content, parent) {
    const element = document.createElement(tag);
    element.textContent = content;
    parent.appendChild(element);
}

// TODO: Create a function that handles the case where there are no blog posts to display
function handleNoPosts() {
    const noPostsMessage = document.createElement('p');
    noPostsMessage.textContent = 'No blog posts available.';
    mainElement.appendChild(noPostsMessage);
}

// TODO: Create a function called `renderBlogList` that renders the list of blog posts if they exist. If not, call the no posts function.
function renderBlogList() {
    fetch('./assets/js/blog.json')
        .then(response => response.json())
        .then(posts => {
            if (posts.length > 0) {
                posts.forEach(post => {
                    const postContainer = document.createElement('div');
                    postContainer.classList.add('post');

                    buildAndAppendElement('h2', post.blogTitle, postContainer);
                    buildAndAppendElement('p', `by: ${post.blogAuthor}`, postContainer);
                    buildAndAppendElement('p', post.blogContent, postContainer);

                    mainElement.appendChild(postContainer);
                });
            } else {
                handleNoPosts();
            }
        })
        .catch(error => {
            console.error('Error fetching blog posts:', error);
            handleNoPosts();
        });
}


// TODO: Call the `renderBlogList` function
renderBlogList();

// TODO: Redirect to the home page using the `redirectPage` function found in logic.js when the back button is clicked
backButton.addEventListener('click', () => {
    redirectPage();
});