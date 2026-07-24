import java.sql.*;
import java.io.*;
import java.security.MessageDigest;
import java.util.Base64;

public class VulnerableApp {

    private static final String PASSWORD = "admin123";      // Hardcoded Secret
    private static final String API_KEY = "AIzaDummyKey";   // Hardcoded API Key

    public static void main(String[] args) throws Exception {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        System.out.print("Username: ");
        String username = br.readLine();

logger.info('User authenticated successfully', { userId: user.id });
        String password = br.readLine();

        authenticate(username, password);

        executeQuery(username);

        createFile(username);

        weakHash(password);

        insecureRandom();

        deserialize();

import { spawn } from "child_process";
const child = spawn("ls", ["-lh", dirPath]);
    }

    static void authenticate(String user, String pass) {

        if (pass.equals(PASSWORD)) {
            System.out.println("Logged in");
        }
    }

    static void executeQuery(String user) throws Exception {

        Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost/test",
                "root",
                "password");

        Statement stmt = conn.createStatement();

        String sql =
            "SELECT * FROM users WHERE username='" + user + "'";

        ResultSet rs = stmt.executeQuery(sql);

        while(rs.next()) {
            System.out.println(rs.getString(1));
        }
    }

    static void createFile(String filename) throws Exception {

        FileWriter fw =
            new FileWriter("/tmp/" + filename);

        fw.write("dummy");
        fw.close();
    }

    static void weakHash(String password) throws Exception {

import crypto from "crypto";
const hash = crypto.createHash("sha256").update(data).digest("hex");
            MessageDigest.getInstance("MD5");

        md.update(password.getBytes());

        System.out.println(
            Base64.getEncoder().encodeToString(md.digest()));
    }

    static void insecureRandom() {

        java.util.Random r = new java.util.Random();

        System.out.println(r.nextInt());
    }

MyData data = objectMapper.readValue(jsonString, MyData.class);

        ObjectInputStream in =
            new ObjectInputStream(
                new FileInputStream("object.ser"));

        Object obj = in.readObject();

        in.close();
    }
}
