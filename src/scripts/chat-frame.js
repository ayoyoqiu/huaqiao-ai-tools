class ChatFrame {
    constructor() {
        this.createElements();
        this.initializeEventListeners();
    }

    createElements() {
        const modalHTML = `
            <div class="chat-modal-overlay">
                <div class="chat-modal">
                    <div class="chat-header">
                        <div class="chat-title">
                            <h3>花桥小智</h3>
                            <p>您的智能助手</p>
                        </div>
                        <button class="chat-close">✕</button>
                    </div>
                    <div class="chat-frame-container">
                        <div class="loading-overlay">
                            <div class="loading-spinner"></div>
                            <p>正在连接智能助手...</p>
                        </div>
                        <iframe 
                            src="about:blank"
                            frameborder="0"
                            width="100%"
                            height="100%"
                            allow="microphone"
                            style="opacity: 0; transition: opacity 0.3s ease;"
                        ></iframe>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHTML);

        // 保存元素引用
        this.overlay = document.querySelector('.chat-modal-overlay');
        this.modal = document.querySelector('.chat-modal');
        this.closeButton = document.querySelector('.chat-close');
        this.iframe = document.querySelector('.chat-frame-container iframe');
        this.loadingOverlay = document.querySelector('.loading-overlay');

        // 监听 iframe 加载完成
        this.iframe.addEventListener('load', () => {
            if (this.iframe.src !== 'about:blank') {
                setTimeout(() => {
                    this.loadingOverlay.style.opacity = '0';
                    this.iframe.style.opacity = '1';
                    setTimeout(() => {
                        this.loadingOverlay.style.display = 'none';
                    }, 300);
                }, 500);
            }
        });
    }

    initializeEventListeners() {
        // 点击英雄区域图片打开对话框
        const heroImage = document.querySelector('.hero-image-container');
        if (heroImage) {
            heroImage.addEventListener('click', () => this.open());
        }

        // 关闭对话框
        this.closeButton.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });

        // 处理 ESC 键关闭
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.close();
            }
        });
    }

    open() {
        // 打开对话框时才设置 iframe 的 src，避免预加载导致的问题
        if (!this.iframe.src || this.iframe.src === 'about:blank') {
            this.iframe.src = 'https://bella.ke.com/agent/465852087828480';
        }
        
        this.overlay.classList.add('active');
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
    }

    close() {
        this.overlay.classList.remove('active');
        this.modal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    }
}

// 初始化对话框
document.addEventListener('DOMContentLoaded', () => {
    window.chatFrame = new ChatFrame();
});