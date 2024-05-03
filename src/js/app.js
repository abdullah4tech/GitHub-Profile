document.addEventListener('DOMContentLoaded', function() {
  const searchBox = document.getElementById('searchBox');
  const container = document.querySelector('.containers');
  
  searchBox.addEventListener('keyup', function(e) {
    const searchTerm = e.target.value.trim().toLowerCase();
    console.log(e.target.value.trim().toLowerCase())
    
    if (searchTerm) {
      fetch(`https://api.github.com/search/users?q=${searchTerm}&since=0`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          const users = data.items;
          container.innerHTML = '';
          
          users.forEach(user => {
            const userDiv = document.createElement('div');
            userDiv.classList.add('child');
            userDiv.innerHTML = `
              <img src="${user.avatar_url}" alt="icon">
              <h3>${user.login}</h3>
              <button class="redirectButton">View Profile</button>
            `;
            container.appendChild(userDiv);
            
            const button = userDiv.querySelector('.redirectButton');
            button.addEventListener('click', function() {
              window.open(user.html_url, '_blank');
            });
          });
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }
  });
});
