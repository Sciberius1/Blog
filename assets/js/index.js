const fetchBlogData = async () => {
    try {
        const response = await fetch('./assets/blog.json');
        const blogData = await response.json();

        blogData.forEach(entry => {
            const messageTitle = entry.messageTitle;
            const userName = entry.userName;
            const messageContent = entry.messageContent;

            const postBox = document.createElement('div');
            postBox.classList.add('post-box'); // Add the CSS class for styling

            const titleElement = document.createElement('h2');
            titleElement.textContent = messageTitle;
            postBox.appendChild(titleElement);

            const userElement = document.createElement('p');
            userElement.textContent = `By ${userName}`;
            postBox.appendChild(userElement);

            const contentElement = document.createElement('p');
            contentElement.textContent = messageContent;
            postBox.appendChild(contentElement);

            document.body.appendChild(postBox);
        });
    } catch (error) {
        console.error(error);
    }
};

fetchBlogData();
