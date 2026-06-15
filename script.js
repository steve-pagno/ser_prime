/*
   SER PRIME INSTRUMENTAÇÃO - LANDING PAGE INTERACTION SCRIPT
   Handles: Sticky header, hamburger menu, scroll-reveal, tab controls, countdown timer, and registration modal.
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
      if (pageYOffset >= (sectionTop - 150)) {
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

  // --- Countdown Timer ---
  // Set date: October 15, 2026 08:00:00
  const eventDate = new Date('October 15, 2026 08:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = eventDate - now;

    // Time calculations
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Output results
    document.getElementById('days').innerText = days.toString().padStart(2, '0');
    document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');

    // If countdown is finished
    if (difference < 0) {
      clearInterval(countdownInterval);
      document.getElementById('countdown').innerHTML = "<div style='color: var(--accent-cyan); font-weight: bold; width: 100%; text-align: center; font-size: 1.25rem;'>O EVENTO COMEÇOU!</div>";
    }
  }

  // Initial call and set interval
  updateCountdown();
  const countdownInterval = setInterval(updateCountdown, 1000);

  // --- Tab Control: Commission/Speakers ---
  const commissionTabButtons = document.querySelectorAll('#commissions .tab-btn');
  const commissionTabContents = document.querySelectorAll('#commissions .tab-content');

  commissionTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Deactivate current active tab header & content
      commissionTabButtons.forEach(btn => btn.classList.remove('active'));
      commissionTabContents.forEach(content => content.classList.remove('active'));

      // Activate clicked tab header
      button.classList.add('active');
      
      // Activate target tab content
      const targetId = button.getAttribute('data-tab');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // --- Tab Control: Program Schedule ---
  const scheduleTabButtons = document.querySelectorAll('#schedule .tab-btn');
  const scheduleTabContents = document.querySelectorAll('#schedule .schedule-tab-content');

  scheduleTabButtons.forEach(button => {
    button.addEventListener('click', () => {
      scheduleTabButtons.forEach(btn => btn.classList.remove('active'));
      scheduleTabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
      });

      button.classList.add('active');
      const targetId = button.getAttribute('data-schedule');
      const targetContent = document.getElementById(targetId);
      targetContent.style.display = 'block';
      targetContent.classList.add('active');
    });
  });

  // --- Registration / Ticket Checkout Modal ---
  const modal = document.getElementById('checkout-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const successCloseBtn = document.getElementById('success-close-btn');
  const ticketBuyButtons = document.querySelectorAll('.btn-buy');
  const selectedTicketDisplay = document.getElementById('selected-ticket-display');
  const modalFormContainer = document.getElementById('modal-form-container');
  const modalSuccessContainer = document.getElementById('modal-success-container');
  const regForm = document.getElementById('registration-form');

  // Open Modal
  ticketBuyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const ticketName = btn.getAttribute('data-ticket');
      selectedTicketDisplay.innerText = `Ingresso Selecionado: ${ticketName}`;
      modal.classList.add('active');
    });
  });

  // Close Modal Function
  function closeModal() {
    modal.classList.remove('active');
    // Wait for transition before resetting form view
    setTimeout(() => {
      modalFormContainer.style.display = 'block';
      modalSuccessContainer.style.display = 'none';
      regForm.reset();
    }, 300);
  }

  modalCloseBtn.addEventListener('click', closeModal);
  successCloseBtn.addEventListener('click', closeModal);
  
  // Close modal when clicking outside content area
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle Form Submission
  window.submitRegistrationForm = function() {
    const submitBtn = regForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Disable button & show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Processando...';
    
    // Simulate API call
    setTimeout(() => {
      modalFormContainer.style.display = 'none';
      modalSuccessContainer.style.display = 'block';
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }, 1500);
  };

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
