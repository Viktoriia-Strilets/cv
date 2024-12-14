document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cv-container');

  const cvId = 1; // Приклад ID, вибраного користувачем
fetch(`https://profile-builder-2.free.beeceptor.com/cv?id=${cvId}`)
  .then(response => response.json())
  .then(data => {
    // Відобразіть деталі CV
    console.log(data);
  })
  .catch(error => console.error('Error fetching CV:', error));
});

document.addEventListener('alpine:init', () => {
    Alpine.data('imageUploader', () => ({
      photo: '',
      handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
          this.photo = URL.createObjectURL(file);
          this.isUrlInputVisible = false; 
        }
      },
      clearImage() {
          this.photo = null;         this.$refs.fileInput.value = ""; 
      },
  
    }));
  });
  
  const image = document.getElementById('profileImage');
  const modalOverlay = document.getElementById('modalOverlay');
  const modalImage = document.getElementById('modalImage');
  const closeModalButton = document.getElementById('closeModal');
  
  image.addEventListener('click', function(event) {
    modalImage.src = event.target.src; 
    modalOverlay.style.display = 'flex'; 
  });
  
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
  
  function emailManager() {
      return {
        addingEmail: false,
        newEmail: '',
        errorMessage: '',
        contacts: { emails: [] }, 
        validateEmail() {
          this.errorMessage = '';
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(this.newEmail)) {
            this.errorMessage = 'Invalid email format.';
          }
        },
        addEmail() {
          if (!this.errorMessage && this.newEmail) {
            this.contacts.emails.push(this.newEmail);
            this.newEmail = '';
            this.addingEmail = false;
          }
        },
        removeEmail(idx) {
          this.contacts.emails.splice(idx, 1);
        },
        cancelAdding() {
          this.addingEmail = false;
          this.newEmail = '';
          this.errorMessage = '';
        },
      };
  }
    function phoneManager() {
      return {
        addingPhone: false,
        newPhone: '',
        errorMessage: '',
        contacts: { phoneNumbers: [] }, 
        validatePhone() {
          this.errorMessage = '';
          const phoneRegex = /^\+(\d{2,3})\d{10}$/;
          if (!phoneRegex.test(this.newPhone)) {
            this.errorMessage = 'Invalid phone number.';
          }
        },
        addPhone() {
          if (!this.errorMessage && this.newPhone) {
           let formattedPhone = this.formatPhoneNumber(this.newPhone);  this.contacts.phoneNumbers.push(formattedPhone);
            this.newPhone = '';
            this.addingPhone = false;
          }
        },
        removePhone(idx) {        this.contacts.phoneNumbers.splice(idx, 1);
        },
        cancelAdding() {
          this.addingPhone = false;
          this.newPhone = '';
          this.errorMessage = '';
        },
        formatPhoneNumber(phone) {
           phone = phone.replace(/\D/g, '');
  if (phone.startsWith('+')) {
        if (phone.length >= 12) {
          phone = phone.replace(/^(\+(\d{2,3}))(\d{2})(\d{3})(\d{4})$/, '$1-$2-$3-$4-$5');
        }
      } else {
        if (phone.length >= 10) {
          phone = '+' + phone.replace(/^(\d{2,3})(\d{2})(\d{3})(\d{4})$/, '$1-$2-$3-$4');
        }
      }
      return phone;
     },
      };
      
    }
  function formatDate(date) {
      if (!date) return '';
      const [year, month, day] = date.split('-'); 
      return `${day}.${month}.${year}`;
  }
  
  const buttons = document.querySelectorAll('.but');
  

  buttons.forEach(button => {
      button.addEventListener('click', function() {
          buttons.forEach(btn => btn.classList.remove('active'));          
          this.classList.add('active');
      });
  });
  