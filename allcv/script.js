function fetchData() {
  fetch('https://profile-builder.free.beeceptor.com/allcv', {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json(); 
  })
  .then(data => {
      console.log('Received data:', data);       
  })
  .catch(error => {
      console.error('There was a problem with the fetch operation:', error);
  });
}

fetchData(); 

document.addEventListener('DOMContentLoaded', function() {
const image = document.getElementById('profileImage');
const modalOverlay = document.getElementById('modalOverlay');
const modalImage = document.getElementById('modalImage');
const closeModalButton = document.getElementById('closeModal');


image.addEventListener('click', function(event) {
  modalImage.src = event.target.src;  
  modalOverlay.style.display = 'flex'; 

closeModalButton.addEventListener('click', function() {
  modalOverlay.style.display = 'none'; 
});


modalOverlay.addEventListener('click', function() {
  modalOverlay.style.display = 'none'; 
});


const modalContent = document.querySelector('.modal-content');
modalContent.addEventListener('click', function(event) {
  event.stopPropagation(); 
});
})
})