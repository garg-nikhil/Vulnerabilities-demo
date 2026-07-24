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

        System.out.print("Password: ");
        String password = System.console() != null ? new String(System.console().readPassword()) : br.readLine();
        String password = br.readLine();

        authenticate(username, password);

        executeQuery(username);

        createFile(username);

        weakHash(password);

        insecureRandom();

        deserialize();
        Runtime.getRuntime().exec(new String[] {"ping", username});
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
    static void executeQuery(String user) throws Exception {

        Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost/test",
                "root",
                "password");

        String sql = "SELECT * FROM users WHERE username=?";
        PreparedStatement stmt = conn.prepareStatement(sql);
        stmt.setString(1, user);

    static void createFile(String filename) throws Exception {

        File baseDir = new File("/tmp").getCanonicalFile();
        File targetFile = new File(baseDir, filename).getCanonicalFile();

        if (!targetFile.toPath().startsWith(baseDir.toPath())) {
            throw new IllegalArgumentException("Path traversal attempt detected: " + filename);
        }

        try (FileWriter fw = new FileWriter(targetFile)) {
            fw.write("dummy");
        }
    }

        while(rs.next()) {
            System.out.println(rs.getString(1));
        }
    }
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

    static void weakHash(String password) throws Exception {

        MessageDigest md =
            MessageDigest.getInstance("SHA-256");

        md.update(password.getBytes(java.nio.charset.StandardCharsets.UTF_8));

        System.out.println(
            Base64.getEncoder().encodeToString(md.digest()));
    }
            MessageDigest.getInstance("MD5");

        md.update(password.getBytes());

        System.out.println(
            Base64.getEncoder().encodeToString(md.digest()));
    }
    static void deserialize() throws Exception {
        try (ObjectInputStream in = new ObjectInputStream(new FileInputStream("object.ser"))) {
            in.setObjectInputFilter(filterInfo -> {
                Class<?> clazz = filterInfo.serialClass();
                if (clazz != null && !String.class.equals(clazz)) {
                    return java.io.ObjectInputFilter.Status.REJECTED;
                }
                return java.io.ObjectInputFilter.Status.ALLOWED;
            });
            Object obj = in.readObject();
        }
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
