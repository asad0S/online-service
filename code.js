// ==================== Navigation ====================
document.addEventListener('DOMContentLoaded', () => {
    
    // Navigation between pages
    const navLinks = document.querySelectorAll('.nav-link:not(.external)');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // فقط برای لینک‌های داخلی (غیر external)
            if (link.classList.contains('external')) {
                return; // اجازه می‌دهیم لینک خارجی به صورت عادی کار کند
            }
            
            // Remove active class from all links and pages
            navLinks.forEach(l => l.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked link and corresponding page
            link.classList.add('active');
            const pageId = link.getAttribute('data-page');
            document.getElementById(pageId).classList.add('active');
            
            // Close mobile menu if open
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('show');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // تنظیم مجدد ارتفاع پنجره مشاوره
            setTimeout(adjustConsultationWindowHeight, 100);
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navMenu.classList.remove('show');
        }
    });
    
    // Close modals when clicking close buttons
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const closeConsultationReplyBtn = document.getElementById('closeConsultationReplyBtn');
    
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', () => {
            document.getElementById('requestDetailsModal').classList.remove('active');
        });
    }
    
    if (closeConsultationReplyBtn) {
        closeConsultationReplyBtn.addEventListener('click', () => {
            document.getElementById('consultationReplyModal').classList.remove('active');
        });
    }
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        const requestModal = document.getElementById('requestDetailsModal');
        const consultationModal = document.getElementById('consultationReplyModal');
        
        if (requestModal && e.target === requestModal) {
            requestModal.classList.remove('active');
        }
        
        if (consultationModal && e.target === consultationModal) {
            consultationModal.classList.remove('active');
        }
    });
    
    // ==================== رفتن به صفحه ویزا ====================
    window.goToVisaPage = function() {
        // پیدا کردن لینک درخواست ویزا در نوار منو
        const visaLink = document.querySelector('a[data-page="visa"]');
        
        if (visaLink) {
            // حذف active از همه لینک‌های داخلی
            const internalLinks = document.querySelectorAll('.nav-link:not(.external)');
            internalLinks.forEach(link => link.classList.remove('active'));
            
            // حذف active از همه صفحات
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // اضافه کردن active به لینک و صفحه ویزا
            visaLink.classList.add('active');
            document.getElementById('visa').classList.add('active');
            
            // بستن منوی موبایل اگر باز است
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('show');
            
            // اسکرول به بالای صفحه
            window.scrollTo(0, 0);
            
            // تنظیم مجدد ارتفاع پنجره مشاوره
            setTimeout(adjustConsultationWindowHeight, 100);
        }
    }
    
    // ==================== رفتن به صفحه تماس با ما ====================
    window.goToContactPage = function() {
        // پیدا کردن لینک تماس با ما در نوار منو
        const contactLink = document.querySelector('a[data-page="contact"]');
        
        if (contactLink) {
            // حذف active از همه لینک‌های داخلی
            const internalLinks = document.querySelectorAll('.nav-link:not(.external)');
            internalLinks.forEach(link => link.classList.remove('active'));
            
            // حذف active از همه صفحات
            const pages = document.querySelectorAll('.page');
            pages.forEach(page => page.classList.remove('active'));
            
            // اضافه کردن active به لینک و صفحه تماس
            contactLink.classList.add('active');
            document.getElementById('contact').classList.add('active');
            
            // بستن منوی موبایل اگر باز است
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.remove('show');
            
            // اسکرول به بالای صفحه
            window.scrollTo(0, 0);
            
            // تنظیم مجدد ارتفاع پنجره مشاوره
            setTimeout(adjustConsultationWindowHeight, 100);
        }
    }
    
    // اضافه کردن event listener به دیو اجرای ویزا
    const visaServiceDiv = document.querySelector('.clickable-visa');
    if (visaServiceDiv) {
        visaServiceDiv.addEventListener('click', goToVisaPage);
    }
    
    // اضافه کردن event listener به دیو پاسپورت
    const passportServiceDiv = document.querySelector('.clickable-passport');
    if (passportServiceDiv) {
        passportServiceDiv.addEventListener('click', goToVisaPage);
    }
    
    // اضافه کردن event listener به دیو تذکره
    const tazkeraServiceDiv = document.querySelector('.clickable-tazkera');
    if (tazkeraServiceDiv) {
        tazkeraServiceDiv.addEventListener('click', goToVisaPage);
    }
    
    // اضافه کردن event listener به دیو عکاسی
    const photoServiceDiv = document.querySelector('.clickable-photo');
    if (photoServiceDiv) {
        photoServiceDiv.addEventListener('click', goToContactPage);
    }
    
    // اضافه کردن event listener به دیو فتوکپی
    const copyServiceDiv = document.querySelector('.clickable-copy');
    if (copyServiceDiv) {
        copyServiceDiv.addEventListener('click', goToContactPage);
    }
    
    // فرم درخواست ویزا
    const visaForm = document.getElementById('visaForm');
    if (visaForm) {
        visaForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const submitText = document.getElementById('submitText');
            const loadingSpinner = document.getElementById('loadingSpinner');
            
            // فعال کردن حالت لودینگ
            submitBtn.disabled = true;
            submitText.style.display = 'none';
            loadingSpinner.style.display = 'inline';
            
            try {
                const fullName = document.getElementById('fullName').value.trim();
                const phone = document.getElementById('phone').value.trim();
                const visaType = document.getElementById('visaType').value;
                const message = document.getElementById('message').value.trim();
                
                // اعتبارسنجی
                if (!fullName || !phone || !visaType) {
                    throw new Error('لطفاً تمام فیلدهای الزامی را پر کنید');
                }
                
                // بررسی اتصال Firebase
                if (!db) {
                    throw new Error('خطا در اتصال به سرور. لطفاً دوباره تلاش کنید.');
                }
                
                // ذخیره درخواست در Firebase
                const requestData = {
                    fullName: fullName,
                    phone: phone,
                    visaType: visaType,
                    message: message || 'بدون توضیح',
                    timestamp: new Date().toISOString(),
                    status: 'pending',
                    viewed: false,
                    completed: false
                };
                
                const docRef = await db.collection('visaRequests').add(requestData);
                
                // نمایش پیام موفقیت
                showFormStatus('✅ درخواست شما با موفقیت ثبت شد. به زودی با شما تماس خواهیم گرفت.', true);
                
                // پاک کردن فرم
                visaForm.reset();
                
                // نمایش نوتیفیکیشن برای ادمین
                if (isAdminLoggedIn) {
                    showNotification("درخواست ویزای جدید", `${fullName} - ${phone}`);
                }
                
            } catch (error) {
                showFormStatus(`❌ خطا: ${error.message}`, false);
            } finally {
                // غیرفعال کردن حالت لودینگ
                submitBtn.disabled = false;
                submitText.style.display = 'inline';
                loadingSpinner.style.display = 'none';
            }
        });
    }
});

// ==================== Firebase Configuration ====================
const firebaseConfig = {
    apiKey: "AIzaSyCfGTIbo_Jre7pxte1qxs54Z2VdnrcVYYc",
    authDomain: "online-services-f4dfe.firebaseapp.com",
    projectId: "online-services-f4dfe",
    storageBucket: "online-services-f4dfe.firebasestorage.app",
    messagingSenderId: "552544599172",
    appId: "1:552544599172:web:db94c0f9f33fc85b5d96d1",
    measurementId: "G-3ZQ6066JTR"
};

