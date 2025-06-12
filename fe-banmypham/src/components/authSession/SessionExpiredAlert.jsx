import { useContext, useEffect } from "react";
import { AuthContext } from "./AuthContext.jsx";

const SessionExpiredAlert = () => {
    const { sessionExpired, logout } = useContext(AuthContext);

    useEffect(() => {
        if (sessionExpired) {
            alert("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
            logout();
        }
    }, [sessionExpired, logout]);

    return null;
};

export default SessionExpiredAlert;
