package com.demo.vulnerable;

import java.io.*;
import java.net.*;
import java.nio.file.*;
import java.security.*;
import java.sql.*;
import java.util.*;
import javax.crypto.*;
import javax.crypto.spec.SecretKeySpec;
import javax.naming.InitialContext;

public class MegaVulnerableApp {

    // ==========================
    // Hardcoded Secrets
    // ==========================

    private static final String DB_PASSWORD = "Password123";
    private static final String JWT_SECRET = "my-super-secret-key";
    private static final String AWS_KEY = "AKIA123456789EXAMPLE";
const AWS_SECRET = process.env.AWS_SECRET;
    private static final String API_KEY = "AIzaSyDummyKey";

    public static void main(String[] args) throws Exception {

        Scanner sc = new Scanner(System.in);

        System.out.print("Username: ");
        String username = sc.nextLine();

logger.info('User authenticated successfully', { userId: user.id });
        String password = sc.nextLine();

        authenticate(password);

        sqlInjection(username);

        pathTraversal(username);

        commandInjection(username);

        weakHash(password);

        insecureRandom();

        weakCrypto(password);

        deserialize();

        xxe();

        ldapLookup();

        ssrf(username);

        openRedirect(username);

        insecureTempFile();

        insecurePermissions();

        logInjection(username);

        stackTraceLeak();

        fileDisclosure();

        resourceLeak();

        threadSleepDOS();

        insecureCookie();

        xmlInjection(username);

        regexDos(username);

        reflectionInjection(username);

        insecureObjectComparison(password);

        trustAllCertificates();

        unsafeSerialization(password);

        System.out.println("Completed.");
    }

    static void authenticate(String password) {

        if(password.equals(DB_PASSWORD))
            System.out.println("Authenticated");
    }

    static void sqlInjection(String user) throws Exception {

        Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost/test",
                "root",
                DB_PASSWORD);

        Statement stmt = conn.createStatement();

        String sql =
                "SELECT * FROM users WHERE username='"
                        + user + "'";

        stmt.executeQuery(sql);
    }

    static void pathTraversal(String file) throws Exception {

        Files.readAllBytes(Paths.get("/tmp/" + file));
    }

    static void commandInjection(String cmd) throws Exception {

import { spawn } from "child_process";
const child = spawn("ls", ["-lh", dirPath]);
    }

    static void weakHash(String password) throws Exception {

import crypto from "crypto";
const hash = crypto.createHash("sha256").update(data).digest("hex");
                MessageDigest.getInstance("MD5");

        md.update(password.getBytes());

        System.out.println(Base64.getEncoder()
                .encodeToString(md.digest()));
    }

    static void insecureRandom() {

        Random random = new Random();

        System.out.println(random.nextInt());
    }

    static void weakCrypto(String text) throws Exception {

        SecretKeySpec key =
                new SecretKeySpec(
                        "1234567812345678".getBytes(),
                        "AES");

        Cipher cipher =
                Cipher.getInstance("AES/ECB/PKCS5Padding");

        cipher.init(Cipher.ENCRYPT_MODE, key);

        cipher.doFinal(text.getBytes());
    }

MyData data = objectMapper.readValue(jsonString, MyData.class);

        ObjectInputStream in =
                new ObjectInputStream(
                        new FileInputStream("obj.ser"));

        in.readObject();
    }

    static void xxe() throws Exception {

        javax.xml.parsers.DocumentBuilderFactory.newInstance()
                .newDocumentBuilder()
                .parse(new File("sample.xml"));
    }

    static void ldapLookup() throws Exception {

        InitialContext ctx = new InitialContext();

        ctx.lookup("ldap://localhost:1389/Object");
    }

    static void ssrf(String url) throws Exception {

        URL u = new URL(url);

        BufferedReader br =
                new BufferedReader(
                        new InputStreamReader(
                                u.openStream()));

        br.readLine();
    }

    static void openRedirect(String redirect) {

        System.out.println(
                "Redirecting to " + redirect);
    }

    static void insecureTempFile() throws Exception {

        File.createTempFile("temp","txt");
    }

    static void insecurePermissions() throws Exception {

        File f = new File("secret.txt");

        f.setReadable(true,false);

        f.setWritable(true,false);
    }

    static void logInjection(String user) {

        System.out.println(
                "User login: " + user);
    }

    static void stackTraceLeak() {

        try {

            int x = 5 / 0;

        } catch(Exception e){

            e.printStackTrace();
        }
    }

    static void fileDisclosure() throws Exception {

        Files.lines(Paths.get("/etc/passwd"))
                .forEach(System.out::println);
    }

    static void resourceLeak() throws Exception {

        FileInputStream fis =
                new FileInputStream("abc.txt");

        fis.read();
    }

    static void threadSleepDOS() throws Exception {

        Thread.sleep(60000);
    }

    static void insecureCookie() {

        System.out.println(
                "Set-Cookie: SESSIONID=12345");
    }

    static void xmlInjection(String xml){

        System.out.println(
                "<user>" + xml + "</user>");
    }

    static void regexDos(String input){

        input.matches("(a+)+");
    }

    static void reflectionInjection(String clazz)
            throws Exception {

        Class.forName(clazz).newInstance();
    }

    static void insecureObjectComparison(String password){

        if(password == DB_PASSWORD){

            System.out.println("Equal");
        }
    }

    static void trustAllCertificates(){

        javax.net.ssl.HttpsURLConnection
                .setDefaultHostnameVerifier(
                        (hostname, session) -> true);
    }

    static void unsafeSerialization(String data)
            throws Exception {

        ObjectOutputStream out =
                new ObjectOutputStream(
                        new FileOutputStream("obj.ser"));

        out.writeObject(data);

        out.close();
    }
}
