import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            email: "hello@colorlib.com",
            freeShipping: "Free Shipping for all orders over $99",
            language: "English",
            home: "Home",
            shop: "Shop",
            pages: "Pages",
            blog: "Blog",
            contact: "Contact",
            shopDetails: "Shop Details",
            shoppingCart: "Shopping Cart",
            checkout: "Check Out",
            blogDetails: "Blog Details",
            login: "Login",
            welcome: "Welcome to Ogani Clinic & Spa",
            introText: "Ogani Clinic & Spa is proud to be one of the leading beauty care centers...",
            services: "Our Services",
            locations: "Clinic Locations",
            featuredProducts: "Featured Products",
            commitment: "With a team of experienced experts and advanced technology, Ogani is committed to providing the best experience for its customers.",
            service: {
                acne: "Acne, scar, melasma, and freckles treatment",
                hairRemoval: "High-tech hair removal",
                weightLoss: "Non-invasive weight loss",
                skinRejuvenation: "Skin rejuvenation and brightening",
                relaxation: "Deep relaxation and skincare"
            },
            location: {
                address1: "94 Le Van Viet, Hiep Phu Ward, District 9, Ho Chi Minh City",
                address2: "39 Nguyen Van Tang, Long Thanh My Ward, Ho Chi Minh City",
                address3: "256 Do Xuan Hop, Quarter 4, District 9, Ho Chi Minh City"
            },
            product: {
                megaduoTitle: "Megaduo Plus Gel - Acne Reduction & Scar Fading 15g",
                megaduoAlt: "Megaduo Plus Gel",
                laserTitle: "Diode Laser Hair Removal - Safe & Effective",
                laserAlt: "Diode Laser Hair Removal",
                whiteningTitle: "Underarm Whitening Treatment",
                whiteningAlt: "Underarm Whitening Treatment"
            },
            contact1:{
                title: "Contact Information",
                description: "Fill up the form and our team will get back to you within 24 hours",
                phone: "+233543201893",
                email: "hello@colorlib.com",
                formTitle: "Contact Us",
                formDescription: "Any questions or remarks? Just write us a message",
                nameLabel: "Name",
                namePlaceholder: "Allen Jones",
                emailLabel: "Email",
                emailPlaceholder: "aljay126@gmail.com",
                phoneLabel: "Phone",
                phonePlaceholder: "+233546227893",
                messageLabel: "Message",
                messagePlaceholder: "Write your message",
                submitButton: "Send Message",
            },
        },
    },
    vi: {
        translation: {
            email: "hello@colorlib.com.vn",
            freeShipping: "Miễn phí vận chuyển cho mọi đơn hàng trên 99$",
            language: "Tiếng Việt",
            home: "Trang chủ",
            shop: "Cửa hàng",
            pages: "Trang",
            blog: "Blog",
            contact: "Liên hệ",
            shopDetails: "Chi tiết cửa hàng",
            shoppingCart: "Giỏ hàng",
            checkout: "Thanh toán",
            blogDetails: "Chi tiết blog",
            login: "Đăng nhập",
            welcome: "Chào mừng đến với Ogani Clinic & Spa",
            introText: "Ogani Clinic & Spa tự hào là một trong những trung tâm chăm sóc sắc đẹp hàng đầu...",
            services: "Dịch vụ của chúng tôi",
            locations: "Địa chỉ phòng khám",
            featuredProducts: "Sản phẩm nổi bật",
            commitment: "Với đội ngũ chuyên gia giàu kinh nghiệm và công nghệ tiên tiến, Ogani cam kết mang đến trải nghiệm tốt nhất cho khách hàng.",
            service: {
                acne: "Điều trị mụn, sẹo rỗ, nám - tàn nhang",
                hairRemoval: "Triệt lông công nghệ cao",
                weightLoss: "Giảm béo không xâm lấn",
                skinRejuvenation: "Trẻ hóa và dưỡng sáng da",
                relaxation: "Thư giãn và chăm sóc da chuyên sâu"
            },
            location: {
                address1: "94 Lê Văn Việt, P. Hiệp Phú, Quận 9, TP.HCM",
                address2: "39 Nguyễn Văn Tăng, Phường Long Thạnh Mỹ, TP.HCM",
                address3: "256 Đỗ Xuân Hợp, Khu phố 4, Quận 9, TP.HCM"
            },
            product: {
                megaduoTitle: "Gel Dưỡng Megaduo Plus Giảm Mụn, Mờ Thâm 15g",
                megaduoAlt: "Gel Dưỡng Megaduo Plus",
                laserTitle: "Triệt Lông Diode Laser An Toàn & Hiệu Quả",
                laserAlt: "Triệt Lông Diode Laser",
                whiteningTitle: "Ủ Trắng Vùng Nách",
                whiteningAlt: "Ủ Trắng Vùng Nách"
            },
            contact1: {
                title: "Thông Tin Liên Hệ",
                description: "Điền vào biểu mẫu và đội ngũ của chúng tôi sẽ phản hồi trong vòng 24 giờ",
                phone: "+233543201893",
                formTitle: "Liên hệ với chúng tôi",
                formDescription: "Có câu hỏi hoặc góp ý? Hãy gửi tin nhắn cho chúng tôi",
                nameLabel: "Tên",
                namePlaceholder: "Nguyễn Văn A",
                emailLabel: "Email",
                emailPlaceholder: "nguyenvana@gmail.com",
                phoneLabel: "Số điện thoại",
                phonePlaceholder: "+84987654321",
                messageLabel: "Tin nhắn",
                messagePlaceholder: "Nhập tin nhắn của bạn",
                submitButton: "Gửi tin nhắn",
            }
        },
    },
    zh: {
        translation: {
            email: "你好@colorlib.com",
            freeShipping: "所有99美元以上的订单免费送货",
            language: "中文",
            home: "首页",
            shop: "商店",
            pages: "页面",
            blog: "博客",
            contact: "联系",
            shopDetails: "商店详情",
            shoppingCart: "购物车",
            checkout: "结账",
            blogDetails: "博客详情",
            login: "登录",
            welcome: "欢迎来到 Ogani 诊所和水疗中心",
            introText: "Ogani 诊所和水疗中心是领先的美容护理中心之一，提供专业皮肤治疗、放松和综合护理。",
            services: "我们的服务",
            locations: "诊所地址",
            featuredProducts: "特色产品",
            commitment: "Ogani 拥有经验丰富的专家团队和先进技术，致力于为客户提供最佳体验。",
            service: {
                acne: "治疗痤疮、疤痕、黄褐斑和雀斑",
                hairRemoval: "高科技激光脱毛",
                weightLoss: "非侵入性减肥",
                skinRejuvenation: "皮肤焕活与美白",
                relaxation: "深度放松和皮肤护理"
            },
            location: {
                address1: "94 Le Van Viet, Hiep Phu Ward, District 9, Ho Chi Minh City",
                address2: "39 Nguyen Van Tang, Long Thanh My Ward, Ho Chi Minh City",
                address3: "256 Do Xuan Hop, Quarter 4, District 9, Ho Chi Minh City"
            },
            product: {
                megaduoTitle: "Megaduo Plus 凝胶 - 祛痘、淡化痘印 15g",
                megaduoAlt: "Megaduo Plus 凝胶",
                laserTitle: "二极管激光脱毛 - 安全有效",
                laserAlt: "二极管激光脱毛",
                whiteningTitle: "腋下美白护理",
                whiteningAlt: "腋下美白护理"
            },
            contact1:{
                title: "联系信息",
                description: "填写表格，我们的团队将在24小时内回复您",
                phone: "+233543201893",
                formTitle: "联系我们",
                formDescription: "任何问题或评论？请写信给我们",
                nameLabel: "姓名",
                namePlaceholder: "王小明",
                emailLabel: "电子邮件",
                emailPlaceholder: "wangxiaoming@gmail.com",
                phoneLabel: "电话",
                phonePlaceholder: "+86123456789",
                messageLabel: "留言",
                messagePlaceholder: "写下您的消息",
                submitButton: "发送消息",
            },
        },
    },
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en", // Ngôn ngữ mặc định
    fallbackLng: "en",
    interpolation: {
        escapeValue: false,
    },
});

export default resources;
