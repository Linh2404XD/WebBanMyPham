package com.webanmypham.backend.service;

import com.webanmypham.backend.config.PaymentConfig;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class PaymentService {

    @Autowired
    private PaymentConfig paymentConfig;

    public String createPaymentUrl(Long amount, String language, HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> vnp_Params = new HashMap<>();

        // Các tham số bắt buộc
        vnp_Params.put("vnp_Version", "2.1.0");
        vnp_Params.put("vnp_Command", "pay");
        vnp_Params.put("vnp_TmnCode", paymentConfig.vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount * 100)); // VNPAY tính bằng đơn vị nhỏ nhất (100 đồng)
        vnp_Params.put("vnp_CurrCode", "VND");
        vnp_Params.put("vnp_OrderInfo", "Thanh toan don hang"); // Không dấu tiếng Việt, tránh lỗi
        vnp_Params.put("vnp_OrderType", "other");
        vnp_Params.put("vnp_TxnRef", String.valueOf(System.currentTimeMillis()));
        vnp_Params.put("vnp_Locale", (language != null && !language.isEmpty()) ? language : "vn");
        vnp_Params.put("vnp_ReturnUrl", paymentConfig.vnp_ReturnUrl);

        // Lấy IP client, nếu IP null hoặc localhost thì lấy IP khác (nếu cần)
        String ipAddr = request.getRemoteAddr();
        if (ipAddr == null || ipAddr.isEmpty() || ipAddr.equals("0:0:0:0:0:0:0:1") || ipAddr.equals("127.0.0.1")) {
            ipAddr = "127.0.0.1"; // hoặc lấy IP server nếu cần
        }
        vnp_Params.put("vnp_IpAddr", ipAddr);

        // Định dạng ngày giờ theo chuẩn, timezone đồng bộ
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        formatter.setTimeZone(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));

        // Lấy thời điểm hiện tại 1 lần để đảm bảo nhất quán
        Date now = new Date();
        String createDate = formatter.format(now);
        vnp_Params.put("vnp_CreateDate", createDate);

        // Tạo expireDate = createDate + 30 phút
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        cal.setTime(now);
        cal.add(Calendar.MINUTE, 30);
        String expireDate = formatter.format(cal.getTime());
        vnp_Params.put("vnp_ExpireDate", expireDate);

        // --- Debug log ---
        System.out.println("CreateDate: " + createDate);
        System.out.println("ExpireDate: " + expireDate);
        System.out.println("Current server time: " + formatter.format(new Date()));

        // Sắp xếp tham số theo key ASCII order để tạo chuỗi ký
        List<String> fieldNames = new ArrayList<>(vnp_Params.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();

        for (Iterator<String> it = fieldNames.iterator(); it.hasNext(); ) {
            String key = it.next();
            String value = vnp_Params.get(key);
            // Tạo chuỗi để hash theo định dạng key=value&key2=value2...
            hashData.append(key).append("=").append(URLEncoder.encode(value, StandardCharsets.US_ASCII));
            // Tạo query url encode đầy đủ
            query.append(URLEncoder.encode(key, StandardCharsets.UTF_8.toString()))
                    .append("=")
                    .append(URLEncoder.encode(value, StandardCharsets.UTF_8.toString()));
            if (it.hasNext()) {
                hashData.append("&");
                query.append("&");
            }
        }

        // Tạo chữ ký băm HMAC SHA512
        String secureHash = hmacSHA512(paymentConfig.vnp_HashSecret, hashData.toString());

        // Thêm chữ ký vào query param
        query.append("&vnp_SecureHash=").append(secureHash);
        query.append("&vnp_SecureHashType=HmacSHA512");

        // Debug thêm để check chuỗi ký và url
        System.out.println("Chuỗi dữ liệu tạo chữ ký (hashData): " + hashData.toString());
        System.out.println("Chữ ký (secureHash): " + secureHash);
        System.out.println("URL thanh toán hoàn chỉnh: " + paymentConfig.vnp_Url + "?" + query);

        return paymentConfig.vnp_Url + "?" + query.toString();
    }


    public static String hmacSHA512(String key, String data) {
        try {
            javax.crypto.Mac hmac512 = javax.crypto.Mac.getInstance("HmacSHA512");
            byte[] hmacKeyBytes = key.getBytes(StandardCharsets.UTF_8);
            javax.crypto.spec.SecretKeySpec secretKey = new javax.crypto.spec.SecretKeySpec(hmacKeyBytes, "HmacSHA512");
            hmac512.init(secretKey);
            byte[] result = hmac512.doFinal(data.getBytes(StandardCharsets.UTF_8));

            StringBuilder sb = new StringBuilder(2 * result.length);
            for (byte b : result) {
                sb.append(String.format("%02x", b & 0xff));
            }
            return sb.toString();
        } catch (Exception e) {
            throw new RuntimeException("Error while calculating HMAC SHA512", e);
        }
    }
}
