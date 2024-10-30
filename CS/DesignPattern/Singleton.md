# 싱글톤 패턴 (Singleton Pattern)

> 객체 생성에 관련된 패턴이다

## 사용하는 이유

> 특정 클래스의 인스턴스가 오직 하나만 존재해야 하고, 이 인스턴스에 전역에서 접근할 수 있도록 보장할 때 사용된다.

## 사용 예시

> 데이터베이스 연결 관리, 설정 관리 등에서 주로 사용된다. 애플리케이션의 상태를 유지하기 위한 설정 정보나 리소스를 관리하는 데 유용하다.

```java

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

class DatabaseConnection {
    private static DatabaseConnection instance;
    private Connection connection;

    private final String url = "jdbc:mysql://localhost:3306/mydatabase";
    private final String user = "username";
    private final String password = "password";

    private DatabaseConnection() {
        try {
            this.connection = DriverManager.getConnection(url, user, password);
            System.out.println("Database connection established.");
        } catch (SQLException e) {
            System.err.println("Database connection error: " + e.getMessage());
        }
    }

    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection(); 
        }
        return instance;
    }

    public Connection getConnection() {
        return connection;
    }

    public void closeConnection() {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
                System.out.println("Database connection closed.");
            }
        } catch (SQLException e) {
            System.err.println("Error closing connection: " + e.getMessage());
        }
    }
}

public class Main {
    public static void main(String[] args) {
        DatabaseConnection dbConnection1 = DatabaseConnection.getInstance();
        DatabaseConnection dbConnection2 = DatabaseConnection.getInstance();

        System.out.println(dbConnection1 == dbConnection2); // true, 같은 인스턴스를 참조

        Connection connection = dbConnection1.getConnection();
        if (connection != null) {
            System.out.println("Connection is successful.");
        }

        dbConnection1.closeConnection();
    }
}

```