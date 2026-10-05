package com.cocos.game;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.function.Consumer;
import javax.net.ssl.HttpsURLConnection;
import org.json.JSONObject;
import org.json.JSONTokener;

/** Native networking with SDK token refresh and bounded timeouts. */
public final class TapWarOperations {
    private static final String ENDPOINT = "https://asia-northeast3-ttsofts-tapwar.cloudfunctions.net/operations";
    public static void request(String json, Consumer<JSONObject> reply) {
        final JSONObject input;
        try {
            input = new JSONObject(json);
            if (!Arrays.asList("/operations", "/account/save", "/operations/reads", "/operations/read", "/operations/mail", "/operations/mail/claim", "/operations/mail/delete", "/operations/error").contains(input.getString("path"))) throw new Exception();
        } catch (Exception error) { reply.accept(error("error.invalid")); return; }
        FirebaseUser user = FirebaseAuth.getInstance().getCurrentUser();
        if (user == null) { reply.accept(error("online.auth")); return; }
        user.getIdToken(false).addOnCompleteListener(task -> {
            if (!task.isSuccessful()) { reply.accept(error("online.auth")); return; }
            final String token = task.getResult().getToken();
            new Thread(() -> {
                HttpsURLConnection connection = null;
                try {
                    FirebaseUser current = FirebaseAuth.getInstance().getCurrentUser();
                    if (current == null || !current.getUid().equals(user.getUid())) { reply.accept(error("online.auth")); return; }
                    connection = (HttpsURLConnection) new URL(ENDPOINT + input.getString("path")).openConnection();
                    connection.setConnectTimeout(10000); connection.setReadTimeout(10000);
                    connection.setRequestProperty("Authorization", "Bearer " + token);
                    connection.setRequestProperty("Content-Type", "application/json");
                    boolean post = input.has("data"); connection.setRequestMethod(post ? "POST" : "GET");
                    if (post) {
                        byte[] bytes = input.getJSONObject("data").toString().getBytes(StandardCharsets.UTF_8);
                        if (bytes.length > 1000000) throw new Exception();
                        connection.setDoOutput(true);
                        try (OutputStream stream = connection.getOutputStream()) { stream.write(bytes); }
                    }
                    int status = connection.getResponseCode();
                    InputStream response = status >= 400 ? connection.getErrorStream() : connection.getInputStream();
                    if (response == null) throw new Exception();
                    ByteArrayOutputStream bytes = new ByteArrayOutputStream();
                    try (InputStream stream = response) {
                        byte[] buffer = new byte[8192]; int size;
                        while ((size = stream.read(buffer)) != -1) { bytes.write(buffer, 0, size); if (bytes.size() > 1200000) throw new Exception(); }
                    }
                    Object result = new JSONTokener(new String(bytes.toByteArray(), StandardCharsets.UTF_8)).nextValue();
                    if (status >= 400) {
                        String key = result instanceof JSONObject ? ((JSONObject) result).optString("error") : "";
                        reply.accept(error(key.matches("^(online|error|ops)\\.[A-Za-z0-9]+$") ? key : "online.serverError"));
                    } else {
                        current = FirebaseAuth.getInstance().getCurrentUser();
                        if (current == null || !current.getUid().equals(user.getUid())) { reply.accept(error("online.auth")); return; }
                        reply.accept(new JSONObject().put("result", result));
                    }
                } catch (Exception failure) { reply.accept(error("online.unreachable")); }
                finally { if (connection != null) connection.disconnect(); }
            }, "tapwar-operations").start();
        });
    }
    private static JSONObject error(String key) {
        JSONObject result = new JSONObject(); try { result.put("error", key); } catch (Exception ignored) {} return result;
    }
    private TapWarOperations() {}
}
