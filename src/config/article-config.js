// 文章配图配置文件
// 用于统一管理所有文章的配图资源

const ARTICLE_IMAGES = {
    // 默认文章配图
    DEFAULT_ARTICLE_IMAGE: "https://img.ljcdn.com/newhouse-activity/phplu59MP1757413788.svg+xml.600x.png",
    
    // 特定主题配图（可根据需要扩展）
    AI_TOOLS: "https://img.ljcdn.com/newhouse-activity/phplu59MP1757413788.svg+xml.600x.png",
    CONTENT_MARKETING: "https://img.ljcdn.com/newhouse-activity/phplu59MP1757413788.svg+xml.600x.png",
    SOCIAL_MEDIA: "https://img.ljcdn.com/newhouse-activity/phplu59MP1757413788.svg+xml.600x.png",
    STRATEGY: "https://img.ljcdn.com/newhouse-activity/phplu59MP1757413788.svg+xml.600x.png",
    
    // 占位符图片（用于开发测试）
    PLACEHOLDER: "https://img.ljcdn.com/newhouse-activity/phplu59MP1757413788.svg+xml.600x.png"
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ARTICLE_IMAGES;
} else if (typeof window !== 'undefined') {
    window.ARTICLE_IMAGES = ARTICLE_IMAGES;
}
