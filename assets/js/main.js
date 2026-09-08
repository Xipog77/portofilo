/**
 * Main JavaScript for Đỗ Ngọc Khánh Portfolio
 * Ultra-lightweight, 0 external dependency for core features, GitHub Pages ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typed Text Effect
  const typedTarget = document.querySelector('.typed-text');
  const roles = [
    'Kỹ sư Thực tập sinh @ Viettel Networks',
    'Student Researcher @ SATLab (VNU-UET)',
    'Cloud Infrastructure & OpenStack / OVN Engineer',
    'High-Concurrency Backend Developer (Go / C++ / Python)',
    'Top Viettel Digital Talent 2026 (Cloud Track)'
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
    viettel_ovn: {
      title: 'Giải Pháp Giám Sát Hạ Tầng Mạng OVN & Load Balancer OpenStack',
      role: 'Kỹ sư Thực tập sinh @ Viettel Networks (Phòng Hạ tầng Cloud - VDT 2026)',
      desc: 'Nghiên cứu cơ chế mạng ảo hóa OVN SDN và cân bằng tải phân tán Layer 4 trong nhân Linux (Octavia OVN Provider). Phát triển mô-đun custom exporter (Python 3) kết nối OVSDB JSON-RPC (TCP 6642), đọc bảng Service_Monitor, đo độ trễ đồng bộ (Sync Lag) và giám sát dung lượng phiên conntrack. Triển khai kiến trúc Hybrid Monitoring tích hợp VictoriaMetrics TSDB, vmagent (đệm đĩa WAL trạm biên), Alertmanager (bắn cảnh báo Telegram NOC < 8s) và Dashboard Grafana 3 tầng phân cấp. Thử nghiệm trên máy chủ Dell PowerEdge R650 25GbE đạt phụ tải CPU ≤ 1.2%, RAM ≈ 55MB, phát hiện lỗi backend trong 2.4s.',
      tags: ['Viettel Networks', 'OpenStack Caracal', 'OVN SDN', 'Python 3', 'OVSDB JSON-RPC', 'Linux Conntrack', 'VictoriaMetrics', 'Grafana', 'Docker'],
      repo: 'https://github.com/Viettel-Digital-Talent-Program-2026/LB-OVN'
    },
    vdt_cloud: {
      title: 'OpenStack for Game Hosting (VDT 2026 Cloud Project)',
      role: 'Cloud Architect & DevOps Developer',
      desc: 'Hệ thống đám mây chuyên dụng tự động hóa cấp phát, quản lý vòng đời và điều phối tài nguyên máy chủ Dedicated Game Servers (Minecraft, CS2, Palworld) trên nền tảng Private Cloud. Tích hợp OpenStack (Keystone, Glance, Nova, Neutron, Cinder) với mạng ảo hóa OVN SDN (DVR Geneve tunnels) và hệ thống lưu trữ phân tán Ceph RBD (Copy-on-Write). Cung cấp Self-service Web Portal (Flask) cho phép khởi tạo máy chủ với Cloud-init tự động trong 1 click. Toàn bộ hạ tầng lab (Vagrant multi-node) được triển khai tự động hóa 100% bằng Ansible Playbook.',
      tags: ['OpenStack', 'Ceph RBD', 'OVN DVR', 'Ansible Automation', 'Flask Portal', 'Cloud-init', 'Vagrant', 'KVM/QEMU'],
      repo: 'https://github.com/Xipog77/VDT_cloud'
    },
    ticketrush: {
      title: 'TicketRush — Nền Tảng Bán Vé Sự Kiện Tải Cao (High-Concurrency E-Ticketing)',
      role: 'Backend & High-Concurrency Engineer',
      desc: 'Nền tảng đặt vé trực tuyến được thiết kế đặc thù cho kịch bản "Flash Sale" — nơi hàng ngàn người dùng tranh vé đồng thời trong thời gian cực ngắn. Áp dụng Domain-Driven Design (DDD), hàng đợi ảo ưu tiên (Virtual Waiting Room Queue) trên Redis 7 để điều phối traffic spikes, cơ chế khóa hàng ở tầng cơ sở dữ liệu (Pessimistic Locking SELECT FOR UPDATE với PostgreSQL 15 & GORM) đảm bảo nguyên tử tính (Atomic Booking) tuyệt đối không bán trùng ghế. Cập nhật trạng thái sơ đồ ghế thời gian thực qua WebSockets và tự sinh mã vé QR số hóa an toàn.',
      tags: ['Golang', 'Gin Framework', 'Redis 7 Virtual Queue', 'PostgreSQL 15', 'Pessimistic Locking', 'WebSockets', 'React 18', 'Docker'],
      repo: 'https://github.com/sines05/TicketRush'
    },
    hododaman: {
      title: 'Quản Lý Thông Tin Dòng Họ — Họ Đỗ Đàm An (Nam Định)',
      role: 'Full-stack Web Architect',
      desc: 'Nền tảng quản lý gia phả và số hóa lịch sử dòng họ hiện đại dành cho Họ Đỗ Đàm An (Hải Hậu, Nam Định). Ứng dụng React Flow (@xyflow/react) kết hợp thuật toán đồ thị phân cấp Dagre.js để biểu diễn sơ đồ tộc phả trực quan hỗ trợ tới 9+ đời con cháu với khả năng mở rộng/thu gọn đệ quy. Tích hợp hồ sơ thành viên tiểu sử chi tiết (trình soạn thảo TipTap rich-text), Bức tường Ký ức (Memory Wall), lịch sự kiện song song Dương lịch - Âm lịch, quản lý quỹ họ công khai minh bạch. Xây dựng trên nền tảng TanStack Start (React 19 SSR), Tailwind CSS v4, PostgreSQL trên Docker với Drizzle ORM.',
      tags: ['TanStack Start (React 19)', 'Tailwind CSS v4', 'PostgreSQL', 'Drizzle ORM', 'React Flow', 'Dagre.js', 'TipTap Editor', 'Docker'],
      repo: 'https://github.com/Xipog77/HoDoDamAn'
    },
    caroud: {
      title: 'Caroud — High-Availability Cloud-Native Caro Game',
      role: 'Project Manager & Solution Architect (Nhóm 4)',
      desc: 'Dẫn dắt thiết kế kiến trúc và triển khai nền tảng game Caro phân tán, tính sẵn sàng cao trên AWS Cloud. Phân rã hệ thống theo kiến trúc Microservices gồm các pod xác thực, matchmaking thời gian thực qua WebSocket và engine lưu trữ trạng thái bàn cờ phân tán với Redis. Điều hành toàn diện quy trình SDLC, thiết lập CI/CD và giám sát hệ thống.',
      tags: ['AWS Cloud', 'Microservices', 'Docker', 'WebSockets', 'Redis', 'High Availability', 'Team Leader'],
      repo: 'https://github.com/Xipog77/Caroud'
    },
    hcorap: {
      title: 'HCORAP — Enhanced SAT-based Framework for Home Care Resource Allocation',
      role: 'Student Researcher @ SATLab (VNU-UET)',
      desc: 'Đề tài nghiên cứu tối ưu hóa tổ hợp trong lĩnh vực y tế gia đình. Mô hình hóa bài toán điều phối nhân lực và phương tiện y tế thành công thức mệnh đề SAT. Triển khai các ràng buộc phá vỡ đối xứng (symmetry-breaking constraints) và giải thuật giải SAT gia tăng (incremental SAT solving) giúp thu hẹp 68% không gian tìm kiếm và tăng tốc độ hội tụ nghiệm tối ưu.',
      tags: ['SAT Solver', 'Combinatorial Optimization', 'Python', 'Algorithms', 'SATLab'],
      repo: 'https://github.com/Xipog77/HCORAP'
    },
    ralb: {
      title: 'RALB — SAT-driven Optimization for Robotic Assembly Line Balancing',
      role: 'Student Researcher @ SATLab (VNU-UET)',
      desc: 'Nghiên cứu mô hình giải chính xác dựa trên SAT cho bài toán cân bằng dây chuyền lắp ráp bằng cánh tay robot (RALB). Mô hình hóa các ràng buộc trạm làm việc, thứ tự công đoạn và gán công cụ robot thành logic mệnh đề, đạt được sự phân bổ khối lượng công việc tối ưu giữa các trạm sản xuất.',
      tags: ['SATLab Research', 'Robotics Line Balancing', 'Constraint Programming', 'Optimization'],
      repo: 'https://github.com/Xipog77/RALB'
    },
    defend: {
      title: 'Defend the Kingdom — 2D Tower Defense Game Engine',
      role: 'Full-stack Game Developer',
      desc: 'Tự lập trình toàn bộ game thủ thành 2D từ đầu bằng C++ hiện đại và SDL2. Thiết kế vòng lặp game loop tùy chỉnh, giải thuật tìm đường đường đi của quái vật, cơ chế va chạm vật lý và quản trị bộ nhớ thủ công tối ưu hóa hiệu năng.',
      tags: ['C++', 'SDL2', 'Game Engine', 'Memory Management', 'Data Structures'],
      repo: 'https://github.com/Xipog77/Defend-the-Kingdom'
    },
    library: {
      title: 'Library Management System — JavaFX & MySQL',
      role: 'Frontend Developer (Nhóm 3)',
      desc: 'Xây dựng giao diện ứng dụng desktop quản lý thư viện bằng JavaFX và CSS mô-đun hóa. Kết nối cơ sở dữ liệu MySQL lưu trữ thông tin sách, độc giả và mượn trả, tuân thủ nghiêm ngặt các mẫu thiết kế hướng đối tượng (OOP).',
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
