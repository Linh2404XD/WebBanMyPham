import React from 'react';

const Sidebar = () => {
    return (
        <aside id="layout-menu" className="layout-menu menu-vertical menu bg-menu-theme">
            <div className="app-brand demo">
                <a href="/" className="app-brand-link">
                    <span className="app-brand-text demo menu-text fw-bold ms-2">Ogani</span>
                </a>
                <a href="/dashboard" className="layout-menu-toggle menu-link text-large ms-auto">
                    <i className="bx bx-chevron-left d-block d-xl-none align-middle"></i>
                </a>
            </div>
            <div className="menu-divider mt-0"></div>
            <div className="menu-inner-shadow"></div>
            <ul className="menu-inner py-1">
                <li className="menu-item active">
                    <a href="/dashboard" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-home-smile"></i>
                        <div className="text-truncate">TRANG CHỦ</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="/manage-account" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-dock-top"></i>
                        <div className="text-truncate">QUẢN LÝ TÀI KHOẢN</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="/manage-order" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-cart"></i>
                        <div className="text-truncate">QUẢN LÝ ĐƠN HÀNG</div>
                    </a>
                </li>
                <li className="menu-item">
                    <a href="/manage-product" className="menu-link">
                        <i className="menu-icon tf-icons bx bx-box"></i>
                        <div className="text-truncate">QUẢN LÝ SẢN PHẨM</div>
                    </a>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
