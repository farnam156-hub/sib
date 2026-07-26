// ============================================================
// 1. منوی موبایل (همبرگر)
// ============================================================
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('show');
    hamburger.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
});

// بستن منوی موبایل با کلیک روی لینک‌ها
mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('show');
        hamburger.classList.remove('active');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden', 'true');
    });
});

// ============================================================
// 2. مگامنو (باز/بستن با هاور و کلیک برای موبایل)
// ============================================================
const megaTrigger = document.getElementById('megaTrigger');
let megaTimeout;

megaTrigger.addEventListener('mouseenter', () => {
    clearTimeout(megaTimeout);
    megaTrigger.classList.add('open');
    megaTrigger.querySelector('.nav-link').setAttribute('aria-expanded', 'true');
});
megaTrigger.addEventListener('mouseleave', () => {
    megaTimeout = setTimeout(() => {
        megaTrigger.classList.remove('open');
        megaTrigger.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
    }, 200);
});
// برای لمس در موبایل: کلیک باز/بستن می‌کند
megaTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = megaTrigger.classList.toggle('open');
    megaTrigger.querySelector('.nav-link').setAttribute('aria-expanded', isOpen);
});

// ============================================================
// 3. اسکرول هدر (تغییر شفافیت)
// ============================================================
const header = document.getElementById('header');
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
});

// ============================================================
// 4. انیمیشن شمارش آمار (با Intersection Observer)
// ============================================================
const statNumbers = document.querySelectorAll('.stat-num');

const animateStats = (entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.getAttribute('data-count'), 10);
            let current = 0;
            const increment = Math.ceil(target / 60);
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    el.textContent = target;
                    clearInterval(timer);
                } else {
                    el.textContent = current;
                }
            }, 25);
            observer.unobserve(el);
        }
    });
};

const observer = new IntersectionObserver(animateStats, { threshold: 0.5 });
statNumbers.forEach(num => observer.observe(num));

// ============================================================
// 5. گالری (ساخت آیتم‌ها با JS و لایت‌باکس)
// ============================================================
const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=450&fit=crop&crop=center', caption: 'چشم‌انداز بهاری' },
    { src: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&h=450&fit=crop&crop=center', caption: 'چای‌زار پله‌ای' },
    { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=450&fit=crop&crop=center', caption: 'پل تاریخی شاپور' },
    { src: 'https://images.unsplash.com/photo-1440589473619-3cde28941638?w=600&h=450&fit=crop&crop=center', caption: 'جنگل هیرکانی' },
    { src: 'https://images.unsplash.com/photo-1558618666-fcd25c85f3e9?w=600&h=450&fit=crop&crop=center', caption: 'جشنواره چای' },
    { src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=450&fit=crop&crop=center', caption: 'نمای رودخانه' },
];

const galleryGrid = document.getElementById('galleryGrid');
galleryImages.forEach((img, index) => {
    const div = document.createElement('div');
    div.className = 'gallery-item';
    div.innerHTML = `
        <img src="${img.src}" alt="${img.caption}" loading="lazy" />
        <div class="gi-overlay"><span>${img.caption}</span></div>
    `;
    div.addEventListener('click', () => openLightbox(index));
    galleryGrid.appendChild(div);
});

// ============================================================
// 6. لایت‌باکس
// ============================================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
let currentImageIndex = 0;

function openLightbox(index) {
    currentImageIndex = index;
    updateLightbox();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function updateLightbox() {
    const img = galleryImages[currentImageIndex];
    lightboxImg.src = img.src;
    lightboxImg.alt = img.caption;
    lightboxCaption.textContent = img.caption;
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
}
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
    updateLightbox();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
});

// ============================================================
// 7. رزرو اقامت (کارت‌ها و مودال)
// ============================================================
const bookings = [
    { name: 'کلبه چای‌کار', price: 850000, capacity: 4, img: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=600&h=400&fit=crop&crop=center', features: ['چای‌زار', 'آبگرم', 'اینترنت'] },
    { name: 'خانه بوم‌گردی مهر', price: 620000, capacity: 3, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&h=400&fit=crop&crop=center', features: ['سنتی', 'حیاط', 'پارکینگ'] },
    { name: 'ویلای جنگلی', price: 1200000, capacity: 6, img: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?w=600&h=400&fit=crop&crop=center', features: ['جنگل', 'استخر', 'کباب‌پز'] },
];

const bookingList = document.getElementById('bookingList');
bookings.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = 'booking-card';
    card.innerHTML = `
        <div class="bc-img"><img src="${item.img}" alt="${item.name}" loading="lazy" /></div>
        <div class="bc-body">
            <div class="bc-title">${item.name}</div>
            <div class="bc-features">
                <span class="bc-feat"><i class="fas fa-user"></i> ${item.capacity} نفر</span>
                ${item.features.map(f => `<span class="bc-feat"><i class="fas fa-check"></i> ${f}</span>`).join('')}
            </div>
            <div class="bc-price">
                <span class="price">${item.price.toLocaleString()}</span>
                <span class="unit">تومان / شب</span>
            </div>
            <button class="btn btn-primary btn-book" data-index="${index}">رزرو</button>
        </div>
    `;
    bookingList.appendChild(card);
});

// مودال رزرو
const modalOverlay = document.getElementById('bookingModal');
const modalClose = document.getElementById('modalClose');
const bookingForm = document.getElementById('bookingForm');

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-book')) {
        const index = e.target.dataset.index;
        // ذخیره نام اقامتگاه در دیتا یا نمایش در مودال (اختیاری)
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
});

function closeModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // ذخیره در localStorage
    const formData = {
        name: document.getElementById('bookName').value.trim(),
        phone: document.getElementById('bookPhone').value.trim(),
        checkin: document.getElementById('bookCheckin').value,
        checkout: document.getElementById('bookCheckout').value,
        guests: document.getElementById('bookGuests').value,
        message: document.getElementById('bookMessage').value.trim(),
        date: new Date().toISOString()
    };
    if (!formData.name || !formData.phone || !formData.checkin || !formData.checkout) {
        alert('لطفاً تمام فیلدهای ضروری را پر کنید.');
        return;
    }
    // ذخیره در localStorage
    let reservations = JSON.parse(localStorage.getItem('chaybagh_reservations')) || [];
    reservations.push(formData);
    localStorage.setItem('chaybagh_reservations', JSON.stringify(reservations));
    alert('رزرو شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.');
    bookingForm.reset();
    closeModal();
});

// ============================================================
// 8. فرم تماس (ذخیره در localStorage)
// ============================================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {
        name: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value.trim(),
        date: new Date().toISOString()
    };
    if (!formData.name || !formData.email || !formData.message) {
        alert('لطفاً نام، ایمیل و پیام را پر کنید.');
        return;
    }
    let messages = JSON.parse(localStorage.getItem('chaybagh_contacts')) || [];
    messages.push(formData);
    localStorage.setItem('chaybagh_contacts', JSON.stringify(messages));
    alert('پیام شما با موفقیت ارسال شد. سپاسگزاریم.');
    contactForm.reset();
});

// ============================================================
// 9. بستن منوی موبایل با کلیک بیرون
// ============================================================
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header') && !e.target.closest('.mobile-menu')) {
        if (mobileMenu.classList.contains('show')) {
            mobileMenu.classList.remove('show');
            hamburger.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            mobileMenu.setAttribute('aria-hidden', 'true');
        }
    }
});

console.log('✅ چای‌باغ با موفقیت بارگذاری شد!');
