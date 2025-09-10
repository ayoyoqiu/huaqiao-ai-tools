// 花桥小智 - 主要交互功能
document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有功能
    initToolFilters();
    initToolCards();
    initSmoothScrolling();
    initMobileMenu();
    initScrollEffects();
    initTooltips();
});

// 工具筛选功能
function initToolFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的 'active' 类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为被点击的按钮添加 'active' 类
            this.classList.add('active');
            
            // 获取选中的分类
            const selectedCategory = this.textContent.trim();
            
            // 筛选工具卡片
            toolCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                const categories = cardCategory.split(' ');
                
                // 关闭所有卡片的详情
                card.classList.remove('active');
                const content = card.querySelector('.tool-content');
                if (content) {
                    content.style.display = 'none';
                }
                
                // 显示或隐藏卡片
                if ((selectedCategory === '精选工具' && categories.includes('精选工具')) || 
                    (selectedCategory !== '精选工具' && categories.includes(selectedCategory))) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                    // 添加淡入动画
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
}

// 工具卡片交互功能
function initToolCards() {
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是试用按钮，不处理卡片展开
            if (e.target.classList.contains('try-btn')) {
                return;
            }

            // 移除所有卡片的 'active' 类
            toolCards.forEach(c => c.classList.remove('active'));
            
            // 为被点击的卡片添加 'active' 类
            this.classList.add('active');
            
            // 显示详细内容
            const content = this.querySelector('.tool-content');
            if (content) {
                content.style.display = 'block';
                // 添加展开动画
                content.style.opacity = '0';
                content.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    content.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    content.style.opacity = '1';
                    content.style.transform = 'scale(1)';
                }, 10);
            }
        });
    });

    // 点击卡片外部关闭详情
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.tool-card')) {
            toolCards.forEach(card => {
                card.classList.remove('active');
                const content = card.querySelector('.tool-content');
                if (content) {
                    content.style.display = 'none';
                }
            });
        }
    });

    // 试用按钮功能
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('try-btn')) {
            e.stopPropagation();
            const toolName = e.target.closest('.tool-card').querySelector('h3').textContent;
            
            // 创建模态框
            showToolModal(toolName);
        }
    });
}

// 显示工具试用模态框
function showToolModal(toolName) {
    // 创建模态框HTML
    const modalHTML = `
        <div class="tool-modal-overlay">
            <div class="tool-modal">
                <div class="tool-modal-header">
                    <h3>试用 ${toolName}</h3>
                    <button class="tool-modal-close">&times;</button>
                </div>
                <div class="tool-modal-content">
                    <p>正在为您打开 ${toolName} 工具...</p>
                    <div class="tool-modal-loading">
                        <div class="loading-spinner"></div>
                    </div>
                    <p class="tool-modal-note">如果工具没有自动打开，请检查浏览器弹窗设置。</p>
                </div>
                <div class="tool-modal-footer">
                    <button class="btn-secondary tool-modal-close">关闭</button>
                </div>
            </div>
        </div>
    `;

    // 添加模态框到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .tool-modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            animation: fadeIn 0.3s ease;
        }
        
        .tool-modal {
            background: white;
            border-radius: 12px;
            max-width: 400px;
            width: 90%;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease;
        }
        
        .tool-modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 20px;
            border-bottom: 1px solid #eee;
        }
        
        .tool-modal-header h3 {
            margin: 0;
            color: #333;
        }
        
        .tool-modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .tool-modal-close:hover {
            color: #333;
        }
        
        .tool-modal-content {
            padding: 20px;
            text-align: center;
        }
        
        .tool-modal-loading {
            margin: 20px 0;
        }
        
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #8A2BE2;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
        }
        
        .tool-modal-note {
            font-size: 14px;
            color: #666;
            margin-top: 15px;
        }
        
        .tool-modal-footer {
            padding: 20px;
            text-align: right;
            border-top: 1px solid #eee;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-50px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // 绑定关闭事件
    const modal = document.querySelector('.tool-modal-overlay');
    const closeButtons = modal.querySelectorAll('.tool-modal-close');
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            modal.remove();
            style.remove();
        });
    });

    // 点击遮罩层关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            style.remove();
        }
    });

    // 3秒后自动关闭
    setTimeout(() => {
        if (modal && modal.parentNode) {
            modal.remove();
            style.remove();
        }
    }, 3000);
}

// 平滑滚动功能
function initSmoothScrolling() {
    // 为所有内部链接添加平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 移动端菜单功能
function initMobileMenu() {
    // 创建移动端菜单按钮
    const nav = document.querySelector('.main-nav');
    if (nav && window.innerWidth <= 768) {
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-button';
        menuButton.innerHTML = '☰';
        menuButton.style.cssText = `
            display: none;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #333;
            padding: 10px;
        `;

        // 在移动端显示菜单按钮
        if (window.innerWidth <= 768) {
            menuButton.style.display = 'block';
            nav.appendChild(menuButton);

            // 切换菜单显示
            menuButton.addEventListener('click', () => {
                const navLinks = nav.querySelector('.nav-links');
                if (navLinks) {
                    navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
                }
            });
        }
    }
}

// 滚动效果 - 已移除视差滚动以避免内容重叠
function initScrollEffects() {
    // 保留函数结构以便将来添加其他滚动效果
    // 移除了视差滚动效果，避免hero区域与其他区域重叠
}

// 工具提示功能
function initTooltips() {
    const toolCards = document.querySelectorAll('.tool-card');
    
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip';
            tooltip.textContent = '点击查看详情';
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.8);
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                z-index: 1000;
                pointer-events: none;
                opacity: 0;
                transition: opacity 0.3s ease;
            `;
            
            this.appendChild(tooltip);
            
            // 定位工具提示
            const rect = this.getBoundingClientRect();
            tooltip.style.left = '50%';
            tooltip.style.top = '-40px';
            tooltip.style.transform = 'translateX(-50%)';
            
            setTimeout(() => {
                tooltip.style.opacity = '1';
            }, 10);
        });
        
        card.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// 响应式处理
window.addEventListener('resize', function() {
    // 重新初始化移动端菜单
    initMobileMenu();
});

// 页脚工具筛选功能
function filterTools(category) {
    // 滚动到工具区域
    const toolsSection = document.getElementById('tools');
    if (toolsSection) {
        toolsSection.scrollIntoView({ behavior: 'smooth' });
    }
    
    // 模拟点击对应的筛选按钮
    setTimeout(() => {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            if (button.textContent.trim() === category) {
                button.click();
            }
        });
    }, 500);
}

// 将函数暴露到全局作用域
window.filterTools = filterTools;

// 页面加载完成后的额外初始化
window.addEventListener('load', function() {
    // 添加页面加载动画
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
