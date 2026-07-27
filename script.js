// ===== 1. منوی همبرگر =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        hamburger.classList.remove('active');
    });
});

// ===== 2. هدر اسکرول =====
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===== 3. شمارشگر آمار =====
const statNumbers = document.querySelectorAll('.stat-number');
const animateStats = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.count, 10);
            let current = 0;
            const step = Math.ceil(target / 50);
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = current;
                }
            }, 30);
            observer.unobserve(el);
        }
    });
};
const observer = new IntersectionObserver(animateStats, { threshold: 0.5 });
statNumbers.forEach(num => observer.observe(num));

// ===== 4. گالری (اصلاح شده: تصویر خالی حذف شده) =====
const galleryItems = [
    // طبیعت
    { src: 'https://s21.uupload.ir/files/chaybagh/47413529-7788-l__4667.jpg', category: 'nature' },
    { src: 'https://s21.uupload.ir/files/chaybagh/47485241-3397-l__1644.jpg', category: 'nature' },
    // تصویر خالی حذف شد ← اینجا دیگر '{ src: '', category: 'nature' }' وجود ندارد
    // کشاورزی
    { src: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&h=450&fit=crop&crop=center', category: 'agriculture' },
    { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=450&fit=crop&crop=center', category: 'agriculture' },
    { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=450&fit=crop&crop=center', category: 'agriculture' },
    // اماکن
    { src: 'https://s25.uupload.ir/files/chaybagh/images.jpeg', category: 'places' },
    { src: 'https://s21.uupload.ir/files/chaybagh/IMG_20260724_222449.jpg', category: 'places' },
    { src: 'https://s25.uupload.ir/files/chaybagh/IMG_20260724_222432.jpg', category: 'places' },
    { src: 'https://s25.uupload.ir/files/chaybagh/IMG_20260724_222353.jpg', category: 'places' },
];

const galleryGrid = document.getElementById('galleryGrid');
const galleryFilter = document.getElementById('galleryFilter');
const toggleBtn = document.getElementById('galleryToggleBtn');
let isFullMode = false;
let currentCategory = 'all';

function getCategoryLabel(cat) {
    const map = { 'nature': 'طبیعت', 'agriculture': 'کشاورزی', 'places': 'اماکن' };
    return map[cat] || cat;
}

function renderGallery(category) {
    const filtered = category === 'all' 
        ? galleryItems 
        : galleryItems.filter(item => item.category === category);
    
    galleryGrid.innerHTML = '';
    filtered.forEach((item) => {
        const div = document.createElement('div');
        div.className = 'gallery-item';
        div.innerHTML = `
            <img src="${item.src}" alt="" loading="lazy" />
            <div class="overlay">
                <span class="category-badge">${getCategoryLabel(item.category)}</span>
            </div>
        `;
        div.addEventListener('click', () => {
            const realIndex = galleryItems.indexOf(item);
            openLightbox(realIndex);
        });
        galleryGrid.appendChild(div);
    });

    if (isFullMode) {
        galleryGrid.classList.remove('compact');
        galleryGrid.classList.add('full');
    } else {
        galleryGrid.classList.remove('full');
        galleryGrid.classList.add('compact');
    }
}

renderGallery('all');

toggleBtn.addEventListener('click', () => {
    isFullMode = !isFullMode;
    
    if (isFullMode) {
        galleryGrid.classList.remove('compact');
        galleryGrid.classList.add('full');
        galleryFilter.style.display = 'flex';
        toggleBtn.innerHTML = '<i class="fas fa-compress-alt"></i> بستن گالری';
        toggleBtn.classList.add('btn-outline');
        toggleBtn.classList.remove('btn-primary');
        document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
    } else {
        galleryGrid.classList.remove('full');
        galleryGrid.classList.add('compact');
        galleryFilter.style.display = 'none';
        toggleBtn.innerHTML = '<i class="fas fa-images"></i> مشاهده همه تصاویر';
        toggleBtn.classList.remove('btn-outline');
        toggleBtn.classList.add('btn-primary');
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        document.querySelector('.filter-btn[data-filter="all"]')?.classList.add('active');
        currentCategory = 'all';
        renderGallery('all');
    }
});

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!isFullMode) return;
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.filter;
        renderGallery(currentCategory);
    });
});

// ===== 5. لایت‌باکس =====
// ... (بدون تغییر) ...

// ===== 6. کارت‌های رزرو =====
// ... (بدون تغییر) ...

// ===== 7. مودال رزرو =====
// ... (بدون تغییر) ...

// ===== 8. فرم تماس =====
// ... (بدون تغییر) ...

// ===== 9. دکمه برگشت به بالا =====
// ... (بدون تغییر) ...

console.log('✅ پروژه چای‌باغ با موفقیت بارگذاری شد!');
