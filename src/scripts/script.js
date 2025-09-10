// 花桥小智 - 主要交互功能

// 工具卡片筛选功能
function filterCards(category, cards) {
    console.log('Filtering cards by category:', category);
    
    cards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        const shouldShow = category === 'AI精选工具' ? 
            categories.includes('AI精选工具') : 
            categories.includes(category);
            
        if (shouldShow) {
            card.style.display = 'block';
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // 强制重排以触发动画
            card.offsetHeight;
            
            requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        } else {
            card.style.display = 'none';
            card.style.opacity = '0';
        }
    });
}

// 初始化工具卡片筛选功能
function initToolFilters() {
    console.log('Initializing tool filters...');
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolCards = document.querySelectorAll('.tool-card');

    console.log('Found buttons:', filterButtons.length);
    console.log('Found cards:', toolCards.length);
    
    // 为每个按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.textContent.trim();
            console.log('Button clicked:', category);
            
            // 更新按钮状态
            filterButtons.forEach(btn => {
                if (btn.textContent.trim() === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            
            // 筛选卡片
            filterCards(category, toolCards);
        });
    });
    
    // 初始化时显示精选工具
    console.log('Initial filtering: AI精选工具');
    filterButtons[0].classList.add('active');
    filterCards('AI精选工具', toolCards);
}

// 初始化工具卡片点击功能
function initToolCards() {
    console.log('Initializing tool cards...');
    
    const toolCards = document.querySelectorAll('.tool-card');

    toolCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // 如果点击的是试用按钮，不处理卡片点击
            if (e.target.closest('.try-btn')) {
                return;
            }

            // 获取卡片信息
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const content = this.querySelector('.tool-content');
            const features = Array.from(content.querySelectorAll('ul li')).map(li => li.textContent);
            const scenarios = content.querySelector('p:last-of-type').textContent;
            const tryLink = content.querySelector('.try-btn').href;
            const isChina = this.querySelector('.tool-tag').classList.contains('china');
            const iconColor = this.querySelector('.tool-icon').className.split(' ')[1];
            
            console.log('Opening modal for:', title);
            
            // 显示模态框
            showToolDetailModal({
                title,
                description,
                features,
                scenarios,
                tryLink,
                isChina,
                iconColor
            });
        });
    });
}

// 显示工具详情模态框
function showToolDetailModal(tool) {
    console.log('Showing modal for:', tool.title);
    
    const modalHTML = `
        <div class="tool-detail-modal-overlay">
            <div class="tool-detail-modal">
                <div class="tool-detail-modal-header">
                    <div class="tool-detail-title-group">
                        <div class="tool-icon ${tool.iconColor}"></div>
                        <div class="title-with-tag">
                            <h3>${tool.title}</h3>
                            <div class="tool-tag ${tool.isChina ? 'china' : 'global'}">${tool.isChina ? '国内' : '海外'}</div>
                        </div>
                    </div>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="tool-detail-modal-content">
                    <p class="tool-description">${tool.description}</p>
                    <div class="tool-features">
                        <h4>🔥 功能特点</h4>
                        <ul>
                            ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="tool-scenarios">
                        <h4>🎯 ${tool.scenarios}</h4>
                    </div>
                    <div class="tool-actions">
                        <a href="${tool.tryLink}" target="_blank" class="try-btn">立即试用</a>
                    </div>
                </div>
            </div>
        </div>
    `;

    // 添加模态框到页面
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // 添加模态框样式
    const style = document.createElement('style');
    style.textContent = `
        .tool-detail-modal-overlay {
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
        
        .tool-detail-modal {
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
            animation: slideIn 0.3s ease;
        }
        
        .tool-detail-modal-header {
            padding: 20px;
            border-bottom: 1px solid #eee;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            background: white;
            border-radius: 16px 16px 0 0;
            z-index: 1;
        }
        
        .tool-detail-title-group {
            display: flex;
            align-items: center;
            gap: 12px;
        }
        
        .title-with-tag {
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .tool-detail-title-group h3 {
            margin: 0;
            font-size: 20px;
            color: #333;
        }
        
        .tool-detail-title-group .tool-tag {
            position: static;
            margin-top: 0;
            font-size: 12px;
            padding: 2px 8px;
            border-radius: 4px;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 28px;
            cursor: pointer;
            color: #999;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.3s ease;
        }
        
        .modal-close:hover {
            background: #f5f5f5;
            color: #333;
        }
        
        .tool-detail-modal-content {
            padding: 20px;
        }
        
        .tool-description {
            font-size: 16px;
            color: #666;
            margin-bottom: 24px;
            line-height: 1.6;
        }
        
        .tool-features {
            margin-bottom: 24px;
        }
        
        .tool-features h4,
        .tool-scenarios h4 {
            font-size: 18px;
            color: #333;
            margin-bottom: 16px;
        }
        
        .tool-features ul {
            list-style: none;
            padding: 0;
            margin: 0;
        }
        
        .tool-features li {
            padding: 12px 16px;
            background: #f8f9fa;
            border-radius: 8px;
            margin-bottom: 8px;
            font-size: 15px;
            color: #555;
        }
        
        .tool-features li:last-child {
            margin-bottom: 0;
        }
        
        .tool-scenarios {
            margin-bottom: 24px;
        }
        
        .tool-actions {
            text-align: center;
            padding-top: 16px;
        }
        
        .tool-actions .try-btn {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(135deg, #8A2BE2, #4A90E2);
            color: white;
            text-decoration: none;
            border-radius: 24px;
            font-size: 16px;
            font-weight: 500;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .tool-actions .try-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(138, 43, 226, 0.2);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideIn {
            from { transform: translateY(-20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
        
        .fade-out {
            animation: fadeOut 0.3s ease forwards;
        }
        
        @media (max-width: 768px) {
            .tool-detail-modal {
                width: 95%;
                margin: 20px;
            }
            
            .tool-detail-title-group h3 {
                font-size: 18px;
            }
            
            .tool-features li {
                padding: 10px 14px;
                font-size: 14px;
            }
        }
    `;
    document.head.appendChild(style);

    // 获取模态框元素
    const modal = document.querySelector('.tool-detail-modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');

    // 绑定关闭事件
    function closeModal() {
        modal.classList.add('fade-out');
        setTimeout(() => {
            modal.remove();
            style.remove();
        }, 300);
    }

    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', closeModal);

    // 点击遮罩层关闭模态框
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 阻止模态框内部点击事件冒泡
    modal.querySelector('.tool-detail-modal').addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// 显示工具试用模态框
function showToolModal(toolName) {
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
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // 获取模态框元素
    const modal = document.querySelector('.tool-modal-overlay');
    const closeButtons = modal.querySelectorAll('.tool-modal-close');
    
    // 绑定关闭事件
    function closeModal() {
        modal.remove();
        style.remove();
    }

    // 点击关闭按钮关闭模态框
    closeButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // 点击遮罩层关闭模态框
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // 3秒后自动关闭
    setTimeout(closeModal, 3000);
}

// 页面初始化
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');
    
    // 初始化工具筛选
    initToolFilters();
    
    // 初始化工具卡片点击
    initToolCards();
    
    // 绑定试用按钮点击事件
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('try-btn')) {
            e.stopPropagation();
            const toolName = e.target.closest('.tool-card')?.querySelector('h3')?.textContent || 
                           e.target.closest('.tool-detail-modal')?.querySelector('h3')?.textContent;
            
            if (toolName) {
                showToolModal(toolName);
            }
        }
    });
});
