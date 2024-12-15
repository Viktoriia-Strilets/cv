/*document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cvForm');
  const submitButton = document.getElementById('submit');
  const notificationArea = document.getElementById('notificationArea');

  // Handle form submission
  submitButton.addEventListener('click', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const cvData = {
      photo: formData.get('photo'),  // Handle file uploads separately
      personalDetails: {
        fullName: formData.get('fullname'),
        gender: formData.get('gender'),
        age: formData.get('age'),
        citizenship: formData.get('citizenship'),
        maritalStatus: formData.get('maritalStatus')
      },
      contacts: {
        emails: formData.getAll('email'),
        phoneNumbers: formData.getAll('phone'),
        location: {
          country: formData.get('country'),
          city: formData.get('city')
        }
      },
      languages: formData.getAll('languages'),
      education: formData.getAll('education'),
      workExperience: formData.getAll('workExperience'),
      programmingLanguages: formData.getAll('programmingLanguages')
    };

    try {
      const response = await fetch('https://team2-profile-builder.free.beeceptor.com/createcv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await response.json();

      // Handle different response codes
      if (response.ok) {
        showNotification('success', result.message);
      } else {
        showNotification('error', result.message || 'An error occurred while submitting the CV.');
      }
    } catch (error) {
      showNotification('error', 'An unexpected error occurred. Please try again later.');
    }
  });

  // Show notification
  function showNotification(type, message) {
    notificationArea.classList.remove('success', 'error');
    notificationArea.classList.add(type);
    notificationArea.textContent = message;

    // Auto-hide the notification after 5 seconds
    setTimeout(() => {
      notificationArea.textContent = '';
      notificationArea.classList.remove(type);
    }, 5000);
  }
});*/


document.addEventListener('alpine:init', () => {
  function showNotification(message, type = 'success') {
    const notificationArea = document.getElementById('notificationArea');
  
  
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerText = message;
  
    // Додавання повідомлення в DOM
    notificationArea.appendChild(notification);
    
    // Видалення повідомлення через 5 секунд
    setTimeout(() => {
      notification.remove();
    }, 5000); // Видалити повідомлення через 5 секунд
  }

  Alpine.data('form', () => ({
    personalDetails: {
      fullName: '',
      gender: 'Male',
      age: '',
      citizenship: 'Ukrainian',
      maritalStatus: 'Single',
    },
    contacts: {
      emails: [''],
      phoneNumbers: [''],
      location: {
        country: 'Ukraine',
        city: 'Kyiv',
      },
    },
    education: [{ name: '', institute: '', period: { start: '', end: '' } }],
    workExperience: [{ companyName: '', location: { country: 'Ukraine', city: 'Kyiv' }, position: '', period: { start: '', end: '' } }],
    languages: [{ name: 'Ukrainian', level: 'Native' }],
    programmingLanguages: [{ name: 'C++', level: 'Trainee' }],

    async submit(event) {
      event.preventDefault();
      const data = {
        personalDetails: structuredClone(Alpine.raw(this.personalDetails)),
        contacts: structuredClone(Alpine.raw(this.contacts)),
        education: structuredClone(Alpine.raw(this.education)),
        workExperience: structuredClone(Alpine.raw(this.workExperience)),
        languages: structuredClone(Alpine.raw(this.languages)),
        programmingLanguages: structuredClone(Alpine.raw(this.programmingLanguages)),
      };
      data.personalDetails.age = Number(data.personalDetails.age);

      try {
        let response = await fetch('https://profile-builder.free.beeceptor.com/createcv', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          
        });

        if (!response.ok) {
          if (response.status === 400) {
            throw new Error('Validation error: Please check your input data.');
          } else if (response.status === 500) {
            throw new Error('Server error: Please try again later.');
          } else {
            throw new Error(`Unexpected error: ${response.status}`);
          }
        }

        const responseData = await response.json();
        console.log('Success:', responseData);
        showNotification('CV successfully created!', 'success');
      } catch (error) {
        console.error('Error:', error.message);
        showNotification(error.message, 'error');
      }
    },
  }));
});



/*document.addEventListener('DOMContentLoaded', () => {
  const cvForm = document.getElementById('cvForm');
  const notificationArea = document.getElementById('notificationArea');

  // Функція для показу сповіщень
  const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    notificationArea.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 5000);
  };

  if (cvForm) {
    cvForm.addEventListener('submit', (event) => {
      event.preventDefault();

      // Збір даних форми
      const formData = {
        fullName: document.getElementById('fullname').value,
        gender: document.querySelector('input[name="gender"]:checked')?.value || '',
        age: document.getElementById('age').value,
      };

      // Відправка даних

  fetch('https://team2-profile-builder.free.beeceptor.com/createcv', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 400) {
        throw new Error('Validation error: Please check your input data.');
      } else if (response.status === 500) {
        throw new Error('Server error: Please try again later.');
      } else {
        throw new Error(`Unexpected error: ${response.status}`);
      }
    })
    .then(data => {
      console.log('Success:', data);
      showNotification('CV successfully created!', 'success');
    })
    .catch(error => {
      console.error('Error:', error.message);
      showNotification(error.message, 'error');
    });
    
});
cvForm.addEventListener('reset', () => {
});
} else {
console.error('Form with id "cvForm" not found in the DOM');
}
});*/











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
          this.photo = null;        
          this.$refs.fileInput.value = ""; 
      },
  
    }));
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

  
  


  