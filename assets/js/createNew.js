
// Create the table
const table = document.createElement('table');

// Create the title row
const titleRow = document.createElement('tr');
const titleCell = document.createElement('td');
titleCell.colSpan = 3;
titleCell.style.textAlign = 'center';
titleCell.textContent = 'SOUND OFF!!!';
titleRow.appendChild(titleCell);
table.appendChild(titleRow);

// Create the user name row
const userNameRow = document.createElement('tr');
const userNameLabelCell = document.createElement('td');
userNameLabelCell.textContent = 'User Name: ';
userNameLabelCell.style.textAlign = 'right';
const userNameInputCell = document.createElement('td');
const userNameInput = document.createElement('input');
userNameInput.type = 'text';
userNameInputCell.appendChild(userNameInput);
userNameRow.appendChild(userNameLabelCell);
userNameRow.appendChild(userNameInputCell);
table.appendChild(userNameRow);

// Create the message title row
const messageTitleRow = document.createElement('tr');
const messageTitleLabelCell = document.createElement('td');
messageTitleLabelCell.textContent = 'Title: ';
messageTitleLabelCell.style.textAlign = 'right';
const messageTitleInputCell = document.createElement('td');
const messageTitleInput = document.createElement('input');
messageTitleInput.type = 'text';
messageTitleInputCell.appendChild(messageTitleInput);
messageTitleRow.appendChild(messageTitleLabelCell);
messageTitleRow.appendChild(messageTitleInputCell);
table.appendChild(messageTitleRow);

// Create the message content row
const messageContentRow = document.createElement('tr');
const messageContentLabelCell = document.createElement('td');
messageContentLabelCell.textContent = 'Message Content: ';
messageContentLabelCell.style.textAlign = 'right';
const messageContentInputCell = document.createElement('td');
const messageContentInput = document.createElement('textarea');
messageContentInputCell.appendChild(messageContentInput);
messageContentRow.appendChild(messageContentLabelCell);
messageContentRow.appendChild(messageContentInputCell);
table.appendChild(messageContentRow);

// Create the submit button
const submitButtonRow = document.createElement('tr');
const submitButtonCell = document.createElement('td');
submitButtonCell.colSpan = 3;
submitButtonCell.style.textAlign = 'center';
const submitButton = document.createElement('button');
submitButton.textContent = 'Submit';
submitButtonCell.appendChild(submitButton);
submitButtonRow.appendChild(submitButtonCell);
table.appendChild(submitButtonRow);

// Append the table to the document body or any other desired element
document.querySelector('.green-column').appendChild(table);

// Add event listener to the submit button
submitButton.addEventListener('click', () => {
    // Check if any field is empty or doesn't meet the minimum requirements
    let errorMessage = '';
    if (userNameInput.value.trim() === '') {
        errorMessage += 'Please enter a User Name.\n';
        userNameInput.style.borderColor = 'red';
    }

    if (userNameInput.value.length < 3 || userNameInput.value.length > 20) {
        errorMessage += 'User Name must be between 3 and 20 characters.\n';
        userNameInput.style.borderColor = 'red';
    }

    if (messageTitleInput.value.trim() === '') {
        errorMessage += 'Please enter a Title.\n';
        messageTitleInput.style.borderColor = 'red';
    }

    if (messageTitleInput.value.length < 5 || messageTitleInput.value.length > 50) {
        errorMessage += 'Title must be between 5 and 50 characters.\n';
        messageTitleInput.style.borderColor = 'red';
    }

    if (messageContentInput.value.trim() === '') {
        errorMessage += 'Please enter a Message Content.\n';
        messageContentInput.style.borderColor = 'red';
    }

    if (messageContentInput.value.length < 10 || messageContentInput.value.length > 500) {
        errorMessage += 'Message Content must be between 10 and 500 characters.\n';
        messageContentInput.style.borderColor = 'red';
    }
    // All fields meet the minimum requirements, proceed with submission
    const formData = {
        userName: userNameInput.value.trim(),
        messageTitle: messageTitleInput.value.trim(),
        messageContent: messageContentInput.value.trim()
    };

    // Store input values in ./blog.json
    fetch('./blog.json', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (response.ok) {
            alert('Submission successful!');
        } else {
            throw new Error('Submission failed.');
        }
    })
    .catch(error => {
        console.error(error);
        alert('An error occurred during submission.');
    });

    // Display error message
    if (errorMessage !== '') {
        alert(errorMessage);
        return;
    }
});