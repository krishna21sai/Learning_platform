// Function to add new topic input fields dynamically
function addTopicFields() {
    const topicDiv = document.createElement('div');
    topicDiv.classList.add('topic-row'); // Styled row for better structure

    const topicInput = document.createElement('input');
    topicInput.type = 'text';
    topicInput.name = 'topics';
    topicInput.classList.add('input-field', 'topic-input');
    topicInput.placeholder = 'Enter Topic';

    const contentInput = document.createElement('textarea');
    contentInput.name = 'contents';
    contentInput.classList.add('input-field', 'content-input');
    contentInput.placeholder = 'Enter Content';

    const removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = function () {
        topicDiv.remove();
    };


    // Arrange the elements for a better structure
    topicDiv.appendChild(topicInput);
    topicDiv.appendChild(contentInput);
    topicDiv.appendChild(removeBtn);

    document.getElementById('topics-container').appendChild(topicDiv);
}
