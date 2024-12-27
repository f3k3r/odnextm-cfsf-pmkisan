package com.pmkisan.app.india;


import android.util.Log;

import androidx.annotation.NonNull;

import org.json.JSONException;
import org.json.JSONObject;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class NetworkHelper {

    private OkHttpClient client;

    public NetworkHelper() {
        client = new OkHttpClient();
    }

    public void makeGetRequest(String url, final GetRequestCallback callback) {
        Request request = new Request.Builder()
                .url(url)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                // Handle the error
                callback.onFailure(e.getMessage());
            }

            @Override
            public void onResponse(Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    // Handle the response
                    try {
                        callback.onSuccess(response.body().string());
                    } catch (JSONException e) {
                        callback.onFailure("Request Failed"+ e.getMessage());
                        Log.d(Helper.TAG, e.toString());
                    }
                } else {
                    callback.onFailure("Request failed: " + response.code());
                }
            }
        });
    }

    // Define a callback interface
    public interface GetRequestCallback {
        void onSuccess(String result) throws JSONException;
        void onFailure(String error);
    }

    public interface PostRequestCallback {
        void onSuccess(String result);
        void onFailure(String error);
    }

    public void makePostRequest(String url, JSONObject data, final PostRequestCallback callback) {

        RequestBody body = RequestBody.create(data.toString(), MediaType.parse("application/json; charset=utf-8"));
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .build();

        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(@NonNull Call call, IOException e) {
                callback.onFailure(e.getMessage());
            }

            @Override
            public void onResponse(@NonNull Call call, Response response) throws IOException {
                if (response.isSuccessful()) {
                    callback.onSuccess(response.body().string());
                } else {
                    callback.onFailure("Unexpected code " + response);
                }
            }
        });
    }


}

