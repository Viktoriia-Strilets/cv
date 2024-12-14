document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('allcv-container');

  fetch('https://profile-builder-2.free.beeceptor.com/allcv')
  .then(response => response.json())
  .then(data => {
    // Відобразіть список CV у таблиці або картках
    console.log(data);
  })
  .catch(error => console.error('Error fetching all CVs:', error));
});


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