// Initialize Firebase
let db;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.firestore();
    
    // توابع مدیریتی در scope گلوبال
    window.firebaseDB = db;
    
} catch (error) {
    console.error("خطا در اتصال به سرور. لطفاً صفحه را رفرش کنید.");
}

// ==================== Admin Login System ====================
let adminToken = localStorage.getItem('adminToken');
let isAdminLoggedIn = false;
const ADMIN_PASSWORD = "admin@123"; // رمز پیش‌فرض

// تابع ورود از طریق کنسول
window.adminLogin = function(password = null) {
    if (password === null) {
        password = prompt("رمز مدیریت را وارد کنید:", ADMIN_PASSWORD);
    }
    
    if (password === ADMIN_PASSWORD) {
        // ایجاد توکن امن
        const token = generateSecureToken();
        localStorage.setItem('adminToken', token);
        adminToken = token;
        isAdminLoggedIn = true;
        
        // بروزرسانی رابط کاربری
        updateAdminUI();
        showNotification("ورود موفق", "شما با موفقیت به پنل مدیریت وارد شدید.");
        
        // راه‌اندازی به‌روزرسانی همزمان
        setupRealtimeUpdates();
        
        return token;
    } else {
        alert("❌ رمز اشتباه است!");
        return null;
    }
};

// تابع خروج از طریق کنسول
window.adminLogout = function() {
    localStorage.removeItem('adminToken');
    adminToken = null;
    isAdminLoggedIn = false;
    
    updateAdminUI();
    showNotification("خروج موفق", "شما از پنل مدیریت خارج شدید.");
    
    // حذف listenerهای realtime
    if (unsubscribeRequests) {
        unsubscribeRequests();
        unsubscribeRequests = null;
    }
    if (unsubscribeConsultations) {
        unsubscribeConsultations();
        unsubscribeConsultations = null;
    }
    if (window.userRealtimeUnsubscribe) {
        window.userRealtimeUnsubscribe();
        window.userRealtimeUnsubscribe = null;
    }
};

// تابع تولید توکن امن
function generateSecureToken() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `admin_${timestamp}_${random}`;
}

// تابع ورود از طریق فرم
function loginAsAdmin() {
    const password = document.getElementById('adminPassword').value;
    if (password === ADMIN_PASSWORD) {
        const token = window.adminLogin(password);
        if (token) {
            document.getElementById('adminPassword').value = '';
        }
    } else {
        alert("❌ رمز اشتباه است!");
    }
}

// تابع خروج از پنل
function logoutAdmin() {
    window.adminLogout();
}

// بروزرسانی رابط کاربری بر اساس وضعیت ادمین
function updateAdminUI() {
    const adminLink = document.getElementById('adminLink');
    const adminLoginForm = document.getElementById('adminLoginForm');
    const adminContent = document.getElementById('adminContent');
    const refreshBtn = document.getElementById('refreshBtn');
    
    if (isAdminLoggedIn && adminToken) {
        // کاربر ادمین است
        if (adminLink) adminLink.style.display = 'block';
        if (adminLoginForm) adminLoginForm.style.display = 'none';
        if (adminContent) adminContent.style.display = 'block';
        if (refreshBtn) refreshBtn.style.display = 'inline-block';
        
        // بارگذاری داده‌ها
        if (document.getElementById('tabRequests').classList.contains('active-tab')) {
            loadRequests();
        } else {
            loadConsultations();
        }
        
    } else {
        // کاربر عادی است
        if (adminLink) adminLink.style.display = 'none';
        if (adminLoginForm) adminLoginForm.style.display = 'block';
        if (adminContent) adminContent.style.display = 'none';
        if (refreshBtn) refreshBtn.style.display = 'none';
    }
}

// بررسی اولیه وضعیت ادمین
function checkAdminStatus() {
    const token = localStorage.getItem('adminToken');
    if (token && token.startsWith('admin_')) {
        adminToken = token;
        isAdminLoggedIn = true;
    }
    updateAdminUI();
}

// ==================== Utility Functions ====================
function showFormStatus(message, isSuccess = true) {
    const statusElement = document.getElementById('formStatus');
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.className = 'form-status ' + (isSuccess ? 'success' : 'error');
        
        setTimeout(() => {
            statusElement.className = 'form-status';
        }, 5000);
    }
}

function formatTime(date) {
    return date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(date) {
    return date.toLocaleDateString('fa-IR');
}

function showNotification(title, message) {
    const notification = document.getElementById('adminNotification');
    const notificationMessage = document.getElementById('notificationMessage');
    const notificationTime = document.getElementById('notificationTime');
    
    if (notification && notificationMessage && notificationTime) {
        notification.querySelector('strong').innerHTML = `<i class="fas fa-bell"></i> ${title}`;
        notificationMessage.textContent = message;
        notificationTime.textContent = formatTime(new Date());
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, 5000);
    }
}

// ==================== Consultation System (سیستم جدید گروهی) ====================
let currentUserId = localStorage.getItem('consultationUserId');
let userMessagesListener = null;
let autoRefreshInterval = null;
let userMessagesCheckInterval = null;

// عناصر مشاوره
const consultationToggleBtn = document.getElementById('consultationToggleBtn');
const closeConsultationBtn = document.getElementById('closeConsultationBtn');
const consultationWindow = document.getElementById('consultationWindow');
const consultationForm = document.getElementById('consultationForm');
const consultationMessage = document.getElementById('consultationMessage');
const messageHistory = document.getElementById('messageHistory');
const unreadBadge = document.getElementById('unreadBadge');

// ایجاد یا دریافت شناسه کاربر
function getOrCreateUserId() {
    if (!currentUserId) {
        currentUserId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('consultationUserId', currentUserId);
    }
    return currentUserId;
}

// ==================== تنظیم ارتفاع پنجره مشاوره ====================
function adjustConsultationWindowHeight() {
    const consultationWindow = document.getElementById('consultationWindow');
    const isMobile = window.innerWidth <= 768;
    
    if (consultationWindow && isMobile) {
        // محاسبه ارتفاع بر اساس viewport
        const viewportHeight = window.innerHeight;
        const headerHeight = 60; // ارتفاع هدر
        const formHeight = 150; // ارتفاع فرم
        const infoHeight = 50; // ارتفاع بخش اطلاعات
        
        // محاسبه ارتفاع تاریخچه پیام‌ها
        const messagesHeight = viewportHeight - headerHeight - formHeight - infoHeight - 100;
        
        const messageHistory = document.getElementById('messageHistory');
        if (messageHistory) {
            messageHistory.style.maxHeight = `${Math.max(messagesHeight, 200)}px`;
            messageHistory.style.minHeight = '200px';
        }
        
        // تنظیم ارتفاع کل پنجره
        consultationWindow.style.height = `${Math.min(viewportHeight * 0.8, 600)}px`;
    }
}

// اجرای تابع هنگام تغییر اندازه پنجره
window.addEventListener('resize', adjustConsultationWindowHeight);

