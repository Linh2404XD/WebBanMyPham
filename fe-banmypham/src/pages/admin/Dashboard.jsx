import React, {useEffect} from 'react';
import Sidebar from "../../components/admin/Sidebar.jsx";


const FullDashboard = () => {
    useEffect(() => {
        const scripts = [
            '/assets/vendor/libs/jquery/jquery.js',
            '/assets/vendor/libs/popper/popper.js',
            '/assets/vendor/js/bootstrap.js',
            '/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.js',
            '/assets/vendor/js/menu.js',
            '/assets/vendor/libs/apex-charts/apexcharts.js',
            '/assets/js/main.js',
            '/assets/js/dashboards-analytics.js',
            'https://buttons.github.io/buttons.js'
        ];

        scripts.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            script.async = true;
            document.body.appendChild(script);
        });

        const chartOptions = {
            chart: {
                type: 'donut',
                height: 250
            },
            labels: ['Electronic', 'Fashion', 'Decor', 'Sports'],
            series: [82580, 23800, 849000, 99],
            colors: ['#696CFF', '#71DD37', '#03C3EC', '#8592A3'],
            legend: {position: 'bottom'}
        };

        const tryInitChart = () => {
            if (window.ApexCharts && document.querySelector('#orderStatisticsChart')) {
                const chart = new window.ApexCharts(document.querySelector('#orderStatisticsChart'), chartOptions);
                chart.render();
            } else {
                setTimeout(tryInitChart, 200);
            }
        };
        tryInitChart();

        return () => {
            if (window.ApexCharts && document.querySelector('#orderStatisticsChart')) {
                const chart = new window.ApexCharts(document.querySelector('#orderStatisticsChart'), chartOptions);
                chart.destroy();
            }
            scripts.forEach(src => {
                const scriptTags = document.querySelectorAll(`script[src="${src}"]`);
                scriptTags.forEach(tag => tag.remove());
            });
        };
    }, []);

    return (
        <div className="layout-wrapper layout-content-navbar">
            <div className="layout-container">
                <Sidebar/>
                <div className="position-absolute top-0 end-0 p-3" style={{zIndex: 1050}}>
                    <ul className="navbar-nav flex-row align-items-center">
                        <li className="nav-item dropdown-user dropdown">
                            <button className="nav-link dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                <div className="avatar avatar-online">
                                    <img
                                        src="../assets/img/avatars/1.png"
                                        alt="avatar"
                                        className="w-px-40 h-auto rounded-circle"
                                    />
                                </div>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-user me-2"></i>
                                        <span className="align-middle">My Profile</span>
                                    </a>
                                </li>
                                <li>
                                    <hr className="dropdown-divider"/>
                                </li>
                                <li>
                                    <a className="dropdown-item" href="#">
                                        <i className="bx bx-power-off me-2"></i>
                                        <span className="align-middle">Log Out</span>
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className="content-wrapper w-100 px-0">
                    <div className="container-fluid flex-grow-1 container-p-y">
                        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4 mb-4">
                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body px-3 py-4">
                                        <h6 className="card-subtitle text-muted">Profit</h6>
                                        <h4 className="card-title">$12,628</h4>
                                        <p className="text-success mb-0">
                                            <i className="bx bx-up-arrow-alt"></i> +72.80%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body px-3 py-4">
                                        <h6 className="card-subtitle text-muted">Sales</h6>
                                        <h4 className="card-title">$4,679</h4>
                                        <p className="text-success mb-0">
                                            <i className="bx bx-up-arrow-alt"></i> +28.42%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body px-3 py-4">
                                        <h6 className="card-subtitle text-muted">Payments</h6>
                                        <h4 className="card-title">$2,456</h4>
                                        <p className="text-danger mb-0">
                                            <i className="bx bx-down-arrow-alt"></i> -14.82%
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="col">
                                <div className="card h-100">
                                    <div className="card-body px-3 py-4">
                                        <h6 className="card-subtitle text-muted">Transactions</h6>
                                        <h4 className="card-title">$14,857</h4>
                                        <p className="text-success mb-0">
                                            <i className="bx bx-up-arrow-alt"></i> +28.14%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Statistics with ApexCharts */}
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="card-title">Order Statistics</h5>
                                <p className="card-subtitle">42.82k Total Sales</p>
                            </div>
                            <div className="card-body">
                                <div id="orderStatisticsChart"></div>

                                {/* Order Categories Details */}
                                <ul className="p-0 m-0 mt-4">
                                    <li className="d-flex align-items-center mb-4">
                                        <div className="avatar flex-shrink-0 me-3">
                                        <span className="avatar-initial rounded bg-label-primary">
                                            <i className="icon-base bx bx-mobile-alt"></i>
                                        </span>
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Electronic</h6>
                                                <small>Mobile, Earbuds, TV</small>
                                            </div>
                                            <div className="user-progress">
                                                <h6 className="mb-0">82.5k</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center mb-4">
                                        <div className="avatar flex-shrink-0 me-3">
                                        <span className="avatar-initial rounded bg-label-success">
                                            <i className="icon-base bx bx-closet"></i>
                                        </span>
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Fashion</h6>
                                                <small>T-shirt, Jeans, Shoes</small>
                                            </div>
                                            <div className="user-progress">
                                                <h6 className="mb-0">23.8k</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center mb-4">
                                        <div className="avatar flex-shrink-0 me-3">
                                        <span className="avatar-initial rounded bg-label-info">
                                            <i className="icon-base bx bx-home-alt"></i>
                                        </span>
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Decor</h6>
                                                <small>Fine Art, Dining</small>
                                            </div>
                                            <div className="user-progress">
                                                <h6 className="mb-0">849k</h6>
                                            </div>
                                        </div>
                                    </li>
                                    <li className="d-flex align-items-center">
                                        <div className="avatar flex-shrink-0 me-3">
                                            <span className="avatar-initial rounded bg-label-secondary">
                                                <i className="icon-base bx bx-football"></i>
                                            </span>
                                        </div>
                                        <div
                                            className="d-flex w-100 flex-wrap align-items-center justify-content-between gap-2">
                                            <div className="me-2">
                                                <h6 className="mb-0">Sports</h6>
                                                <small>Football, Cricket Kit</small>
                                            </div>
                                            <div className="user-progress">
                                                <h6 className="mb-0">99</h6>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FullDashboard;
