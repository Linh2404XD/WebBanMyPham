import { useLocation } from "react-router-dom";

function PaymentReturn() {
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    // Lấy các params VNPAY gửi về
    const vnp_ResponseCode = query.get("vnp_ResponseCode");
    const vnp_TxnRef = query.get("vnp_TxnRef");
    const vnp_SecureHash = query.get("vnp_SecureHash");
    // ... các params khác

    // Hiển thị kết quả thanh toán
    return (

        <div>
            <h1>Kết quả thanh toán</h1>
            <p>Mã đơn hàng: {vnp_TxnRef}</p>
            <p>Mã phản hồi: {vnp_ResponseCode}</p>
            <p>Chữ ký: {vnp_SecureHash}</p>
            {/* Bạn có thể gọi API backend verify chữ ký rồi hiển thị thông báo chính xác */}
        </div>
    );
}

export default PaymentReturn;
