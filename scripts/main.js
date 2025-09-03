// Use configuration
const CONFIG = window.__SITE_CONFIG__;

// Anti right-click (kept from original)
document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
});

// Elements
const loadingScreen = document.querySelector('.loading-screen');
const loadingContent = document.querySelector('.loading-content');

// ASCII Generator using API
async function generateAsciiArt(text) {
    try {
        const response = await fetch(`https://asciified.thelicato.io/api/v2/ascii?text=${encodeURIComponent(text)}&font=pagga`);
        console.log(`Fetching ASCII art for: ${text}`);
        if (response.ok) {
            const asciiText = await response.text();
            console.log('ASCII art received:', asciiText);
            return asciiText;
        } else {
            console.log('API response not ok, using fallback');
        }
    } catch (error) {
        console.log('ASCII API failed, using fallback:', error);
    }
    
    // Fallback ASCII art
    return ` ___    _    _ _     _   _               _ 
|_ _|__| |_ (_|_)   /_\\ (_)_ _  __ _ _ _(_)
 | |(_-< ' \\| | |  / _ \\| | ' \\/ _\` | '_| |
|___/__/_||_|_|_| /_/ \\_\\_|_||_\\__,_|_| |_|
                                            `;
}

// Set ASCII intro
async function setAsciiIntro() {
    const asciiText = await generateAsciiArt(CONFIG.profile.asciiIntro);
    loadingContent.textContent = asciiText;
}

// Initialize ASCII
setAsciiIntro();

// Music popup flow
setTimeout(showMusicPopup, 500);

function fadeOutLoadingScreen() {
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 800);
}

// Viewport height fix
function setViewportHeight() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}
window.addEventListener('resize', setViewportHeight);
setViewportHeight();

// Enhanced Typing effect with smooth transitions
class TxtType {
    constructor(element, textList, options = {}) {
        this.element = element;
        this.textList = textList;

        // Các tham số có thể tùy chỉnh
        this.typingSpeed   = options.typingSpeed   || 70;    // tốc độ gõ ký tự (ms)
        this.deletingSpeed = options.deletingSpeed || 100;   // tốc độ xóa ký tự (ms)
        this.holdTime      = options.holdTime      || 2000;  // giữ nguyên text khi gõ xong (ms)
        this.pauseBetween  = options.pauseBetween  || 800;   // nghỉ giữa 2 câu (ms)

        this.currentIndex = 0;
        this.currentText = '';
        this.isDeleting = false;

        this.element.innerHTML = '<span class="wrap"></span>';
        this.wrapElement = this.element.querySelector('.wrap');
        this.tick();
    }

    tick() {
        const fullText = this.textList[this.currentIndex % this.textList.length];

        this.currentText = this.isDeleting
            ? fullText.substring(0, this.currentText.length - 1)
            : fullText.substring(0, this.currentText.length + 1);

        this.wrapElement.textContent = this.currentText;

        let nextTickDelay;

        if (!this.isDeleting && this.currentText === fullText) {
            nextTickDelay = this.holdTime;  // chờ giữ nguyên text
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentIndex++;
            nextTickDelay = this.pauseBetween; // chờ trước khi gõ lại
        } else {
            nextTickDelay = this.isDeleting ? this.deletingSpeed : this.typingSpeed;
        }

        setTimeout(() => this.tick(), nextTickDelay);
    }
}


// Music controls
const musicToggle = document.getElementById('musicToggle');
const audio = document.getElementById('audioPlayer');
const volumeBar = document.getElementById('volumeBar');
const volumeProgress = document.getElementById('volumeProgress');
const volumeHandle = document.getElementById('volumeHandle');

function togglePlay() {
    if (audio.paused) { audio.play(); } else { audio.pause(); }
    musicToggle.classList.toggle('active');
}

function updateVolume(clientX) {
    const rect = volumeBar.getBoundingClientRect();
    const position = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const volume = position / rect.width;
    audio.volume = Math.max(0, Math.min(volume, 1));
    const percentage = volume * 100;
    volumeProgress.style.width = `${percentage}%`;
    volumeHandle.style.left = `${percentage}%`;
    const volumeIcon = document.querySelector('.volume-icon i');
    volumeIcon.className = 'fas ' + (volume === 0 ? 'fa-volume-mute' : volume < 0.5 ? 'fa-volume-down' : 'fa-volume-up');
}

