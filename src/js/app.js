document.addEventListener('DOMContentLoaded', function() {
  const searchBox = document.getElementById('searchBox');
  const container = document.querySelector('.containers');
  
  searchBox.addEventListener('keyup', function(e) {
    const searchTerm = e.target.value.trim().toLowerCase(); // Get the entered search term and convert to lowercase
    
    // Only proceed if the search term is not empty
    if (searchTerm) {
      // Fetch API
      fetch(`https://api.github.com/search/users?q=${searchTerm}&since=0`) // Fetch users matching the search term
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const users = data.items;
          container.innerHTML = ''
          
          users.forEach(user => {
            container.innerHTML += `
              <div class="child">
                <img src="${user.avatar_url}" alt="icon">
                <h3>${user.login}</h3>
                <button>View Profile</button>
              </div>
            `;
          });
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  });
});
