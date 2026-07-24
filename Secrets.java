import java.sql.*;
import java.io.*;
import java.security.MessageDigest;
import java.util.Base64;

public class VulnerableApp {

import java.sql.*;
import java.io.*;
import java.security.MessageDigest;
import java.util.Base64;

public class VulnerableApp {

    private static final String PASSWORD = System.getenv("APP_PASSWORD");
    private static final String API_KEY = System.getenv("APP_API_KEY");
    private static final String API_KEY = "AIzaDummyKey";   // Hardcoded API Key

    public static void main(String[] args) throws Exception {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        System.out.print("Username: ");
        String username = br.readLine();

        System.out.print("Password: [REDACTED]");
        String password = br.readLine();

        authenticate(username, password);

        executeQuery(username);

        createFile(username);

        weakHash(password);

        insecureRandom();

        deserialize();

        new ProcessBuilder("ping", username).start();
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
    static void executeQuery(String user) throws Exception {

        Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost/test",
                "root",
                "password");

        String sql = "SELECT * FROM users WHERE username=?";

    static void createFile(String filename) throws Exception {
        if (filename == null || filename.isEmpty()) {
            throw new IllegalArgumentException("Invalid filename");
        }
        java.nio.file.Path baseDir = java.nio.file.Paths.get("/tmp").toAbsolutePath().normalize();
        java.nio.file.Path safeFilename = java.nio.file.Paths.get(filename).getFileName();
        if (safeFilename == null) {
            throw new IllegalArgumentException("Invalid filename");
        }
        java.nio.file.Path targetPath = baseDir.resolve(safeFilename).normalize();
        if (!targetPath.startsWith(baseDir)) {
            throw new SecurityException("Path traversal attempt detected");
        }
        try (FileWriter fw = new FileWriter(targetPath.toFile())) {
            fw.write("dummy");
        }
    }
        stmt.setString(1, user);

        ResultSet rs = stmt.executeQuery();

        while(rs.next()) {
            System.out.println(rs.getString(1));
        }
    }

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

        MessageDigest md =
    static void weakHash(String password) throws Exception {

        MessageDigest md =
            MessageDigest.getInstance("SHA-256");

        md.update(password.getBytes(java.nio.charset.StandardCharsets.UTF_8));

        System.out.println(
            Base64.getEncoder().encodeToString(md.digest()));
    }

        md.update(password.getBytes());

        System.out.println(
            Base64.getEncoder().encodeToString(md.digest()));
    }

    static void deserialize() throws Exception {
        File file = new File("object.ser");
        if (!file.exists()) {
            return;
        }

        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream(file)) {
            @Override
            protected Class<?> resolveClass(ObjectStreamClass desc) throws IOException, ClassNotFoundException {
                // Allow only explicit whitelisted classes to prevent deserialization gadget execution
                if (!"java.lang.String".equals(desc.getName())) {
                    throw new InvalidClassException("Unauthorized deserialization attempt", desc.getName());
                }
                return super.resolveClass(desc);
            }
        }) {
            Object obj = in.readObject();
        }
    }

        java.util.Random r = new java.util.Random();

        System.out.println(r.nextInt());
    }

    static void deserialize() throws Exception {

        ObjectInputStream in =
            new ObjectInputStream(
                new FileInputStream("object.ser"));

        Object obj = in.readObject();

        in.close();
    }
}

    private static final String API_KEY = "AIzaDummyKey";   // Hardcoded API Key

    public static void main(String[] args) throws Exception {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        System.out.print("Username: ");
        String username = br.readLine();

        System.out.print("Password: ");
        String password = br.readLine();

        authenticate(username, password);

        executeQuery(username);

        createFile(username);

        weakHash(password);

        insecureRandom();

        deserialize();

        Runtime.getRuntime().exec("ping " + username);   // Command Injection
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

        MessageDigest md =
            MessageDigest.getInstance("MD5");

        md.update(password.getBytes());

        System.out.println(
            Base64.getEncoder().encodeToString(md.digest()));
    }

    static void insecureRandom() {

        java.util.Random r = new java.util.Random();

        System.out.println(r.nextInt());
    }

    static void deserialize() throws Exception {

        ObjectInputStream in =
            new ObjectInputStream(
                new FileInputStream("object.ser"));

        Object obj = in.readObject();

        in.close();
    }
}
