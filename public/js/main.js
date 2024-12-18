const form = document.getElementById('dataForm');
const dataList = document.getElementById('dataList');

// Function to fetch and display data
async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();

        // Clear the list
        dataList.innerHTML = '';

        // Add each item to the list
        data.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${item.id}: ${item.title} by ${item.name}`;
            dataList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Form submit event listener
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const name = document.getElementById('name').value;

    try {
        // Send data to the backend
        const response = await fetch('/api/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, name }),
        });

        if (!response.ok) {
            throw new Error('Failed to submit data');
        }

        // Clear the form
        form.reset();

        // Refresh the data list
        fetchData();
    } catch (error) {
        console.error('Error submitting data:', error);
    }
});

// Initial fetch to populate the list
fetchData();
