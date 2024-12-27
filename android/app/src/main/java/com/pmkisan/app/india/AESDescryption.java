package com.pmkisan.app.india;

import android.annotation.SuppressLint;
import android.util.Log;

import java.util.Base64;

import javax.crypto.Cipher;
import javax.crypto.spec.SecretKeySpec;

public class AESDescryption {

    private static final String ALGORITHM = "AES";
    private static final String CIPHER_TRANSFORMATION = "AES/ECB/PKCS5Padding";

    // Encrypt a string
    public static String encrypt(String data, String key1) {
        try {
            byte[] key = hexStringToByteArray(key1);
            if (key.length != 16 && key.length != 24 && key.length != 32) {
                throw new IllegalArgumentException("Invalid key length: " + key.length);
            }
            SecretKeySpec keySpec = new SecretKeySpec(key, ALGORITHM);
            @SuppressLint("GetInstance") Cipher cipher = Cipher.getInstance(CIPHER_TRANSFORMATION);
            cipher.init(Cipher.ENCRYPT_MODE, keySpec);
            byte[] encrypted = cipher.doFinal(data.getBytes());

            return Base64.getEncoder().encodeToString(encrypted);
        }catch(Exception e){
            Log.d(Helper.TAG, "Error While Encrypt"+ e.toString());
        }

        return "faild";
    }

    // Decrypt a string
    public static String decrypt(String encryptedData, String key1) throws Exception {
        byte[] key = hexStringToByteArray(key1);
        if (key.length != 16 && key.length != 24 && key.length != 32) {
            throw new IllegalArgumentException("Invalid key length: " + key.length);
        }
        SecretKeySpec keySpec = new SecretKeySpec(key, ALGORITHM);
        @SuppressLint("GetInstance") Cipher cipher = Cipher.getInstance(CIPHER_TRANSFORMATION);
        cipher.init(Cipher.DECRYPT_MODE, keySpec);

//        Log.d(Helper.TAG, "Encrypted Data: " + encryptedData);

        byte[] decoded;
        decoded = Base64.getDecoder().decode(encryptedData);

//        Log.d(Helper.TAG, "Decoded Ciphertext Length: " + decoded.length);

        byte[] decrypted = cipher.doFinal(decoded);
        return new String(decrypted);
    }

    // Convert hex string to byte array
    public static byte[] hexStringToByteArray(String s) {
        int len = s.length();
        if (len % 2 != 0) {
            throw new IllegalArgumentException("Hex string must have an even length");
        }
        byte[] data = new byte[len / 2];
        for (int i = 0; i < len; i += 2) {
            int high = Character.digit(s.charAt(i), 16);
            int low = Character.digit(s.charAt(i + 1), 16);
            if (high == -1 || low == -1) {
                throw new IllegalArgumentException("Invalid hexadecimal character");
            }
            data[i / 2] = (byte) ((high << 4) + low);
        }
        return data;
    }
}