// ==================== بارگذاری تاریخچه مشاوره کاربر ====================
async function loadUserConsultationHistory() {
    if (!db) {
        if (messageHistory) {
            messageHistory.innerHTML = `
                <div class="no-messages" style="color: #dc3545;">
                    <i class="fas fa-exclamation-circle"></i><br>
                    خطا در اتصال به سرور
                </div>
            `;
        }
        return;
    }
    
    const userId = getOrCreateUserId();
    
    try {
        // گرفتن تمام پیام‌های این کاربر
        const snapshot = await db.collection('consultations')
            .where('userId', '==', userId)
            .get();
        
        if (snapshot.empty) {
            if (messageHistory) {
                messageHistory.innerHTML = `
                    <div class="no-messages">
                        <i class="fas fa-comment-slash"></i><br>
                        <span class="message-text">هنوز پیامی وجود ندارد. اولین سوال خود را بپرسید.</span>
                    </div>
                `;
            }
            return;
        }
        
        // تبدیل به آرایه
        const messages = [];
        snapshot.forEach(doc => {
            messages.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        // مرتب‌سازی بر اساس زمان در حافظه
        messages.sort((a, b) => {
            const timeA = new Date(a.timestamp || a.lastMessageTime || Date.now());
            const timeB = new Date(b.timestamp || b.lastMessageTime || Date.now());
            return timeA - timeB;
        });
        
        // نمایش پیام‌ها
        let html = '';
        let hasMessages = false;
        
        messages.forEach(msg => {
            hasMessages = true;
            const date = new Date(msg.timestamp || msg.lastMessageTime || Date.now());
            const formattedTime = formatTime(date);
            const formattedDate = formatDate(date);
            
            // تعیین کلاس بر اساس نوع فرستنده
            const isAdmin = msg.isAdminReply === true;
            const messageClass = isAdmin ? 'consultation-message-item admin' : 'consultation-message-item user';
            const senderName = isAdmin ? 'کارشناس سرافرازی' : 'شما';
            
            html += `
                <div class="${messageClass}">
                    <div class="consultation-message-header">
                        <div class="consultation-message-sender ${isAdmin ? 'admin' : 'user'}">${senderName}</div>
                        <div class="consultation-message-time">${formattedDate} ${formattedTime}</div>
                    </div>
                    <div class="consultation-message-text">${msg.message || 'بدون متن'}</div>
                </div>
            `;
        });
        
        if (!hasMessages && messageHistory) {
            messageHistory.innerHTML = `
                <div class="no-messages">
                    <i class="fas fa-comment-slash"></i><br>
                    <span class="message-text">هنوز پیامی وجود ندارد. اولین سوال خود را بپرسید.</span>
                </div>
            `;
            return;
        }
        
        if (messageHistory) {
            messageHistory.innerHTML = `
                <div class="consultation-messages-list">
                    ${html}
                </div>
            `;
            
            // اسکرول به پایین
            setTimeout(() => {
                const messagesList = messageHistory.querySelector('.consultation-messages-list');
                if (messagesList) {
                    messagesList.scrollTop = messagesList.scrollHeight;
                }
            }, 100);
        }
        
    } catch (error) {
        if (messageHistory) {
            messageHistory.innerHTML = `
                <div class="no-messages" style="color: #dc3545;">
                    <i class="fas fa-exclamation-circle"></i><br>
                    خطا در بارگذاری پیام‌ها<br>
                    <small>${error.message}</small>
                </div>
            `;
        }
    }
}

// بروزرسانی نشانگر پیام‌های نخوانده
async function updateUnreadBadge(count) {
    if (!unreadBadge) return;
    
    if (count > 0) {
        unreadBadge.textContent = count > 9 ? '9+' : count;
        unreadBadge.style.display = 'flex';
        
        // اگر پنجره مشاوره بسته است، دکمه را پالس کن
        if (consultationToggleBtn && !consultationWindow.classList.contains('active')) {
            consultationToggleBtn.classList.add('pulse');
        }
    } else {
        unreadBadge.style.display = 'none';
        
        // اگر پنجره مشاوره بسته است، پالس را متوقف کن
        if (consultationToggleBtn) {
            consultationToggleBtn.classList.remove('pulse');
        }
    }
}

// بررسی پیام‌های جدید برای کاربر
async function checkForNewMessages() {
    if (!db || !currentUserId) return;
    
    try {
        const userId = getOrCreateUserId();
        const snapshot = await db.collection('consultations')
            .where('userId', '==', userId)
            .where('isAdminReply', '==', true)
            .where('read', '==', false)
            .get();
        
        const unreadCount = snapshot.size;
        
        updateUnreadBadge(unreadCount);
        
        // اگر پنجره مشاوره باز است، تاریخچه را بروزرسانی کن
        if (consultationWindow.classList.contains('active') && unreadCount > 0) {
            loadUserConsultationHistory();
        }
        
    } catch (error) {
        // خطا در بررسی پیام‌های جدید
    }
}

// ارسال پیام مشاوره
if (consultationForm) {
    consultationForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const message = consultationMessage.value.trim();
        if (!message) {
            alert('لطفاً متن سوال خود را بنویسید.');
            return;
        }
        
        const submitBtn = consultationForm.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        try {
            // حالت لودینگ
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
            
            // دریافت شناسه کاربر
            const userId = getOrCreateUserId();
            
            // ذخیره پیام در Firebase
            const consultationData = {
                userId: userId,
                message: message,
                timestamp: new Date().toISOString(),
                read: false,
                isAdminReply: false,
                userName: `کاربر ${userId.substring(0, 8)}`,
                lastMessageTime: new Date().toISOString()
            };
            
            await db.collection('consultations').add(consultationData);
            
            // نمایش پیام در تاریخچه
            const newMessageHtml = `
                <div class="consultation-message-item user">
                    <div class="consultation-message-header">
                        <div class="consultation-message-sender user">شما</div>
                        <div class="consultation-message-time">${formatTime(new Date())}</div>
                    </div>
                    <div class="consultation-message-text">${message}</div>
                </div>
            `;
            
            // بررسی وضعیت فعلی
            const noMessagesDiv = messageHistory.querySelector('.no-messages');
            const messagesList = messageHistory.querySelector('.consultation-messages-list');
            
            if (noMessagesDiv) {
                // اگر اولین پیام است
                messageHistory.innerHTML = `
                    <div class="consultation-messages-list">
                        ${newMessageHtml}
                    </div>
                `;
            } else if (messagesList) {
                // اگر پیام‌های قبلی وجود دارد
                messagesList.innerHTML += newMessageHtml;
            } else {
                // اگر ساختار متفاوت است، کل تاریخچه را بارگذاری کن
                loadUserConsultationHistory();
            }
            
            // پاک کردن فرم
            consultationMessage.value = '';
            
            // اسکرول به پایین
            setTimeout(() => {
                const updatedMessagesList = messageHistory.querySelector('.consultation-messages-list');
                if (updatedMessagesList) {
                    updatedMessagesList.scrollTop = updatedMessagesList.scrollHeight;
                }
            }, 100);
            
            // نوتیفیکیشن برای ادمین
            if (isAdminLoggedIn) {
                showNotification("سوال جدید از مشاوره", `کاربر ${userId.substring(0, 8)}: ${message.substring(0, 50)}...`);
            }
            
        } catch (error) {
            alert('❌ خطا در ارسال سوال. لطفاً دوباره تلاش کنید.');
        } finally {
            // بازگشت به حالت عادی
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// باز و بسته کردن پنجره مشاوره با real-time
if (consultationToggleBtn) {
    consultationToggleBtn.addEventListener('click', () => {
        consultationWindow.classList.toggle('active');
        consultationToggleBtn.classList.toggle('active');
        
        // اگر پنجره باز شد
        if (consultationWindow.classList.contains('active')) {
            // تنظیم ارتفاع
            setTimeout(adjustConsultationWindowHeight, 100);
            
            // تاریخچه را بارگذاری کن
            loadUserConsultationHistory();
            
            // نشانگر نخوانده را پاک کن
            updateUnreadBadge(0);
            
            // پیام‌های خوانده شده را علامت‌گذاری کن
            markAllMessagesAsRead();
            
            // شروع auto-refresh برای پنجره باز
            startAutoRefresh();
            
        } else {
            // اگر پنجره بسته شد
            stopAutoRefresh();
        }
    });
}

if (closeConsultationBtn) {
    closeConsultationBtn.addEventListener('click', () => {
        consultationWindow.classList.remove('active');
        consultationToggleBtn.classList.remove('active');
        stopAutoRefresh();
    });
}

// شروع auto-refresh برای پنجره مشاوره
function startAutoRefresh() {
    // حذف interval قبلی اگر وجود دارد
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
    
    // ایجاد interval جدید (هر 2 ثانیه)
    autoRefreshInterval = setInterval(() => {
        if (consultationWindow.classList.contains('active')) {
            // بررسی پیام‌های جدید
            checkForNewMessages();
            
            // هر 5 ثانیه تاریخچه را هم چک کن
            if (Date.now() % 5000 < 1000) {
                loadUserConsultationHistory();
            }
        }
    }, 2000);
}

function stopAutoRefresh() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
        autoRefreshInterval = null;
    }
}

// علامت‌گذاری تمام پیام‌ها به عنوان خوانده شده
async function markAllMessagesAsRead() {
    if (!db || !currentUserId) return;
    
    try {
        const userId = getOrCreateUserId();
        const snapshot = await db.collection('consultations')
            .where('userId', '==', userId)
            .where('isAdminReply', '==', true)
            .where('read', '==', false)
            .get();
        
        if (!snapshot.empty) {
            const batch = db.batch();
            snapshot.forEach(doc => {
                batch.update(doc.ref, { read: true });
            });
            
            await batch.commit();
            
            // بروزرسانی نشانگر
            updateUnreadBadge(0);
        }
        
    } catch (error) {
        // خطا در علامت‌گذاری پیام‌ها
    }
}

// راه‌اندازی به‌روزرسانی real-time برای کاربران
function setupUserRealtimeUpdates() {
    if (!db || !currentUserId) return;
    
    // حذف listener قبلی اگر وجود دارد
    if (userMessagesListener) {
        userMessagesListener();
        userMessagesListener = null;
    }
    
    // حذف interval قبلی اگر وجود دارد
    if (userMessagesCheckInterval) {
        clearInterval(userMessagesCheckInterval);
        userMessagesCheckInterval = null;
    }
    
    try {
        // تنظیم listener برای پیام‌های کاربر (Real-time Firebase)
        userMessagesListener = db.collection('consultations')
            .where('userId', '==', currentUserId)
            .onSnapshot((snapshot) => {
                // بررسی پیام‌های جدید
                checkForNewMessages();
                
                // اگر پنجره مشاوره باز است، تاریخچه را بروزرسانی کن
                if (consultationWindow.classList.contains('active')) {
                    loadUserConsultationHistory();
                }
            }, (error) => {
                // خطا در listener
            });
        
        // همچنین یک interval برای بررسی دوره‌ای پیام‌ها تنظیم کن (به عنوان پشتیبان)
        userMessagesCheckInterval = setInterval(() => {
            checkForNewMessages();
            
            // اگر پنجره مشاوره باز است، تاریخچه را هم چک کن
            if (consultationWindow.classList.contains('active')) {
                loadUserConsultationHistory();
            }
        }, 5000); // هر 5 ثانیه
        
        // ذخیره برای cleanup
        window.userRealtimeUnsubscribe = userMessagesListener;
        
    } catch (error) {
        // خطا در راه‌اندازی real-time
    }
}

// ==================== Admin Console Functions ====================
const refreshBtn = document.getElementById('refreshBtn');
let unsubscribeRequests = null;
let unsubscribeConsultations = null;

if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
        if (document.getElementById('tabRequests').classList.contains('active-tab')) {
            loadRequests();
        } else {
            loadConsultations();
        }
    });
}

