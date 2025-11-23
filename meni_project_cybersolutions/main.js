// Shared JavaScript for all pages

// Hamburger menu functionality
function initHamburgerMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', hamburger.classList.contains('active'));
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.focus();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navMenu.classList.contains('active') && 
                !navMenu.contains(e.target) && 
                !hamburger.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Sticky navbar on scroll
function initStickyNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
}

// Scroll to top button
function initScrollToTop() {
    const scrollToTopBtn = document.querySelector('.scroll-to-top');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });

        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// Chatbot functionality
function initChatbot() {
    const chatbotButton = document.querySelector('.chatbot-button');
    const chatbotWindow = document.querySelector('.chatbot-window');
    const chatbotClose = document.querySelector('.chatbot-close');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const notificationBadge = document.querySelector('.notification-badge');

    if (!chatbotButton || !chatbotWindow) return;

    // Dummy responses based on keywords
    const responses = {
        greeting: [
            "Hello! How can I assist you with cybersecurity today?",
            "Hi there! I'm here to help with any security questions.",
            "Welcome! What cybersecurity service are you interested in?"
        ],
        services: [
            "We offer Network Security, Risk Assessment, Penetration Testing, Cloud Security, Security Training, and Risk Management. Which one interests you?",
            "Our main services include vulnerability assessments, network security, cloud security, and security awareness training. Would you like more details?",
            "We provide comprehensive cybersecurity solutions including penetration testing, risk management, and 24/7 monitoring. What would you like to know?"
        ],
        pricing: [
            "Our pricing varies based on your specific needs. I'd recommend contacting our team for a customized quote.",
            "We offer flexible pricing plans tailored to your business size and requirements. Would you like to schedule a consultation?",
            "Pricing depends on the scope of services. Let me connect you with our sales team for accurate pricing information."
        ],
        contact: [
            "You can reach us through our contact form on the website, or call us directly. Would you like me to open the contact page?",
            "Feel free to fill out our contact form or email us. Our team typically responds within 24 hours.",
            "You can contact us via the contact page, email, or phone. I can help you navigate there if you'd like!"
        ],
        security: [
            "Cybersecurity is crucial for protecting your business data and systems. We offer comprehensive solutions to keep you safe.",
            "Our security experts can help assess your current security posture and recommend improvements. What specific concerns do you have?",
            "We provide 24/7 security monitoring, risk assessments, and training to help protect your business from cyber threats."
        ],
        default: [
            "I understand. Could you provide more details so I can assist you better?",
            "That's interesting! Let me know if you need information about our services, pricing, or how to contact us.",
            "I'm here to help! You can ask me about our services, security solutions, or how to get in touch with our team."
        ]
    };

    function getResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        if (message.match(/hi|hello|hey|greetings/)) {
            return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
        } else if (message.match(/service|what do you|offer|provide/)) {
            return responses.services[Math.floor(Math.random() * responses.services.length)];
        } else if (message.match(/price|cost|how much|pricing/)) {
            return responses.pricing[Math.floor(Math.random() * responses.pricing.length)];
        } else if (message.match(/contact|reach|email|phone|call/)) {
            return responses.contact[Math.floor(Math.random() * responses.contact.length)];
        } else if (message.match(/security|cyber|threat|vulnerability|risk/)) {
            return responses.security[Math.floor(Math.random() * responses.security.length)];
        } else {
            return responses.default[Math.floor(Math.random() * responses.default.length)];
        }
    }

    function addMessage(text, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = isUser ? '👤' : '🤖';
        
        const content = document.createElement('div');
        content.className = 'message-content';
        content.textContent = text;
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(content);
        chatbotMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function sendMessage() {
        const message = chatbotInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, true);
        chatbotInput.value = '';
        
        // Disable input while "thinking"
        chatbotSend.disabled = true;
        chatbotInput.disabled = true;

        // Simulate bot thinking delay
        setTimeout(() => {
            const response = getResponse(message);
            addMessage(response, false);
            
            // Re-enable input
            chatbotSend.disabled = false;
            chatbotInput.disabled = false;
            chatbotInput.focus();
        }, 1000);
    }

    // Toggle chatbot window
    chatbotButton.addEventListener('click', () => {
        const isActive = chatbotWindow.classList.contains('active');
        chatbotWindow.classList.toggle('active');
        chatbotButton.setAttribute('aria-expanded', !isActive);
        
        // Hide notification badge when opened
        if (!isActive && notificationBadge) {
            notificationBadge.classList.remove('show');
        }
        
        // Focus input when opened
        if (!isActive) {
            setTimeout(() => chatbotInput?.focus(), 100);
        }
    });

    // Close chatbot
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
        chatbotButton.setAttribute('aria-expanded', 'false');
    });

    // Send message on button click
    chatbotSend.addEventListener('click', sendMessage);

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chatbotWindow.classList.contains('active')) {
            chatbotWindow.classList.remove('active');
            chatbotButton.setAttribute('aria-expanded', 'false');
        }
    });

    // Show notification badge after 3 seconds (demo)
    setTimeout(() => {
        if (notificationBadge && !chatbotWindow.classList.contains('active')) {
            notificationBadge.classList.add('show');
        }
    }, 3000);
}

