/**
 * Main JavaScript for Đỗ Ngọc Khánh Portfolio
 * Ultra-lightweight, 0 external dependency for core features, GitHub Pages ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typed Text Effect
  const typedTarget = document.querySelector('.typed-text');
  const roles = [
    'Student Researcher @ SATLab',
    'Cloud & Microservices Architect',
    'Computer Networks Enthusiast',
    'C++ / Python / Java Developer',
    'Problem Solver & Dedicated Learner'
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typingSpeed = 70;

  function typeRole() {
    if (!typedTarget) return;

    const currentRole = roles[roleIdx];

    if (isDeleting) {
      typedTarget.textContent = currentRole.substring(0, charIdx - 1);
      charIdx--;
      typingSpeed = 35;
    } else {
      typedTarget.textContent = currentRole.substring(0, charIdx + 1);
      charIdx++;
      typingSpeed = 70;
    }

    if (!isDeleting && charIdx === currentRole.length) {
      typingSpeed = 2200; // Pause at end of text
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typingSpeed = 400; // Pause before typing next role
    }

    setTimeout(typeRole, typingSpeed);
  }

  typeRole();

  // 2. Navbar Scrollspy & Scrolled state
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;

    // Toggle background blur on scroll
    if (scrollPos > 60) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    // Update active nav link
    let currentId = '';
    sections.forEach(sec => {
      const secTop = sec.offsetTop - 120;
      const secHeight = sec.offsetHeight;
      if (scrollPos >= secTop && scrollPos < secTop + secHeight) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = navToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close menu when clicking link
    navLinks.forEach(l => {
      l.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // 3. Portfolio Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category') || '';
        if (filterVal === 'all' || cardCategory.includes(filterVal)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. Animate Skill Bars when in view
  const skillBars = document.querySelectorAll('.skill-progress');
  let animatedSkills = false;

  function checkSkillBars() {
    if (animatedSkills) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8) {
      skillBars.forEach(bar => {
        const targetWidth = bar.getAttribute('data-width') || '0%';
        bar.style.width = targetWidth;
      });
      animatedSkills = true;
    }
  }

  window.addEventListener('scroll', checkSkillBars);
  checkSkillBars();

  // 5. Interactive Modal Viewer for Projects
  const modalBackdrop = document.getElementById('projectModal');
  const modalCloseBtn = document.querySelector('.modal-close-btn');
  const modalTitle = document.getElementById('modalTitle');
  const modalRole = document.getElementById('modalRole');
  const modalDesc = document.getElementById('modalDesc');
  const modalTags = document.getElementById('modalTags');
  const modalRepo = document.getElementById('modalRepo');

  const projectDetails = {
    caroud: {
      title: 'Caroud — High-Availability Cloud-Native Caro Game',
      role: 'Project Manager & Solution Architect (Team of 4)',
      desc: 'Spearheaded the design and delivery of a distributed, highly available Caro gaming platform hosted on AWS. Architected a microservices ecosystem separating authentication, real-time WebSocket matchmaking, and resilient distributed game state engines. Directed the full SDLC including CI/CD pipelines, container orchestration, and performance monitoring.',
      tags: ['AWS Cloud', 'Microservices', 'Docker', 'WebSockets', 'Redis', 'High Availability'],
      repo: 'https://github.com/Xipog77/Caroud'
    },
    hcorap: {
      title: 'HCORAP — Enhanced SAT-based Framework for Home Care Resource Allocation',
      role: 'Student Researcher @ SATLab (VNU-UET)',
      desc: 'Advancing state-of-the-art combinatorial optimization in healthcare logistics. Formulated the Home Care Resource Allocation Problem into Boolean Satisfiability (SAT). Engineered symmetry-breaking constraints and integrated incremental SAT solving mechanisms to prune search spaces dramatically, delivering significant speedups over baseline approaches.',
      tags: ['SAT Solver', 'Combinatorial Optimization', 'Python', 'Algorithms', 'SATLab'],
      repo: 'https://github.com/Xipog77/HCORAP'
    },
    ralb: {
      title: 'RALB — SAT-driven Optimization for Robotic Assembly Line Balancing',
      role: 'Student Researcher @ SATLab (VNU-UET)',
      desc: 'Proposed a novel SAT-based exact solver approach for the Robotic Assembly Line Balancing (RALB) problem. Modeled complex workstation constraints, task precedence, and robotic tool assignments into propositional logic formulas, achieving optimal workload distribution across manufacturing stages.',
      tags: ['SATLab Research', 'Robotics Line Balancing', 'Constraint Programming', 'Optimization'],
      repo: 'https://github.com/Xipog77/RALB'
    },
    defend: {
      title: 'Defend the Kingdom — 2D Tower Defense Game',
      role: 'Full-stack Developer',
      desc: 'Engineered a full 2D Tower Defense game from scratch utilizing modern C++ and SDL2. Implemented custom 2D rendering loop, wave enemy pathfinding algorithms, projectile collision physics, and granular memory management routines for maximum runtime efficiency and low latency.',
      tags: ['C++', 'SDL2', 'Game Engine', 'Memory Management', 'Data Structures'],
      repo: 'https://github.com/Xipog77/Defend-the-Kingdom'
    },
    library: {
      title: 'Library Management System — JavaFX & MySQL',
      role: 'Frontend Developer (Team of 3)',
      desc: 'Architected an intuitive, responsive graphical desktop interface using JavaFX and modular CSS styling. Connected seamlessly with a MySQL relational database for efficient book, borrower, and checkout transaction persistence while adhering rigorously to Object-Oriented Programming (OOP) design patterns.',
      tags: ['Java', 'JavaFX', 'CSS', 'MySQL', 'OOP Design'],
      repo: 'https://github.com/Xipog77/Library_management'
    }
  };

  document.querySelectorAll('.open-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projKey = btn.getAttribute('data-project');
      const data = projectDetails[projKey];
      if (!data || !modalBackdrop) return;

      modalTitle.textContent = data.title;
      modalRole.textContent = data.role;
      modalDesc.textContent = data.desc;
      modalRepo.href = data.repo;

      modalTags.innerHTML = '';
      data.tags.forEach(t => {
        const span = document.createElement('span');
        span.className = 'project-tag-pill';
        span.textContent = t;
        modalTags.appendChild(span);
      });

      modalBackdrop.classList.add('active');
    });
  });

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      modalBackdrop?.classList.remove('active');
    });
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  // 6. Contact Form Handling (GitHub Pages Static Compatible)
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName')?.value.trim();
      const email = document.getElementById('contactEmail')?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim() || 'Thư liên hệ từ website portfolio';
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        if (formStatus) {
          formStatus.textContent = 'Vui lòng điền đầy đủ họ tên, email và nội dung tin nhắn!';
          formStatus.className = 'form-status-msg error';
        }
        return;
      }

      // Compose mailto link
      const mailtoUrl = `mailto:dongockhanh.vn@gmail.com?subject=${encodeURIComponent(subject + ' - từ ' + name)}&body=${encodeURIComponent(
        `Họ tên: ${name}\nEmail: ${email}\n\nNội dung:\n${message}`
      )}`;

      if (formStatus) {
        formStatus.innerHTML = `Cảm ơn bạn! Đang mở ứng dụng email của bạn để gửi trực tiếp tới <strong>dongockhanh.vn@gmail.com</strong>...`;
        formStatus.className = 'form-status-msg success';
      }

      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 600);
    });
  }

  // 7. Quick Copy Email Feature
  const copyEmailBtns = document.querySelectorAll('.copy-email-btn');
  copyEmailBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'dongockhanh.vn@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const origText = btn.innerHTML;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Đã sao chép!';
        setTimeout(() => {
          btn.innerHTML = origText;
        }, 2000);
      });
    });
  });
});
