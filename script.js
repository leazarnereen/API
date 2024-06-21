document.addEventListener("DOMContentLoaded", function() {
    const searchBar = document.getElementById("search-bar");
    const allButton = document.getElementById("all-button");
    const resultsDiv = document.getElementById("results");
    async function fetchAll(){
        try{
            const response= await fetch("https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow");
            const data = await response.json();
            displayResults(data.items);
        }
        catch(error){
            console.error("Error : ",error);
        }
    }

    async function fetchBySearch(query){
        try{
            const response = await fetch("https://api.stackexchange.com/2.3/questions?order=desc&sort=activity&site=stackoverflow");
            const data = await response.json();
            displayResults(data.items,query);
        }
        catch(error){
            console.error("Error : ", error)
        }
    }

    function displayResults(items, query = '') {
        resultsDiv.innerHTML = ''; // Clear previous results
        items.forEach(item => {
            if (!query || item.tags.includes(query)) {
                const div = document.createElement('div');
                div.className = 'result-item';
                div.innerHTML = `
                    <h3>${item.title}</h3>
                    <p>Tags: ${item.tags.join(', ')}</p>
                    <p>Owner: <a href="${item.owner.link}" target="_blank">${item.owner.display_name}</a></p>
                    <p><a href="${item.link}" target="_blank">View Question</a></p>
                `;
                resultsDiv.appendChild(div);
            }
        });
    }
    allButton.addEventListener("click", function() {
        fetchAll();
    });

    // Event listener for the search bar
    searchBar.addEventListener("input", function() {
        const query = searchBar.value.trim();
        if (query) {
            fetchBySearch(query);
        } else {
            resultsDiv.innerHTML = ''; // Clear results if search bar is empty
        }
    });
});