// Volume events
volumeBar.addEventListener('mousedown', (e) => { volumeHandle.classList.add('dragging'); updateVolume(e.clientX); });
document.addEventListener('mousemove', (e) => { if (volumeHandle.classList.contains('dragging')) updateVolume(e.clientX); });
document.addEventListener('mouseup', () => { volumeHandle.classList.remove('dragging'); });
volumeBar.addEventListener('touchstart', (e) => { volumeHandle.classList.add('dragging'); updateVolume(e.touches[0].clientX); });
document.addEventListener('touchmove', (e) => { if (volumeHandle.classList.contains('dragging')) { updateVolume(e.touches[0].clientX); e.preventDefault(); } });
document.addEventListener('touchend', () => { volumeHandle.classList.remove('dragging'); });
audio.volume = 0.5;
updateVolume(volumeBar.getBoundingClientRect().left + (volumeBar.offsetWidth * 0.5));

// Redesigned Payment popup with better UX
function showPaymentInfo() {
    const overlay = document.createElement('div');
    overlay.className = 'popup-overlay';
    overlay.innerHTML = `
        <div class="popup-content">
            <div class="close-popup">✖</div>
            <div class="popup-header">
                <h2>Thông Tin Thanh Toán</h2>
                <p>Chọn phương thức thanh toán để xem chi tiết</p>
            </div>
            <div class="popup-buttons">
                <button class="payment-option" data-type="momo">MOMO</button>
                <button class="payment-option" data-type="sacombank">SACOMBANK</button>
            </div>
            <div class="payment-info" style="display:none;">
                <div class="qr-container">
                    <img class="qr-code" src="" alt="QR Code">
                </div>
                <div class="payment-details">
                    <div class="payment-detail" data-copy="">
                        <span class="payment-detail-label">Ngân hàng:</span>
                        <span class="payment-detail-value"></span>
                    </div>
                    <div class="payment-detail" data-copy="">
                        <span class="payment-detail-label">Số tài khoản:</span>
                        <span class="payment-detail-value"></span>
                    </div>
                    <div class="payment-detail" data-copy="">
                        <span class="payment-detail-label">Chủ tài khoản:</span>
                        <span class="payment-detail-value"></span>
                    </div>
                </div>
                <div class="copy-hint">Click vào thông tin để sao chép</div>
            </div>
        </div>`;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add('show'), 10);
    
    overlay.querySelector('.close-popup').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePopup(); });
    
    function closePopup(){ 
        overlay.classList.add('hide'); 
        setTimeout(()=>overlay.remove(), 500); 
    }
    
    overlay.querySelectorAll('.payment-option').forEach(btn => btn.addEventListener('click', function(){
        const type = this.getAttribute('data-type');
        showAccountInfo(type, overlay);
    }));
}

function showAccountInfo(type, overlay){
    const cfg = CONFIG.payments[type];
    if (!cfg) return;
    
    const infoDiv = overlay.querySelector('.payment-info');
    infoDiv.style.display = 'block';
    
    // Set QR code
    infoDiv.querySelector('.qr-code').src = cfg.qr;
    
    // Set payment details
    const details = [
        { label: 'Ngân hàng:', value: cfg.bank, copy: cfg.bank },
        { label: 'Số tài khoản:', value: cfg.accountNumber, copy: cfg.accountNumber },
        { label: 'Chủ tài khoản:', value: cfg.accountName, copy: cfg.accountName }
    ];
    
    const detailElements = infoDiv.querySelectorAll('.payment-detail');
    details.forEach((detail, index) => {
        const element = detailElements[index];
        element.querySelector('.payment-detail-label').textContent = detail.label;
        element.querySelector('.payment-detail-value').textContent = detail.value;
        element.setAttribute('data-copy', detail.copy);
        
        element.onclick = async () => {
            try { 
                await navigator.clipboard.writeText(detail.copy); 
                element.classList.add('copied');
                setTimeout(() => {
                    element.classList.remove('copied');
                }, 500);
            } catch(_) {
                console.log('Copy failed');
            }
        };
    });
}

// Music popup
function showMusicPopup(){
    const overlay = document.getElementById('musicPopupOverlay');
    overlay.innerHTML = `
        <div class="music-popup">
            <h2>Bạn có muốn bật nhạc không?</h2>
            <div class="music-popup-buttons">
                <button class="music-popup-button" onclick="enableMusic(true)">Có</button>
                <button class="music-popup-button" onclick="enableMusic(false)">Không</button>
            </div>
        </div>`;
    requestAnimationFrame(()=> overlay.classList.add('show'));
}

