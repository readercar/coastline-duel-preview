package com.cocos.game;

import android.Manifest;
import android.app.Activity;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import java.lang.ref.WeakReference;

/** Enables notice notifications only after the player has entered the game. */
public final class TapWarPush {
    static final String TOPIC = "tapwar_notices";
    static final String CHANNEL_ID = "tapwar_notices";
    private static final String PREFERENCES = "tapwar_push_preferences";
    private static final String PERMISSION_ASKED = "notification_permission_asked";
    private static final int PERMISSION_REQUEST = 9137;
    private static WeakReference<Activity> activity = new WeakReference<>(null);

    public static void attach(Activity host) { activity = new WeakReference<>(host); }

    public static String enable(String locale) {
        Activity host = activity.get();
        if (host == null || host.isFinishing()) return "unavailable";
        try {
            if (FirebaseApp.initializeApp(host) == null) return "unavailable";
            ensureChannel(host);
            FirebaseMessaging messaging = FirebaseMessaging.getInstance();
            messaging.setAutoInitEnabled(true);
            String old=host.getSharedPreferences(PREFERENCES,Context.MODE_PRIVATE).getString("locale","ko");
            if(!old.equals(locale))messaging.unsubscribeFromTopic(TOPIC+"_"+old);
            host.getSharedPreferences(PREFERENCES,Context.MODE_PRIVATE).edit().putBoolean("enabled",true).putString("locale",locale).apply();
            messaging.subscribeToTopic(TOPIC+"_"+locale);
            requestPermissionOnce(host);
            return "enabled";
        } catch (RuntimeException error) {
            return "unavailable";
        }
    }

    public static String disable() {
        Activity host = activity.get();
        if (host == null || host.isFinishing()) return "unavailable";
        try {
            if (FirebaseApp.initializeApp(host) == null) return "unavailable";
            FirebaseMessaging messaging = FirebaseMessaging.getInstance();
            host.getSharedPreferences(PREFERENCES,Context.MODE_PRIVATE).edit().putBoolean("enabled",false).apply();
            messaging.unsubscribeFromTopic(TOPIC+"_ko");messaging.unsubscribeFromTopic(TOPIC+"_en");
            messaging.setAutoInitEnabled(false);
            return "disabled";
        } catch (RuntimeException error) {
            return "unavailable";
        }
    }

    public static String status() {
        Activity host = activity.get();
        if (host == null || host.isFinishing()) return "unavailable";
        if (!enabled(host)) return "disabled";
        if (Build.VERSION.SDK_INT >= 33 && host.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) != PackageManager.PERMISSION_GRANTED) return "disabled";
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            NotificationManager manager = host.getSystemService(NotificationManager.class);
            if (manager == null || !manager.areNotificationsEnabled()) return "disabled";
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                NotificationChannel channel = manager.getNotificationChannel(CHANNEL_ID);
                if (channel != null && channel.getImportance() == NotificationManager.IMPORTANCE_NONE) return "disabled";
            }
        }
        return "enabled";
    }

    public static String openSettings() {
        Activity host = activity.get();
        if (host == null || host.isFinishing()) return "unavailable";
        host.runOnUiThread(() -> {
            try {
                Intent intent = new Intent(Settings.ACTION_APP_NOTIFICATION_SETTINGS);
                intent.putExtra(Settings.EXTRA_APP_PACKAGE, host.getPackageName());
                host.startActivity(intent);
            } catch (RuntimeException error) {
                try {
                    Intent fallback = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS, Uri.parse("package:" + host.getPackageName()));
                    host.startActivity(fallback);
                } catch (RuntimeException ignored) {}
            }
        });
        return status();
    }

    static void ensureChannel(Context context) {
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) return;
        NotificationManager manager = context.getSystemService(NotificationManager.class);
        if (manager == null || manager.getNotificationChannel(CHANNEL_ID) != null) return;
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, context.getString(com.ttsofts.tapwar.R.string.push_channel_name), NotificationManager.IMPORTANCE_DEFAULT);
        channel.setDescription(context.getString(com.ttsofts.tapwar.R.string.push_channel_description));
        manager.createNotificationChannel(channel);
    }

    private static void requestPermissionOnce(Activity host) {
        if (Build.VERSION.SDK_INT < 33 || host.checkSelfPermission(Manifest.permission.POST_NOTIFICATIONS) == PackageManager.PERMISSION_GRANTED) return;
        if (host.getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE).getBoolean(PERMISSION_ASKED, false)) return;
        host.getSharedPreferences(PREFERENCES, Context.MODE_PRIVATE).edit().putBoolean(PERMISSION_ASKED, true).apply();
        host.runOnUiThread(() -> host.requestPermissions(new String[]{Manifest.permission.POST_NOTIFICATIONS}, PERMISSION_REQUEST));
    }

    static boolean enabled(Context context){return context.getSharedPreferences(PREFERENCES,Context.MODE_PRIVATE).getBoolean("enabled",false);}
    static String locale(Context context){return context.getSharedPreferences(PREFERENCES,Context.MODE_PRIVATE).getString("locale","ko");}
    private TapWarPush() {}
}
