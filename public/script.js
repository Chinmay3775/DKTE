document.addEventListener('DOMContentLoaded', function() {
  // Countdown timer functionality
  const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;

  // Set the date we're counting down to (April 10, 2025)
  const countDown = new Date('March 15, 2025 00:00:00').getTime();
  
  // Update the countdown every 1 second
  const timer = setInterval(function() {
    // Get today's date and time
    const now = new Date().getTime();
    
    // Find the distance between now and the countdown date
    const distance = countDown - now;
    
    // Calculate time units
    document.getElementById('days').innerText = Math.floor(distance / day);
    document.getElementById('hours').innerText = Math.floor((distance % day) / hour);
    document.getElementById('minutes').innerText = Math.floor((distance % hour) / minute);
    document.getElementById('seconds').innerText = Math.floor((distance % minute) / second);
    
    // If the countdown is over, display a message
    if (distance < 0) {
      clearInterval(timer);
      document.getElementById('headline').innerText = 'It\'s here!';
      document.getElementById('countdown').style.display = 'none';
      document.getElementById('content').style.display = 'block';
      return;
    }
  }, 1000);
  
  // Initialize audio for background music
  const audio = document.getElementById('audio');
  
  // Autoplay background music on page interaction
  document.addEventListener('click', function() {
    if (audio.paused) {
      audio.play();
    }
  }, { once: true });
  
  // Mobile sidebar functionality
  const sidebarBtn = document.getElementById('sidebar-btn');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarBtn && sidebar) {
    // Toggle sidebar
    sidebarBtn.addEventListener('click', function() {
      sidebar.classList.toggle('active');
      
      // Transform hamburger to X
      const spans = this.querySelectorAll('span');
      
      if (sidebar.classList.contains('active')) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', function(event) {
      if (!sidebar.contains(event.target) && !sidebarBtn.contains(event.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        
        const spans = sidebarBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
    
    // Close sidebar when clicking on links
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
      link.addEventListener('click', function() {
        sidebar.classList.remove('active');
        
        const spans = sidebarBtn.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      });
    });
  }
  
  // Card hover effects enhancement
  const cards = document.querySelectorAll('.card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // Add a subtle glow effect
      this.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.5), 0 0 20px ${getComputedStyle(document.documentElement).getPropertyValue('--highlight-color')}`;
    });
    
    card.addEventListener('mouseleave', function() {
      // Remove the glow effect
      this.style.boxShadow = '';
    });
  });
  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
});
