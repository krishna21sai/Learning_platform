// Function to add new topic input fields dynamically
function addTopicFields() {
    // Create a new div to hold the topic and content input fields
    const topicDiv = document.createElement('div');
    topicDiv.classList.add('topic-input');

    // Create the input for the topic
    const topicInput = document.createElement('input');
    topicInput.type = 'text';
    topicInput.name = 'topics[]'; // Name for the topics array
    topicInput.classList.add('input-field');
    topicInput.placeholder = 'Enter Topic';

    // Create the input for the content
    const contentInput = document.createElement('textarea');
    contentInput.name = 'contents[]'; // Name for the contents array
    contentInput.classList.add('input-field');
    contentInput.placeholder = 'Enter Content';

    // Create the remove button
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function() {
        topicDiv.remove(); // Remove the topic input div
    };

    // Append the inputs and remove button to the topic div
    topicDiv.appendChild(topicInput);
    topicDiv.appendChild(contentInput);
    topicDiv.appendChild(removeBtn);

    // Append the topic div to the topics container
    document.getElementById('topics-container').appendChild(topicDiv);
}
