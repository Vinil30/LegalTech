document.addEventListener('DOMContentLoaded', function() {
      // Elements
      const steps = document.querySelectorAll('.step');
      const progressSteps = document.querySelectorAll('.progress-step');
      const progressFill = document.getElementById('progressFill');
      const nextBtns = document.querySelectorAll('.btn-next');
      const prevBtns = document.querySelectorAll('.btn-prev');
      const form = document.getElementById('signupForm');
      const passwordInput = document.getElementById('password');
      const passwordStrengthBar = document.getElementById('passwordStrengthBar');
      const passwordFeedback = document.getElementById('passwordFeedback');
      
      let currentStep = 0;
      
      // Update progress
      function updateProgress() {
        const progressPercent = (currentStep / (steps.length - 1)) * 100;
        progressFill.style.width = `${progressPercent}%`;
        
        progressSteps.forEach((step, index) => {
          step.classList.remove('active', 'completed');
          
          if (index < currentStep) {
            step.classList.add('completed');
          } else if (index === currentStep) {
            step.classList.add('active');
          }
        });
      }
      
      function showStep(stepIndex) {
        steps.forEach((step, index) => {
          step.classList.toggle('active', index === stepIndex);
        });
        
        currentStep = stepIndex;
        updateProgress();
      }
      
      function checkPasswordStrength(password) {
        let strength = 0;
        let feedback = '';
        
      
        if (password.length >= 8) strength += 20;
        
        if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 20;
        
        if (password.match(/([0-9])/)) strength += 20;
        
        if (password.match(/([!,@,#,$,%,^,&,*,?,_,~])/)) strength += 20;
        
        if (password.length > 10) strength += 20;
        
        // Update UI
        passwordStrengthBar.className = 'password-strength-bar';
        
        if (strength <= 40) {
          passwordStrengthBar.classList.add('password-strength-weak');
          feedback = 'Weak password';
        } else if (strength <= 80) {
          passwordStrengthBar.classList.add('password-strength-medium');
          feedback = 'Medium strength password';
        } else {
          passwordStrengthBar.classList.add('password-strength-strong');
          feedback = 'Strong password';
        }
        
        passwordFeedback.textContent = feedback;
      }
      
      // Update review section
      function updateReview() {
        const name = document.getElementById('name').value || 'Not provided';
        const email = document.getElementById('email').value || 'Not provided';
        const phone = document.getElementById('phone').value || 'Not provided';
        
        document.getElementById('review-personal').innerHTML = `
          <div><strong>Name:</strong> ${name}</div>
          <div><strong>Email:</strong> ${email}</div>
          <div><strong>Phone:</strong> ${phone}</div>
        `;
        
        const experience = document.getElementById('experience').value || 'Not provided';
        const barNumber = document.getElementById('barNumber').value || 'Not provided';
        const location = document.getElementById('location').value || 'Not provided';
        
        const specializationSelect = document.getElementById('specialization');
        const selectedSpecializations = Array.from(specializationSelect.selectedOptions).map(opt => opt.value);
        
        document.getElementById('review-professional').innerHTML = `
          <div><strong>Experience:</strong> ${experience} years</div>
          <div><strong>Bar Number:</strong> ${barNumber}</div>
          <div><strong>Location:</strong> ${location}</div>
          <div><strong>Specializations:</strong></div>
          <div class="specializations-list">
            ${selectedSpecializations.map(spec => `<span class="specialization-tag">${spec}</span>`).join('')}
          </div>
        `;
        
        const fee = document.getElementById('fee').value || 'Not provided';
        const currency = document.getElementById('currency').value || 'USD';
        const bio = document.getElementById('bio').value || 'Not provided';
        
        document.getElementById('review-work').innerHTML = `
          <div><strong>Consultation Fee:</strong> ${fee} ${currency}</div>
          <div><strong>Bio:</strong> ${bio.substring(0, 100)}${bio.length > 100 ? '...' : ''}</div>
        `;
      }
      
      nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          let isValid = true;
          const currentStepEl = steps[currentStep];
          const inputs = currentStepEl.querySelectorAll('input[required], select[required], textarea[required]');
          
          inputs.forEach(input => {
            if (!input.value.trim()) {
              isValid = false;
              input.classList.add('error');
              input.style.borderColor = 'var(--danger)';
            } else {
              input.classList.remove('error');
              input.style.borderColor = '';
            }
          });
          
          if (isValid) {
            const nextStep = parseInt(btn.getAttribute('data-next').replace('step', '')) - 1;
            
            if (nextStep === 3) {
              updateReview();
            }
            
            showStep(nextStep);
          } else {
            // Shake animation for error indication
            steps[currentStep].style.animation = 'shake 0.5s';
            setTimeout(() => {f
              steps[currentStep].style.animation = '';
            }, 500);
          }
        });
      });
      
      prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const prevStep = parseInt(btn.getAttribute('data-prev').replace('step', '')) - 1;
          showStep(prevStep);
        });
      });
      
      passwordInput.addEventListener('input', function() {
        checkPasswordStrength(this.value);
      });
      
      // Form submission
form.addEventListener('submit', async function(e) {
  e.preventDefault();

  const submitBtn = form.querySelector('.btn-submit');
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
  submitBtn.disabled = true;

  // Collect form data
  const formData = {
    name: document.getElementById('name').value.trim(),
    email: document.getElementById('email').value.trim(),
    password: document.getElementById('password').value,
    phone: document.getElementById('phone').value.trim(),
    specialization: Array.from(document.getElementById('specialization').selectedOptions).map(opt => opt.value),
    experience: document.getElementById('experience').value,
    barNumber: document.getElementById('barNumber').value.trim(),
    location: document.getElementById('location').value.trim(),
    fee: document.getElementById('fee').value,
    currency: document.getElementById('currency').value,
    bio: document.getElementById('bio').value.trim(),
    work_title_1: form.querySelector('input[name="work_title_1"]').value.trim(),
    work_desc_1: form.querySelector('textarea[name="work_desc_1"]').value.trim(),
    work_title_2: form.querySelector('input[name="work_title_2"]').value.trim(),
    work_desc_2: form.querySelector('textarea[name="work_desc_2"]').value.trim(),
  };

  try {
    const response = await fetch('/api/lawyer-signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    const result = await response.json();

    if (result.success) {
      alert(result.message || 'Application submitted successfully!');
      window.location.href = "/lawyer-login"; 
    } else {
      alert(result.message || 'Signup failed. Please try again.');
    }
  } catch (error) {
    console.error('Error submitting signup:', error);
    alert('An error occurred. Please try again later.');
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});

      
      const style = document.createElement('style');
      style.textContent = `
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .mt-10 { margin-top: 10px; }
        .mt-15 { margin-top: 15px; }
      `;
      document.head.appendChild(style);
      
      updateProgress();
    });