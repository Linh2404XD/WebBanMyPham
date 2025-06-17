import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle } from "lucide-react"; // Cần cài: lucide-react

function PaymentResult() {
    const location = useLocation();
    const navigate = useNavigate();
    const query = new URLSearchParams(location.search);

    const vnp_ResponseCode = query.get("vnp_ResponseCode");

    const isSuccess = vnp_ResponseCode === "00";

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center" style={{width: "1280px"}}>
                <div className="flex justify-center mb-4">
                    {isSuccess ? (
                        <CheckCircle className="text-green-500 w-20 h-20" />
                    ) : (
                        <XCircle className="text-red-500 w-20 h-20" />
                    )}
                </div>

                <h1 className="text-2xl font-bold mb-4">
                    {isSuccess ? "Thanh toán thành công!" : "Thanh toán thất bại!"}
                </h1>

                <button
                    onClick={() => navigate("/home")}
                    className="mt-6 px-6 py-2 bg-green-500 text-black-50 rounded-xl hover:bg-green-600 transition"
                >
                    Quay về trang chủ
                </button>
            </div>
        </div>
    );
}

export default PaymentResult;