function enableMusic(enable){
    const overlay = document.getElementById('musicPopupOverlay');
    overlay.classList.add('hide');
    if (enable) { audio.play().catch(()=>{}); }
    setTimeout(fadeOutLoadingScreen, 300);
}
window.enableMusic = enableMusic; // expose for inline buttons

// Enhanced Dynamic Title with smooth typing effect
class DynamicTitle {
    constructor(names, baseTitle = 'About Me') {
        this.names = Array.isArray(names) && names.length ? names : ['Visitor'];
        this.baseTitle = baseTitle;
        this.currentIndex = 0;
        this.currentText = '';
        this.typingSpeed = 400;   // tốc độ gõ cơ bản
        this.deletingSpeed = 200;  // tốc độ xóa
        this.pauseTime = 2000;    // thời gian pause sau khi gõ xong
        this.start();
    }

    start() {
        this.showNext();
    }

    showNext() {
        const currentName = this.names[this.currentIndex];
        this.typeText(currentName, () => {
            setTimeout(() => this.deleteText(currentName, () => {
                // chuyển sang tên tiếp theo
                this.currentIndex = (this.currentIndex + 1) % this.names.length;
                this.showNext();
            }), this.pauseTime);
        });
    }

    typeText(text, callback) {
        if (this.currentText.length < text.length) {
            this.currentText = text.substring(0, this.currentText.length + 1);
            document.title = `${this.currentText} · ${this.baseTitle}`;
            setTimeout(() => this.typeText(text, callback), this.typingSpeed);
        } else if (callback) {
            callback();
        }
    }

    deleteText(text, callback) {
        if (this.currentText.length > 0) {
            this.currentText = text.substring(0, this.currentText.length - 1);
            document.title = `${this.currentText} · ${this.baseTitle}`;
            const speed = this.deletingSpeed + Math.random() * 30;
            setTimeout(() => this.deleteText(this.currentText, callback), speed);
        } else if (callback) {
            callback();
        }
    }
}

// Initialize dynamic title
let dynamicTitle;

// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
    // Inject static assets from config
    document.querySelector('.banner').src = CONFIG.profile.banner;
    document.querySelector('.avatar').src = CONFIG.profile.avatar;
    document.querySelector('header h1').textContent = CONFIG.profile.displayName;

    // Typewriter text from config
    document.querySelectorAll('.typewrite').forEach(el => {
        el.setAttribute('data-type', JSON.stringify(CONFIG.profile.subtitleRotations));
        el.setAttribute('data-period', '3000');
        new TxtType(el, CONFIG.profile.subtitleRotations, {
            typingSpeed: 70,     // tốc độ gõ
            deletingSpeed: 30,   // tốc độ xóa
            holdTime: 2500,      // giữ nguyên text
            pauseBetween: 500   // nghỉ giữa các câu
        });
    });

    // Social links with proper Valorant and Roblox icons
    const socialGrid = document.querySelector('.social-grid');
    if (socialGrid){
        const items = [
            { href: CONFIG.social.discordUser, cls: 'discord', icon: '<i class="fab fa-discord"></i>', label: 'Discord' },
            { href: CONFIG.social.facebook, cls: 'facebook', icon: '<i class="fab fa-facebook"></i>', label: 'Facebook' },
            { href: CONFIG.social.youtube, cls: 'youtube', icon: '<i class="fab fa-youtube"></i>', label: 'YouTube' },
            { href: CONFIG.social.github, cls: 'github', icon: '<i class="fab fa-github"></i>', label: 'GitHub' },
            { href: CONFIG.social.valorant, cls: 'valorant', icon: '<img src="assets/icons/valorant.png" alt="Valorant">', label: 'Valorant' },
            { href: CONFIG.social.roblox, cls: 'roblox', icon: '<img src="assets/icons/roblox.png" alt="Roblox">', label: 'Roblox' }
        ];
        socialGrid.innerHTML = items.map(item => `
            <a href="${item.href}" class="social-link ${item.cls}" target="_blank" rel="noopener noreferrer">
                ${item.icon}
                <span class="no-select">${item.label}</span>
            </a>`).join('');
    }

    // Payment button
    document.querySelectorAll('.show-payment-info').forEach(el => el.addEventListener('click', showPaymentInfo));

    // Initialize enhanced dynamic title
    dynamicTitle = new DynamicTitle(CONFIG.profile.names, CONFIG.profile.title);
});


