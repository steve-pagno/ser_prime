/*
   PRIME INSTRUMENTAÇÃO - LANDING PAGE INTERACTION SCRIPT
   Handles: Sticky header, hamburger menu, scroll-reveal, pre-registration submission and success modal.
*/

document.addEventListener('DOMContentLoaded', () => {

  // --- Sticky Header ---
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // --- Mobile Hamburger Menu ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Rotate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'none';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(6px, -6px)' : 'none';
  });

  // Close mobile menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- Scroll Link Active Highlight ---
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // --- Modalities Selection and Scroll ---
  const selectModalityButtons = document.querySelectorAll('.select-modality-btn');
  const regModalitySelect = document.getElementById('reg-modality');

  selectModalityButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modalityValue = button.getAttribute('data-modality');
      if (regModalitySelect) {
        regModalitySelect.value = modalityValue;
      }
      
      // Scroll to inscription form
      const inscriptionSection = document.getElementById('inscription');
      if (inscriptionSection) {
        inscriptionSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // --- Pre-Registration Form Submission ---
  const modal = document.getElementById('checkout-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const successCloseBtn = document.getElementById('success-close-btn');
  const contactForm = document.getElementById('contact-form');

  // Handle Form Submission
  window.submitPreRegistration = function() {
    const submitBtn = document.getElementById('submit-btn');
    const originalText = submitBtn.innerHTML;
    const modalitySelect = document.getElementById('reg-modality');
    const selectedModalityText = modalitySelect ? modalitySelect.options[modalitySelect.selectedIndex].text : '';
    
    // Disable button & show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processando...';
    
    // Simulate API call
    setTimeout(() => {
      // Update success modal text dynamically
      const successParagraph = document.querySelector('#modal-success-container p');
      if (successParagraph && selectedModalityText) {
        successParagraph.innerHTML = `Recebemos suas informações para a modalidade:<br><strong>${selectedModalityText}</strong>.<br><br>Nossa equipe comercial entrará em contato via WhatsApp para fornecer todos os detalhes sobre a próxima turma.`;
      }
      
      // Show success modal
      modal.classList.add('active');
      
      // Reset form and submit button
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1200);
  };

  // Close Modal Function
  function closeModal() {
    modal.classList.remove('active');
  }

  modalCloseBtn.addEventListener('click', closeModal);
  successCloseBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside content area
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // --- Scroll Reveal Animation ---
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Unobserve once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
  });

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

});
