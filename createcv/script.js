
document.addEventListener('alpine:init', () => {
  Alpine.data('form', () => ({
      personalDetails: {
          fullName: '',
          gender: '',
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
      workExperience: [{ companyName: '', location: { country: '', city: '' }, position: '', period: { start: '', end: '' } }],
      languages: [{ name: 'Ukrainian', level: 'Native' }],
      programmingLanguages: [{ name: 'C++', level: 'Trainee' }],

      async submit() {
          const data = {};
          data.personalDetails = structuredClone(Alpine.raw(this.personalDetails));
          data.contacts = structuredClone(Alpine.raw(this.contacts));
          data.education = structuredClone(Alpine.raw(this.education));
          data.workExperience = structuredClone(Alpine.raw(this.workExperience));
          data.languages = structuredClone(Alpine.raw(this.languages));
          data.programmingLanguages = structuredClone(Alpine.raw(this.programmingLanguages));
          data.personalDetails.age = Number(data.personalDetails.age);
          
          let resp = await fetch('https://profile-builder-2.free.beeceptor.com/cretecv', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
          });

          switch (resp.status) {
            case 201:
                window.location.replace('/');
                break;
            case 400:
                alert(await resp.text());
                break;
        }
      },
  }));
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
  


  