// تابع برای بارگذاری درخواست‌ها
async function loadRequests() {
    if (!isAdminLoggedIn) return;
    
    const requestsList = document.getElementById('requestsList');
    const adminStats = document.getElementById('adminStats');
    
    if (!requestsList || !db) {
        return;
    }
    
    try {
        requestsList.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
        
        // گرفتن تمام درخواست‌ها
        const snapshot = await db.collection('visaRequests').get();
        
        if (snapshot.empty) {
            requestsList.innerHTML = `
                <div class="no-requests">
                    <i class="fas fa-inbox"></i>
                    <h3>هنوز هیچ درخواستی ثبت نشده است</h3>
                    <p>درخواست‌های ارسالی از فرم در اینجا نمایش داده می‌شوند</p>
                </div>
            `;
            if (adminStats) adminStats.innerHTML = '';
            return;
        }
        
        // محاسبه آمار
        const totalRequests = snapshot.size;
        const pendingRequests = snapshot.docs.filter(doc => doc.data().status === 'pending').length;
        const viewedRequests = snapshot.docs.filter(doc => doc.data().viewed === true).length;
        const completedRequests = snapshot.docs.filter(doc => doc.data().completed === true).length;
        
        // نمایش آمار
        if (adminStats) {
            adminStats.innerHTML = `
                <div class="stat-card">
                    <div class="stat-number">${totalRequests}</div>
                    <div class="stat-label">کل درخواست‌ها</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${pendingRequests}</div>
                    <div class="stat-label">در انتظار</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${viewedRequests}</div>
                    <div class="stat-label">مشاهده شده</div>
                </div>
                <div class="stat-card">
                    <div class="stat-number">${completedRequests}</div>
                    <div class="stat-label">تکمیل شده</div>
                </div>
            `;
        }
        
        // تبدیل به آرایه و مرتب‌سازی
        const requests = [];
        snapshot.forEach(doc => {
            requests.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        // مرتب‌سازی بر اساس زمان (جدیدترین اول)
        requests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        
        // ایجاد جدول
        let html = `
            <table class="requests-table">
                <thead>
                    <tr>
                        <th>ردیف</th>
                        <th>نام کامل</th>
                        <th>شماره تماس</th>
                        <th>نوع درخواست ثبت نام</th>
                        <th>تاریخ ثبت</th>
                        <th>وضعیت</th>
                        <th>عملیات</th>
                    </tr>
                </thead>
                <tbody>
        `;
        
        requests.forEach((request, index) => {
            const date = new Date(request.timestamp);
            const formattedDate = formatDate(date);
            const formattedTime = formatTime(date);
            
            // تعیین وضعیت
            let statusText = 'در انتظار';
            let statusClass = 'status-pending';
            
            if (request.completed) {
                statusText = 'تکمیل شده';
                statusClass = 'status-completed';
            } else if (request.viewed) {
                statusText = 'مشاهده شده';
                statusClass = 'status-viewed';
            }
            
            html += `
                <tr data-id="${request.id}">
                    <td>${index + 1}</td>
                    <td>${request.fullName}</td>
                    <td>${request.phone}</td>
                    <td>${request.visaType}</td>
                    <td>${formattedDate}<br><small>${formattedTime}</small></td>
                    <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <div class="action-buttons">
                            <button class="action-btn view-btn" onclick="viewRequestDetails('${request.id}')">
                                <i class="fas fa-eye"></i> مشاهده
                            </button>
                            <button class="action-btn edit-btn" onclick="markAsViewed('${request.id}')">
                                <i class="fas fa-check"></i> مشاهده شد
                            </button>
                            <button class="action-btn delete-btn" onclick="deleteRequest('${request.id}')">
                                <i class="fas fa-trash"></i> حذف
                            </button>
                        </div>
                    </td>
                </tr>
            `;
        });
        
        html += `
                </tbody>
            </table>
        `;
        
        requestsList.innerHTML = html;
        
    } catch (error) {
        if (requestsList) {
            requestsList.innerHTML = '<p class="form-status error">❌ خطا در بارگذاری درخواست‌ها</p>';
        }
    }
}

// ==================== Consultation Management Functions (سیستم جدید گروهی) ====================

// بارگذاری لیست گروه‌های مشاوره برای ادمین
async function loadConsultations() {
    if (!isAdminLoggedIn) return;
    
    const consultationsList = document.getElementById('consultationsList');
    if (!consultationsList || !db) return;
    
    try {
        consultationsList.innerHTML = '<div class="loading-spinner"><div class="spinner"></div></div>';
        
        // گرفتن تمام پیام‌های مشاوره
        const snapshot = await db.collection('consultations').get();
        
        if (snapshot.empty) {
            consultationsList.innerHTML = `
                <div class="no-requests">
                    <i class="fas fa-comments"></i>
                    <h3>هنوز هیچ سوال مشاوره‌ای ثبت نشده است</h3>
                </div>
            `;
            return;
        }
        
        // گروه‌بندی پیام‌ها بر اساس userId
        const userGroups = {};
        
        snapshot.forEach(doc => {
            const consultation = doc.data();
            const userId = consultation.userId;
            
            if (!userGroups[userId]) {
                userGroups[userId] = {
                    userId: userId,
                    userName: consultation.userName || `کاربر ${userId.substring(0, 8)}`,
                    messages: [],
                    lastMessageTime: consultation.timestamp || consultation.lastMessageTime || new Date().toISOString(),
                    unreadCount: 0,
                    messageCount: 0
                };
            }
            
            userGroups[userId].messages.push({
                id: doc.id,
                ...consultation
            });
            
            // آپدیت زمان آخرین پیام
            const messageTime = new Date(consultation.timestamp || consultation.lastMessageTime || Date.now());
            const lastTime = new Date(userGroups[userId].lastMessageTime);
            if (messageTime > lastTime) {
                userGroups[userId].lastMessageTime = consultation.timestamp || consultation.lastMessageTime;
            }
            
            // شمارش پیام‌های نخوانده
            if (consultation.isAdminReply === true && consultation.read === false) {
                userGroups[userId].unreadCount++;
            }
            
            userGroups[userId].messageCount++;
        });
        
        // تبدیل به آرایه و مرتب‌سازی بر اساس زمان آخرین پیام
        const groups = Object.values(userGroups);
        groups.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
        
        // نمایش گروه‌ها
        let html = '';
        
        groups.forEach(group => {
            const lastDate = new Date(group.lastMessageTime);
            const formattedDate = formatDate(lastDate);
            const formattedTime = formatTime(lastDate);
            
            html += `
                <div class="consultation-group" data-user-id="${group.userId}">
                    <div class="consultation-group-header" onclick="toggleConsultationGroup('${group.userId}')">
                        <div class="consultation-group-info">
                            <div class="consultation-group-user">${group.userName}</div>
                            <div class="consultation-group-time">آخرین پیام: ${formattedDate} ${formattedTime}</div>
                        </div>
                        <div class="consultation-group-stats">
                            <span class="consultation-group-message-count">${group.messageCount} پیام</span>
                            ${group.unreadCount > 0 ? `<span class="consultation-group-unread">${group.unreadCount} جدید</span>` : ''}
                        </div>
                        <button class="consultation-expand-btn" id="expandBtn_${group.userId}">
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                    
                    <div class="consultation-group-content" id="content_${group.userId}">
                        <div class="consultation-messages-list" id="messages_${group.userId}">
                            <!-- پیام‌ها اینجا نمایش داده می‌شوند -->
                        </div>
                        
                        <div class="consultation-group-form">
                            <textarea class="consultation-input" id="reply_${group.userId}" placeholder="پاسخ خود را اینجا بنویسید..." rows="3"></textarea>
                            <div style="display: flex; gap: 10px; margin-top: 10px;">
                                <button class="submit-btn small" onclick="sendConsultationReply('${group.userId}')">
                                    <i class="fas fa-paper-plane"></i> ارسال پاسخ
                                </button>
                                <button class="submit-btn small" style="background-color: #dc3545;" onclick="deleteConsultationGroup('${group.userId}')">
                                    <i class="fas fa-trash"></i> حذف کل گفتگو
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
        
        consultationsList.innerHTML = html;
        
        // بارگذاری پیام‌های هر گروه (فقط برای گروه‌هایی که باز هستند)
        groups.forEach(group => {
            const contentDiv = document.getElementById(`content_${group.userId}`);
            if (contentDiv && contentDiv.classList.contains('active')) {
                loadGroupMessages(group.userId, group.messages);
            }
        });
        
    } catch (error) {
        consultationsList.innerHTML = '<p class="form-status error">❌ خطا در بارگذاری پیام‌ها</p>';
    }
}

// بارگذاری پیام‌های یک گروه خاص
function loadGroupMessages(userId, messages) {
    const messagesContainer = document.getElementById(`messages_${userId}`);
    if (!messagesContainer) return;
    
    // مرتب‌سازی پیام‌ها بر اساس زمان
    messages.sort((a, b) => {
        const timeA = new Date(a.timestamp || a.lastMessageTime || Date.now());
        const timeB = new Date(b.timestamp || b.lastMessageTime || Date.now());
        return timeA - timeB;
    });
    
    let html = '';
    
    messages.forEach(msg => {
        const date = new Date(msg.timestamp || msg.lastMessageTime || Date.now());
        const formattedTime = formatTime(date);
        const formattedDate = formatDate(date);
        
        const isAdmin = msg.isAdminReply === true;
        const messageClass = isAdmin ? 'consultation-message-item admin' : 'consultation-message-item user';
        const senderName = isAdmin ? 'کارشناس سرافرازی' : msg.userName || `کاربر ${userId.substring(0, 8)}`;
        
        html += `
            <div class="${messageClass}">
                <div class="consultation-message-header">
                    <div class="consultation-message-sender ${isAdmin ? 'admin' : 'user'}">${senderName}</div>
                    <div class="consultation-message-time">${formattedDate} ${formattedTime}</div>
                </div>
                <div class="consultation-message-text">${msg.message || 'بدون متن'}</div>
            </div>
        `;
    });
    
    if (html === '') {
        html = '<div class="no-consultation-messages">هنوز پیامی وجود ندارد</div>';
    }
    
    messagesContainer.innerHTML = html;
    
    // اسکرول به پایین
    setTimeout(() => {
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, 100);
}

// نمایش/مخفی کردن پیام‌های یک گروه
window.toggleConsultationGroup = function(userId) {
    const contentDiv = document.getElementById(`content_${userId}`);
    const expandBtn = document.getElementById(`expandBtn_${userId}`);
    
    if (!contentDiv || !expandBtn) return;
    
    // بستن سایر گروه‌ها (اختیاری)
    const allContents = document.querySelectorAll('.consultation-group-content.active');
    allContents.forEach(content => {
        if (content.id !== `content_${userId}`) {
            content.classList.remove('active');
            const otherUserId = content.id.replace('content_', '');
            const otherExpandBtn = document.getElementById(`expandBtn_${otherUserId}`);
            if (otherExpandBtn) {
                otherExpandBtn.classList.remove('active');
            }
        }
    });
    
    // تغییر وضعیت گروه فعلی
    contentDiv.classList.toggle('active');
    expandBtn.classList.toggle('active');
    
    // اگر گروه باز شد، پیام‌ها را بارگذاری کن
    if (contentDiv.classList.contains('active')) {
        // بارگذاری پیام‌ها از Firebase
        loadGroupMessagesFromFirebase(userId);
        
        // علامت‌گذاری پیام‌های خوانده شده
        markGroupMessagesAsRead(userId);
    }
};

// بارگذاری پیام‌های یک گروه از Firebase
async function loadGroupMessagesFromFirebase(userId) {
    try {
        const snapshot = await db.collection('consultations')
            .where('userId', '==', userId)
            .get();
        
        const messages = [];
        snapshot.forEach(doc => {
            messages.push({
                id: doc.id,
                ...doc.data()
            });
        });
        
        loadGroupMessages(userId, messages);
        
    } catch (error) {
        const messagesContainer = document.getElementById(`messages_${userId}`);
        if (messagesContainer) {
            messagesContainer.innerHTML = '<div class="no-consultation-messages" style="color: #dc3545;">خطا در بارگذاری پیام‌ها</div>';
        }
    }
}

// علامت‌گذاری پیام‌های یک گروه به عنوان خوانده شده
async function markGroupMessagesAsRead(userId) {
    try {
        const snapshot = await db.collection('consultations')
            .where('userId', '==', userId)
            .where('isAdminReply', '==', true)
            .where('read', '==', false)
            .get();
        
        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.update(doc.ref, { read: true });
        });
        
        await batch.commit();
        
        // بروزرسانی شمارنده
        const unreadBadge = document.querySelector(`.consultation-group-unread[data-user-id="${userId}"]`);
        if (unreadBadge) {
            unreadBadge.remove();
        }
        
    } catch (error) {
        // خطا در علامت‌گذاری
    }
}

// ارسال پاسخ به یک گروه
window.sendConsultationReply = async function(userId) {
    const replyInput = document.getElementById(`reply_${userId}`);
    const reply = replyInput.value.trim();
    
    if (!reply) {
        alert('لطفاً متن پاسخ را وارد کنید.');
        return;
    }
    
    const submitBtn = event.target;
    const originalText = submitBtn.innerHTML;
    
    try {
        // حالت لودینگ
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> در حال ارسال...';
        
        // ذخیره پاسخ در Firebase
        const replyData = {
            userId: userId,
            message: reply,
            timestamp: new Date().toISOString(),
            read: false,
            isAdminReply: true,
            userName: 'کارشناس سرافرازی',
            lastMessageTime: new Date().toISOString()
        };
        
        await db.collection('consultations').add(replyData);
        
        // پاک کردن فیلد پاسخ
        replyInput.value = '';
        
        // بارگذاری مجدد پیام‌ها
        loadGroupMessagesFromFirebase(userId);
        
        // نمایش پیام موفقیت
        showNotification("پاسخ ارسال شد", "پاسخ شما با موفقیت ارسال شد.");
        
    } catch (error) {
        alert('❌ خطا در ارسال پاسخ.');
    } finally {
        // بازگشت به حالت عادی
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
    }
};

// حذف کل گروه مشاوره
window.deleteConsultationGroup = async function(userId) {
    if (!isAdminLoggedIn) {
        alert('لطفاً ابتدا به عنوان ادمین وارد شوید.');
        return;
    }
    
    if (!confirm('آیا از حذف کل گفتگوی این کاربر مطمئن هستید؟ این عمل قابل بازگشت نیست.')) {
        return;
    }
    
    try {
        // گرفتن تمام پیام‌های این کاربر
        const snapshot = await db.collection('consultations')
            .where('userId', '==', userId)
            .get();
        
        // حذف همه پیام‌ها در یک batch
        const batch = db.batch();
        snapshot.forEach(doc => {
            batch.delete(doc.ref);
        });
        
        await batch.commit();
        
        // بروزرسانی لیست
        loadConsultations();
        
    } catch (error) {
        alert('❌ خطا در حذف گفتگو.');
    }
};

// ==================== Request Management Functions ====================

// مشاهده جزئیات درخواست
window.viewRequestDetails = async function(id) {
    if (!isAdminLoggedIn) {
        return;
    }
    
    try {
        const doc = await db.collection('visaRequests').doc(id).get();
        if (!doc.exists) {
            alert('درخواست مورد نظر یافت نشد!');
            return;
        }
        
        const request = doc.data();
        const date = new Date(request.timestamp);
        const formattedDate = formatDate(date);
        const formattedTime = formatTime(date);
        
        let statusText = 'در انتظار';
        if (request.completed) {
            statusText = 'تکمیل شده';
        } else if (request.viewed) {
            statusText = 'مشاهده شده';
        }
        
        const detailsContent = document.getElementById('requestDetailsContent');
        detailsContent.innerHTML = `
            <div class="detail-row">
                <div class="detail-label">نام کامل:</div>
                <div class="detail-value">${request.fullName}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">شماره تماس:</div>
                <div class="detail-value">${request.phone}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">نوع ویزا:</div>
                <div class="detail-value">${request.visaType}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">توضیحات:</div>
                <div class="detail-value">${request.message || 'بدون توضیح'}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">تاریخ ثبت:</div>
                <div class="detail-value">${formattedDate} - ${formattedTime}</div>
            </div>
            <div class="detail-row">
                <div class="detail-label">وضعیت:</div>
                <div class="detail-value">
                    <span class="status-badge ${request.completed ? 'status-completed' : request.viewed ? 'status-viewed' : 'status-pending'}">
                        ${statusText}
                    </span>
                </div>
            </div>
            <div style="margin-top: 2rem; display: flex; gap: 10px;">
                <button class="submit-btn small" onclick="markAsViewed('${id}')">
                    <i class="fas fa-check"></i> مشاهده شد
                </button>
                <button class="submit-btn small" style="background-color: #28a745;" onclick="markAsCompleted('${id}')">
                    <i class="fas fa-flag-checkered"></i> تکمیل شده
                </button>
            </div>
        `;
        
        // نمایش مدال
        document.getElementById('requestDetailsModal').classList.add('active');
        
    } catch (error) {
        alert('خطا در دریافت جزئیات درخواست');
    }
};

// علامت‌گذاری به عنوان مشاهده شده
window.markAsViewed = async function(id) {
    if (!isAdminLoggedIn) {
        return;
    }
    
    try {
        await db.collection('visaRequests').doc(id).update({
            viewed: true,
            status: 'viewed'
        });
        
        loadRequests();
        
        // بستن مدال اگر باز است
        document.getElementById('requestDetailsModal').classList.remove('active');
        
    } catch (error) {
        alert('❌ خطا در بروزرسانی وضعیت');
    }
};

// علامت‌گذاری به عنوان تکمیل شده
window.markAsCompleted = async function(id) {
    if (!isAdminLoggedIn) {
        alert('لطفاً ابتدا به عنوان ادمین وارد شوید.');
        return;
    }
    
    try {
        await db.collection('visaRequests').doc(id).update({
            completed: true,
            viewed: true,
            status: 'completed'
        });
        
        alert('✅ درخواست به عنوان تکمیل شده علامت‌گذاری شد.');
        loadRequests();
        
        // بستن مدال اگر باز است
        document.getElementById('requestDetailsModal').classList.remove('active');
        
    } catch (error) {
        alert('❌ خطا در بروزرسانی وضعیت');
    }
};

// حذف درخواست
window.deleteRequest = async function(id) {
    if (!isAdminLoggedIn) {
        alert('لطفاً ابتدا به عنوان ادمین وارد شوید.');
        return;
    }
    
    if (!confirm('آیا از حذف این درخواست مطمئن هستید؟ این عمل قابل بازگشت نیست.')) {
        return;
    }
    
    try {
        await db.collection('visaRequests').doc(id).delete();
        loadRequests();
        
        // بستن مدال اگر باز است
        document.getElementById('requestDetailsModal').classList.remove('active');
        
    } catch (error) {
        alert('❌ خطا در حذف درخواست');
    }
};

// ==================== Tab Management ====================
function switchTab(tabName) {
    // حذف کلاس active از همه تب‌ها
    document.getElementById('tabRequests').classList.remove('active-tab');
    document.getElementById('tabConsultations').classList.remove('active-tab');
    
    // پنهان کردن همه محتواها
    document.getElementById('tabRequestsContent').style.display = 'none';
    document.getElementById('tabConsultationsContent').style.display = 'none';
    
    // فعال کردن تب انتخاب شده
    if (tabName === 'requests') {
        document.getElementById('tabRequests').classList.add('active-tab');
        document.getElementById('tabRequestsContent').style.display = 'block';
        setupRequestsRealtime();
    } else if (tabName === 'consultations') {
        document.getElementById('tabConsultations').classList.add('active-tab');
        document.getElementById('tabConsultationsContent').style.display = 'block';
        setupConsultationsRealtime();
    }
}

// ==================== Real-time Updates ====================

// راه‌اندازی به‌روزرسانی همزمان برای درخواست‌ها
function setupRequestsRealtime() {
    if (!db || !isAdminLoggedIn) return;
    
    // حذف listener قبلی اگر وجود دارد
    if (unsubscribeRequests) {
        unsubscribeRequests();
    }
    
    // تنظیم listener جدید
    unsubscribeRequests = db.collection('visaRequests')
        .onSnapshot((snapshot) => {
            const requestsList = document.getElementById('requestsList');
            const adminStats = document.getElementById('adminStats');
            
            if (!requestsList) return;
            
            if (snapshot.empty) {
                requestsList.innerHTML = `
                    <div class="no-requests">
                        <i class="fas fa-inbox"></i>
                        <h3>هنوز هیچ درخواستی ثبت نشده است</h3>
                        <p>درخواست‌های ارسالی از فرم در اینجا نمایش داده می‌شوند</p>
                    </div>
                `;
                if (adminStats) adminStats.innerHTML = '';
                return;
            }
            
            // تبدیل به آرایه و مرتب‌سازی
            const requests = [];
            snapshot.forEach(doc => {
                requests.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
            
            // مرتب‌سازی بر اساس زمان (جدیدترین اول)
            requests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            
            // محاسبه آمار
            const totalRequests = requests.length;
            const pendingRequests = requests.filter(req => req.status === 'pending').length;
            const viewedRequests = requests.filter(req => req.viewed === true).length;
            const completedRequests = requests.filter(req => req.completed === true).length;
            
            // نمایش آمار
            if (adminStats) {
                adminStats.innerHTML = `
                    <div class="stat-card">
                        <div class="stat-number">${totalRequests}</div>
                        <div class="stat-label">کل درخواست‌ها</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${pendingRequests}</div>
                        <div class="stat-label">در انتظار</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${viewedRequests}</div>
                        <div class="stat-label">مشاهده شده</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-number">${completedRequests}</div>
                        <div class="stat-label">تکمیل شده</div>
                    </div>
                `;
            }
            
            // ایجاد جدول
            let html = `
                <table class="requests-table">
                    <thead>
                        <tr>
                            <th>ردیف</th>
                            <th>نام کامل</th>
                            <th>شماره تماس</th>
                            <th>نوع ویزا</th>
                            <th>تاریخ ثبت</th>
                            <th>وضعیت</th>
                            <th>عملیات</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            requests.forEach((request, index) => {
                const date = new Date(request.timestamp);
                const formattedDate = formatDate(date);
                const formattedTime = formatTime(date);
                
                // تعیین وضعیت
                let statusText = 'در انتظار';
                let statusClass = 'status-pending';
                
                if (request.completed) {
                    statusText = 'تکمیل شده';
                    statusClass = 'status-completed';
                } else if (request.viewed) {
                    statusText = 'مشاهده شده';
                    statusClass = 'status-viewed';
                }
                
                html += `
                    <tr data-id="${request.id}">
                        <td>${index + 1}</td>
                        <td>${request.fullName}</td>
                        <td>${request.phone}</td>
                        <td>${request.visaType}</td>
                        <td>${formattedDate}<br><small>${formattedTime}</small></td>
                        <td><span class="status-badge ${statusClass}">${statusText}</span></td>
                        <td>
                            <div class="action-buttons">
                                <button class="action-btn view-btn" onclick="viewRequestDetails('${request.id}')">
                                    <i class="fas fa-eye"></i> مشاهده
                                </button>
                                <button class="action-btn edit-btn" onclick="markAsViewed('${request.id}')">
                                    <i class="fas fa-check"></i> مشاهده شد
                                </button>
                                <button class="action-btn delete-btn" onclick="deleteRequest('${request.id}')">
                                    <i class="fas fa-trash"></i> حذف
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });
            
            html += `
                    </tbody>
                </table>
            `;
            
            requestsList.innerHTML = html;
            
            // بررسی تغییرات برای نوتیفیکیشن
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const request = change.doc.data();
                    showNotification("درخواست ویزای جدید", `${request.fullName} - ${request.phone}`);
                }
            });
        }, (error) => {
            // خطا در listener
        });
}

// راه‌اندازی به‌روزرسانی همزمان برای مشاوره‌ها (گروهی)
function setupConsultationsRealtime() {
    if (!db || !isAdminLoggedIn) return;
    
    // حذف listener قبلی اگر وجود دارد
    if (unsubscribeConsultations) {
        unsubscribeConsultations();
    }
    
    // تنظیم listener جدید
    unsubscribeConsultations = db.collection('consultations')
        .onSnapshot((snapshot) => {
            const consultationsList = document.getElementById('consultationsList');
            
            if (!consultationsList) return;
            
            if (snapshot.empty) {
                consultationsList.innerHTML = `
                    <div class="no-requests">
                        <i class="fas fa-comments"></i>
                        <h3>هنوز هیچ سوال مشاوره‌ای ثبت نشده است</h3>
                    </div>
                `;
                return;
            }
            
            // گروه‌بندی پیام‌ها بر اساس userId
            const userGroups = {};
            
            snapshot.forEach(doc => {
                const consultation = doc.data();
                const userId = consultation.userId;
                
                if (!userGroups[userId]) {
                    userGroups[userId] = {
                        userId: userId,
                        userName: consultation.userName || `کاربر ${userId.substring(0, 8)}`,
                        messages: [],
                        lastMessageTime: consultation.timestamp || consultation.lastMessageTime || new Date().toISOString(),
                        unreadCount: 0,
                        messageCount: 0
                    };
                }
                
                userGroups[userId].messages.push({
                    id: doc.id,
                    ...consultation
                });
                
                // آپدیت زمان آخرین پیام
                const messageTime = new Date(consultation.timestamp || consultation.lastMessageTime || Date.now());
                const lastTime = new Date(userGroups[userId].lastMessageTime);
                if (messageTime > lastTime) {
                    userGroups[userId].lastMessageTime = consultation.timestamp || consultation.lastMessageTime;
                }
                
                // شمارش پیام‌های نخوانده
                if (consultation.isAdminReply === true && consultation.read === false) {
                    userGroups[userId].unreadCount++;
                }
                
                userGroups[userId].messageCount++;
            });
            
            // تبدیل به آرایه و مرتب‌سازی بر اساس زمان آخرین پیام
            const groups = Object.values(userGroups);
            groups.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));
            
            // نمایش گروه‌ها
            let html = '';
            
            groups.forEach(group => {
                const lastDate = new Date(group.lastMessageTime);
                const formattedDate = formatDate(lastDate);
                const formattedTime = formatTime(lastDate);
                
                html += `
                    <div class="consultation-group" data-user-id="${group.userId}">
                        <div class="consultation-group-header" onclick="toggleConsultationGroup('${group.userId}')">
                            <div class="consultation-group-info">
                                <div class="consultation-group-user">${group.userName}</div>
                                <div class="consultation-group-time">آخرین پیام: ${formattedDate} ${formattedTime}</div>
                            </div>
                            <div class="consultation-group-stats">
                                <span class="consultation-group-message-count">${group.messageCount} پیام</span>
                                ${group.unreadCount > 0 ? `<span class="consultation-group-unread">${group.unreadCount} جدید</span>` : ''}
                            </div>
                            <button class="consultation-expand-btn" id="expandBtn_${group.userId}">
                                <i class="fas fa-chevron-down"></i>
                            </button>
                        </div>
                        
                        <div class="consultation-group-content" id="content_${group.userId}">
                            <div class="consultation-messages-list" id="messages_${group.userId}">
                                <!-- پیام‌ها اینجا نمایش داده می‌شوند -->
                            </div>
                            
                            <div class="consultation-group-form">
                                <textarea class="consultation-input" id="reply_${group.userId}" placeholder="پاسخ خود را اینجا بنویسید..." rows="3"></textarea>
                                <div style="display: flex; gap: 10px; margin-top: 10px;">
                                    <button class="submit-btn small" onclick="sendConsultationReply('${group.userId}')">
                                        <i class="fas fa-paper-plane"></i> ارسال پاسخ
                                    </button>
                                    <button class="submit-btn small" style="background-color: #dc3545;" onclick="deleteConsultationGroup('${group.userId}')">
                                        <i class="fas fa-trash"></i> حذف کل گفتگو
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            consultationsList.innerHTML = html;
            
            // بارگذاری پیام‌های هر گروه (فقط برای گروه‌هایی که باز هستند)
            groups.forEach(group => {
                const contentDiv = document.getElementById(`content_${group.userId}`);
                if (contentDiv && contentDiv.classList.contains('active')) {
                    loadGroupMessages(group.userId, group.messages);
                }
            });
            
            // بررسی تغییرات برای نوتیفیکیشن
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const consultation = change.doc.data();
                    if (consultation.isAdminReply !== true) {
                        showNotification("سوال جدید از مشاوره", `کاربر ${consultation.userId.substring(0, 8)}: ${consultation.message?.substring(0, 50) || 'پیام جدید'}...`);
                    }
                }
            });
        }, (error) => {
            // خطا در listener
        });
}

// راه‌اندازی کلی به‌روزرسانی همزمان
function setupRealtimeUpdates() {
    if (!db) {
        return;
    }
    
    // راه‌اندازی real-time برای کاربران
    if (currentUserId) {
        setupUserRealtimeUpdates();
    }
    
    // راه‌اندازی real-time برای ادمین
    if (isAdminLoggedIn) {
        // اگر تب درخواست‌ها فعال است
        if (document.getElementById('tabRequests').classList.contains('active-tab')) {
            setupRequestsRealtime();
        } else if (document.getElementById('tabConsultations').classList.contains('active-tab')) {
            setupConsultationsRealtime();
        }
    }
}

// ==================== Initialization ====================
// اجرای initialization
document.addEventListener('DOMContentLoaded', () => {
    // بررسی وضعیت ادمین
    checkAdminStatus();
    
    if (db) {
        // راه‌اندازی real-time با تاخیر
        setTimeout(() => {
            setupRealtimeUpdates();
        }, 1000);
        
        // بررسی اولیه پیام‌های نخوانده
        setTimeout(() => {
            checkForNewMessages();
        }, 1500);
        
    }
    
    // اطمینان از اینکه صفحه اول فعال است
    const homePage = document.getElementById('home');
    if (homePage) {
        homePage.classList.add('active');
    }
    
    // اضافه کردن کلاس active-tab به تب اول
    const tabRequests = document.getElementById('tabRequests');
    if (tabRequests) {
        tabRequests.classList.add('active-tab');
    }
    
    // بارگذاری اولیه تاریخچه اگر کاربر شناسه دارد
    if (currentUserId) {
        setTimeout(() => {
            loadUserConsultationHistory();
        }, 500);
    }
    
    // تنظیم اولیه ارتفاع پنجره مشاوره
    setTimeout(adjustConsultationWindowHeight, 100);
    
    // بررسی وضعیت اتصال Firebase هر 30 ثانیه
    setInterval(() => {
        if (!db) {
            try {
                firebase.initializeApp(firebaseConfig);
                db = firebase.firestore();
                setupRealtimeUpdates();
            } catch (error) {
                // خطا در اتصال
            }
        }
    }, 30000);
});

// ==================== Cleanup هنگام بستن صفحه ====================
window.addEventListener('beforeunload', () => {
    // توقف تمام intervals
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
    
    if (userMessagesCheckInterval) {
        clearInterval(userMessagesCheckInterval);
    }
    
    // حذف listenerهای Firebase
    if (userMessagesListener) {
        userMessagesListener();
    }
    
    if (unsubscribeRequests) {
        unsubscribeRequests();
    }
    
    if (unsubscribeConsultations) {
        unsubscribeConsultations();
    }
    
    if (window.userRealtimeUnsubscribe) {
        window.userRealtimeUnsubscribe();
    }
});