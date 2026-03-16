document.addEventListener('DOMContentLoaded', function() {
  
  const togglePassword = document.getElementById('togglePassword');
  const passwordInput = document.getElementById('password');
  
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      const eyeIcon = this.querySelector('i');
      eyeIcon.classList.toggle('fa-eye');
      eyeIcon.classList.toggle('fa-eye-slash');
    });
  }
  
  
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const submitBtn = this.querySelector('.btn-login');
      const originalText = submitBtn.textContent;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      
      clearErrors();
      
      
      if (!email || !password) {
        showError('Please fill in all required fields');
        return;
      }
      
      if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
      }
      
      
      submitBtn.textContent = 'Signing in...';
      submitBtn.disabled = true;
      
      
      const loginData = {
        email: email.trim(),
        password: password,
        remember: remember
      };
      
      
      fetch('/api/lawyer-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          showSuccess(data.message);
          
          setTimeout(() => {
            if (data.redirect) {
              window.location.href = data.redirect;
            } else {
              window.location.href = '/lawyer-dashboard';
            }
          }, 1000);
          
        } else {
          showError(data.message || 'Login failed. Please try again.');
          
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }
      })
      .catch(error => {
        console.error('Login error:', error);
        showError('Network error. Please check your connection and try again.');
        
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      });
    });
  }
  
  
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  
  function showError(message) {
    
    const existingError = document.querySelector('.error-message');
    if (existingError) {
      existingError.remove();
    }
    
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.cssText = `
      background: #fee2e2;
      border: 1px solid #fecaca;
      color: #dc2626;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 14px;
      display: flex;
      align-items: center;
      animation: slideIn 0.3s ease-out;
    `;
    errorDiv.innerHTML = `
      <i class="fas fa-exclamation-triangle" style="margin-right: 8px;"></i>
      ${message}
    `;
    
    
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(errorDiv, form);
    
    setTimeout(() => {
      if (errorDiv && errorDiv.parentNode) {
        errorDiv.remove();
      }
    }, 5000);
  }
  
  
  function showSuccess(message) {
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.style.cssText = `
      background: #dcfce7;
      border: 1px solid #bbf7d0;
      color: #16a34a;
      padding: 12px;
      border-radius: 8px;
      margin-bottom: 16px;
      font-size: 14px;
      display: flex;
      align-items: center;
      animation: slideIn 0.3s ease-out;
    `;
    successDiv.innerHTML = `
      <i class="fas fa-check-circle" style="margin-right: 8px;"></i>
      ${message}
    `;
    
    
    const form = document.getElementById('loginForm');
    form.parentNode.insertBefore(successDiv, form);
  }
  
  function clearErrors() {
    const messages = document.querySelectorAll('.error-message, .success-message');
    messages.forEach(msg => msg.remove());
  }
  
  
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    .error-message, .success-message {
      animation: slideIn 0.3s ease-out;
    }
    
    .btn-login:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
    
    .form-group {
      position: relative;
      margin-bottom: 20px;
    }
    
    .form-group.error input {
      border-color: #dc2626;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
    }
  `;
  document.head.appendChild(style);
  
  
  const inputs = document.querySelectorAll('input[type="email"], input[type="password"]');
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      const formGroup = this.closest('.form-group');
      
      if (this.type === 'email' && this.value && !isValidEmail(this.value)) {
        formGroup.classList.add('error');
      } else if (this.required && !this.value.trim()) {
        formGroup.classList.add('error');
      } else {
        formGroup.classList.remove('error');
      }
    });
    
    input.addEventListener('input', function() {
      const formGroup = this.closest('.form-group');
      formGroup.classList.remove('error');
    });
  });
  
  
  const signupLink = document.querySelector('a[action="/lawyer-signup"]');
  if (signupLink) {
    signupLink.addEventListener('click', function(e) {
      e.preventDefault();
      window.location.href = '/lawyer-signup';
    });
  }
});