// Service cards step animation
function initServiceCardsAnimation() {
    const serviceCards = document.getElementById('serviceCards');
    if (!serviceCards) return;

    let currentIndex = 0;
    const cardWidth = 300; // Card width in pixels
    const gap = 24; // Gap between cards
    const stepDistance = cardWidth + gap; // 324px per step
    const totalCards = 6; // Number of unique cards
    let isPaused = false;
    let animationTimeout;

    function moveToNext() {
        if (isPaused) return;

        currentIndex++;
        
        // If we've shown all 6 cards, reset to start (seamless loop)
        if (currentIndex >= totalCards) {
            // Reset without animation for seamless loop
            serviceCards.classList.add('paused');
            currentIndex = 0;
            serviceCards.style.transform = 'translateX(0)';
            
            // Re-enable transition after reset
            setTimeout(() => {
                serviceCards.classList.remove('paused');
            }, 50);
        } else {
            serviceCards.style.transform = `translateX(calc(-${stepDistance * currentIndex}px))`;
        }

        // Schedule next move after 3 seconds
        animationTimeout = setTimeout(moveToNext, 3000);
    }

    // Start animation after 1 second delay
    setTimeout(() => {
        moveToNext();
    }, 1000);

    // Pause on hover
    const wrapper = serviceCards.closest('.service-cards-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        wrapper.addEventListener('mouseleave', () => {
            isPaused = false;
            // Continue from current position
            animationTimeout = setTimeout(moveToNext, 3000);
        });
    }
}

// Features cards step animation (Why Choose Us section)
function initFeaturesCardsAnimation() {
    const featuresCards = document.getElementById('featuresCards');
    if (!featuresCards) return;

    let currentIndex = 0;
    const cardWidth = 280; // Feature card width in pixels
    const gap = 24; // Gap between cards
    const stepDistance = cardWidth + gap; // 304px per step
    const totalCards = 4; // Number of unique feature cards
    let isPaused = false;
    let animationTimeout;

    function moveToNext() {
        if (isPaused) return;

        currentIndex++;
        
        // If we've shown all 4 cards, reset to start (seamless loop)
        if (currentIndex >= totalCards) {
            // Reset without animation for seamless loop
            featuresCards.classList.add('paused');
            currentIndex = 0;
            featuresCards.style.transform = 'translateX(0)';
            
            // Re-enable transition after reset
            setTimeout(() => {
                featuresCards.classList.remove('paused');
            }, 50);
        } else {
            featuresCards.style.transform = `translateX(calc(-${stepDistance * currentIndex}px))`;
        }

        // Schedule next move after 3 seconds
        animationTimeout = setTimeout(moveToNext, 3000);
    }

    // Start animation after 1 second delay
    setTimeout(() => {
        moveToNext();
    }, 1000);

    // Pause on hover
    const wrapper = featuresCards.closest('.features-wrapper');
    if (wrapper) {
        wrapper.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        wrapper.addEventListener('mouseleave', () => {
            isPaused = false;
            // Continue from current position
            animationTimeout = setTimeout(moveToNext, 3000);
        });
    }
}

// Initialize all features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initHamburgerMenu();
    initStickyNavbar();
    initScrollToTop();
    initChatbot();
    initServiceCardsAnimation();
    initFeaturesCardsAnimation();
});

