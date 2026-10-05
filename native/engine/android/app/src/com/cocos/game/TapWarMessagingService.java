package com.cocos.game;

import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingService;
import com.google.firebase.messaging.RemoteMessage;

/** Displays a received notice while the game is foregrounded. Background
 * notification messages are displayed by FCM on the same channel. */
public final class TapWarMessagingService extends FirebaseMessagingService {
    @Override public void onNewToken(String token) {
        if(TapWarPush.enabled(this))FirebaseMessaging.getInstance().subscribeToTopic(TapWarPush.TOPIC+"_"+TapWarPush.locale(this));
    }

    @Override public void onMessageReceived(RemoteMessage message) {
        if(!TapWarPush.enabled(this))return;
        RemoteMessage.Notification remote = message.getNotification();
        String title = remote != null ? remote.getTitle() : message.getData().get("title");
        String body = remote != null ? remote.getBody() : message.getData().get("body");
        if (title == null || title.trim().isEmpty() || body == null || body.trim().isEmpty()) return;
        String noticeId = message.getData().get("noticeId");
        if (noticeId == null || noticeId.isEmpty()) noticeId = message.getMessageId();
        if (noticeId == null || noticeId.isEmpty()) noticeId = "notice";
        TapWarPush.ensureChannel(this);

        Intent intent = getPackageManager().getLaunchIntentForPackage(getPackageName());
        if (intent == null) intent = new Intent(this, AppActivity.class);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        intent.putExtra("noticeId", noticeId);
        int flags = PendingIntent.FLAG_UPDATE_CURRENT;
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) flags |= PendingIntent.FLAG_IMMUTABLE;
        PendingIntent content = PendingIntent.getActivity(this, noticeId.hashCode(), intent, flags);

        Notification.Builder builder = Build.VERSION.SDK_INT >= Build.VERSION_CODES.O ? new Notification.Builder(this, TapWarPush.CHANNEL_ID) : new Notification.Builder(this);
        builder.setSmallIcon(com.ttsofts.tapwar.R.drawable.ic_stat_tapwar).setContentTitle(title).setContentText(body).setStyle(new Notification.BigTextStyle().bigText(body)).setAutoCancel(true).setContentIntent(content).setColor(0xffffcf6a);
        if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) builder.setPriority(Notification.PRIORITY_HIGH).setDefaults(Notification.DEFAULT_ALL);
        NotificationManager manager = (NotificationManager)getSystemService(Context.NOTIFICATION_SERVICE);
        if (manager != null) manager.notify("notice-" + noticeId, noticeId.hashCode(), builder.build());
    }
}
