/**
 * Main JavaScript for Đỗ Ngọc Khánh Portfolio
 * Ultra-lightweight, 0 external dependency for core features, GitHub Pages ready
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Typed Text Effect
  const typedTarget = document.querySelector('.typed-text');
  const roles = [
    'Cloud Engineer',
    'Cloud Infrastructure & Networking',
    'OpenStack & AWS Solution Architect',
    'Distributed Systems Enthusiast'
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

  // 2. Project Table Pagination
  const tableRows = Array.from(document.querySelectorAll('.project-table-row'));
  const prevBtn = document.getElementById('prevPageBtn');
  const nextBtn = document.getElementById('nextPageBtn');
  const pageNumbersContainer = document.getElementById('paginationNumbers');
  const paginationInfo = document.getElementById('paginationInfo');

  const ITEMS_PER_PAGE = 3;
  let currentPage = 1;

  function renderTablePage() {
    const totalItems = tableRows.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);

    // Hide all rows first
    tableRows.forEach(row => {
      row.style.display = 'none';
    });

    // Show only rows for current page
    tableRows.forEach((row, index) => {
      if (index >= startIndex && index < endIndex) {
        row.style.display = '';
        row.style.animation = 'fadeInRow 0.25s ease forwards';
      }
    });

    // Update pagination info label
    if (paginationInfo) {
      if (totalItems === 0) {
        paginationInfo.textContent = 'Chưa có dự án';
      } else {
        paginationInfo.textContent = `Hiển thị ${startIndex + 1} - ${endIndex} trên tổng số ${totalItems} dự án`;
      }
    }

    // Update Prev / Next buttons state
    if (prevBtn) {
      prevBtn.disabled = (currentPage <= 1);
    }
    if (nextBtn) {
      nextBtn.disabled = (currentPage >= totalPages);
    }

    // Render numbered page buttons
    if (pageNumbersContainer) {
      pageNumbersContainer.innerHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = `pagination-num-btn ${i === currentPage ? 'active' : ''}`;
        btn.textContent = i;
        btn.setAttribute('aria-label', `Trang ${i}`);
        btn.addEventListener('click', () => {
          if (currentPage !== i) {
            currentPage = i;
            renderTablePage();
          }
        });
        pageNumbersContainer.appendChild(btn);
      }
    }
  }

  // Handle Prev button
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderTablePage();
      }
    });
  }

  // Handle Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(tableRows.length / ITEMS_PER_PAGE);
      if (currentPage < totalPages) {
        currentPage++;
        renderTablePage();
      }
    });
  }

  // Initial render of the table
  if (tableRows.length > 0) {
    renderTablePage();
  }

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
      title: 'OpenStack OVN & Load Balancer Monitoring',
      role: 'Cloud Engineer — Viettel Digital Talent 2026',
      desc: 'Phát triển giải pháp giám sát (observability) cho OpenStack OVN và OVN Load Balancers nhằm giải quyết khoảng trống trong giám sát và quản trị mạng. Triển khai các metric exporters, xử lý viễn trắc qua VictoriaMetrics Agent, và thiết lập hệ thống cảnh báo tự động cùng hệ thống dashboard Grafana trực quan, toàn diện.',
      tags: ['Viettel Digital Talent 2026', 'OpenStack', 'OVN SDN', 'VictoriaMetrics Agent', 'Grafana', 'Python', 'Linux'],
      repo: 'https://github.com/Viettel-Digital-Talent-Program-2026/LB-OVN'
    },
    caroud: {
      title: 'Caroud — Cloud-Native Caro Game',
      role: 'Project Manager & Solution Architect (2025)',
      desc: 'Dẫn dắt phát triển nền tảng game Caro cloud-native độ sẵn sàng cao trên AWS theo kiến trúc microservices nhằm đảm bảo khả năng mở rộng. Quản lý nhóm 4 thành viên, bao quát toàn bộ vòng đời phát triển phần mềm (SDLC) trong khuôn khổ môn Điện toán Đám mây tại VNU-UET.',
      tags: ['AWS Cloud', 'Microservices', 'Docker', 'WebSockets', 'Redis', 'High Availability', 'SDLC'],
      repo: 'https://github.com/Xipog77/Caroud'
    },
    library: {
      title: 'Library Management System',
      role: 'Frontend Developer (2024)',
      desc: 'Thiết kế và xây dựng giao diện ứng dụng quản lý thư viện trực quan bằng JavaFX và CSS, tích hợp cơ sở dữ liệu MySQL lưu trữ và truy vấn dữ liệu hiệu quả. Phối hợp cùng nhóm 3 thành viên hiện thực hóa các nguyên lý lập trình hướng đối tượng (OOP) cốt lõi.',
      tags: ['Java', 'JavaFX', 'CSS', 'MySQL', 'OOP Principles'],
      repo: 'https://github.com/Xipog77/Library_management'
    },
    defend: {
      title: 'Defend the Kingdom — 2D Tower Defense Game',
      role: 'Full-stack Developer (2023)',
      desc: 'Phát triển hoàn chỉnh trò chơi thủ thành 2D từ đầu bằng C++ và thư viện đồ họa SDL2. Hiện thực logic trò chơi phức tạp, áp dụng các kỹ thuật quản lý bộ nhớ nâng cao và tối ưu hóa hiệu năng chuyên sâu.',
      tags: ['C++', 'SDL2', 'Game Engine', 'Memory Management', 'Performance Optimization'],
      repo: 'https://github.com/Xipog77/Defend-the-Kingdom'
    },
    hcorap: {
      title: 'Continuity-First Lexicographic Optimization for Home-Care Resource Allocation',
      role: 'Student Researcher @ SATLab (VNU-UET) — Accepted at ICIIT 2027',
      desc: 'Công trình nghiên cứu được chấp nhận tại Hội thảo quốc tế ICIIT 2027 (The 12th International Conference on Intelligent Information Technology). Giới thiệu mô hình LEX-COS (lexicographic MaxSAT) cho bài toán HCORAP, ưu tiên duy trì tính liên tục của người chăm sóc và giảm thiểu giờ làm thêm trước khi tối ưu độ tương thích giữa nhân viên và dịch vụ.',
      tags: ['ICIIT 2027', 'SATLab', 'Lexicographic MaxSAT', 'HCORAP', 'Combinatorial Optimization', 'Python'],
      repo: 'https://github.com/Xipog77/HCORAP'
    },
    ralb: {
      title: 'SAT-driven Optimization for Robotic Assembly Line Balancing (RALB)',
      role: 'Student Researcher @ SATLab (VNU-UET)',
      desc: 'Đề xuất phương pháp tiếp cận đột phá dựa trên bộ giải SAT cho bài toán cân bằng dây chuyền lắp ráp bằng robot trong môi trường công nghiệp, tối ưu hóa phân bổ công đoạn sản xuất và năng suất.',
      tags: ['SATLab Research', 'Robotics Line Balancing', 'SAT Solver', 'Constraint Programming'],
      repo: 'https://github.com/Xipog77/RALB'
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

  // 4. Quick Inline Copy Feature (Email & Phone)
  function setupCopyButton(btn, textToCopy) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const origHTML = btn.innerHTML;

      function showCopied() {
        btn.classList.add('copied');
        const hasTextSpan = btn.querySelector('.copy-text');
        if (hasTextSpan) {
          btn.innerHTML = '<i class="fa-solid fa-check"></i> <span class="copy-text">Đã chép!</span>';
        } else {
          btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        }
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.innerHTML = origHTML;
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(textToCopy)
          .then(showCopied)
          .catch(() => fallbackCopy(textToCopy, showCopied));
      } else {
        fallbackCopy(textToCopy, showCopied);
      }
    });
  }

  function fallbackCopy(text, callback) {
    const tempInput = document.createElement('textarea');
    tempInput.value = text;
    tempInput.setAttribute('readonly', '');
    tempInput.style.position = 'fixed';
    tempInput.style.left = '-9999px';
    tempInput.style.top = '0';
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, 99999);
    try {
      const successful = document.execCommand('copy');
      if (successful) callback();
    } catch (err) {
      console.error('Fallback copy failed:', err);
    }
    document.body.removeChild(tempInput);
  }

  // Setup Email copy buttons
  document.querySelectorAll('.copy-email-btn').forEach(btn => {
    setupCopyButton(btn, 'dongockhanh.vn@gmail.com');
  });

  // Setup Phone copy buttons
  document.querySelectorAll('.copy-phone-btn').forEach(btn => {
    setupCopyButton(btn, '+84365639805');
  });
});
