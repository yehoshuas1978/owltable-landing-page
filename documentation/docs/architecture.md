# Architecture & Data Privacy by Design

At OwlTable, we believe that world-class tools should not require compromising on security. Our architecture is built on a fundamental principle: **your data is yours, and it should never leave your control.**

---

## Secure Client-Server Model

OwlTable operates on a hybrid client-server model that guarantees data privacy. All sensitive operations occur within your own network, and our servers are only used for non-sensitive administrative tasks.

```
+-------------------------------------------------+
|               Your Network Environment          |
|                                                 |
|  +-----------------+      +------------------+  |
|  |   OwlTable      |----->|  Your Databases  |  |
|  |  (Client App)   |      | (PostgreSQL,     |  |
|  +-----------------+      |  MySQL, etc.)    |  |
|        ^                  +------------------+  |
|        |                                        |
+--------|----------------------------------------+
         | (License Checks & App Downloads)
         |
+--------|----------------------------------------+
|        v                                        |
|  +-----------------+                              |
|  | OwlTable Server |                              |
|  | (Our Cloud)     |                              |
|  +-----------------+                              |
|                                                 |
+-------------------------------------------------+
```

*   **The OwlTable Client:** This is the core application that you install and run **on your own servers**. It connects directly to your databases to perform all management, monitoring, and analysis tasks.
*   **Our Cloud Services:** Our servers are **only** used for license validation and to provide secure downloads of the application. **We never have access to your database credentials, schema, or data.**

This design ensures that OwlTable can be safely deployed in highly secure and regulated environments.

---

## Expanding Database Support

We are committed to supporting a wide range of database technologies.

*   **Currently Supported:** PostgreSQL, MySQL, Db2, SQL Server.
*   **Coming Soon (in V2):** MongoDB, Amazon RDS, Azure SQL Database, and other major cloud database platforms.