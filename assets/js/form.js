// Create a variable that selects the form element
const form = document.querySelector('form');

// Create a function that handles the form submission. Grab the form data and store it in local storage, then redirect to the blog page using the `redirectPage` function. If the form is submitted with missing data, display an error message to the user.
function handleFormSubmission(event) {
    event.preventDefault();
    
    const formData = new FormData(form);
    const data = {};
    let hasEmptyFields = false;

    formData.forEach((value, key) => {
        if (!value) {
            hasEmptyFields = true;
        }
        data[key] = value;
    });

    if (hasEmptyFields) {
        alert('Please fill in all the fields.');
        formData.forEach((value, key) => {
            const input = form.querySelector(`[name="${key}"]`);
            const errorElement = input.nextElementSibling;

            if (!value) {
                input.style.borderColor = 'red';
                if (errorElement) {
                    errorElement.textContent = `Please fill in the missing ${key}.`;
                } else {
                    const error = document.createElement('div');
                    error.style.color = 'red';
                    error.textContent = `Please fill in the missing ${key}.`;
                    input.insertAdjacentElement('afterend', error);
                }
            } else {
                input.style.borderColor = '';
                if (errorElement) {
                    errorElement.textContent = '';
                }
            }
        });
        return;
    }

    // Retrieve existing blog data from local storage
    const existingData = JSON.parse(localStorage.getItem('blogData')) || [];
    // Add new form data to existing blog data
    existingData.push(data);
    // Store updated blog data back to local storage
    localStorage.setItem('blogData', JSON.stringify(existingData));
    redirectPage('./blog.html');
}

// Add an event listener to the form on submit. Call the function to handle the form submission.
form.addEventListener('submit', handleFormSubmission);
