# Computer Security - Secured and Unsecured Websites

This project focuses on building two websites with login and register functionality, along with a user system page to manage customer data. The aim of the project is to demonstrate the importance of computer security by implementing security measures in one website to protect against Stored XSS (Cross-Site Scripting) attacks and SQL injection attacks. The other website serves as a comparison to showcase the vulnerabilities present in an unsecured application.

## Features
- **Login and Register**: Both websites provide a secure login and registration process for users. The login functionality ensures only authorized users can access the system.
- **User System Page**: Users have access to a dedicated page where they can manage and view customer information.
- **MySQL Database**: The project utilizes MySQL as the database management system to store and retrieve user and customer data securely.
- **Front-end Technologies**: The front-end of both websites is built using TypeScript, React, and Styled Components, powered by Vite, offering a modern and interactive user interface.
- **Back-end Technology**: Express.js is employed as the back-end framework to handle server-side logic and facilitate communication with the database.

## Secured Website
The secured website is designed to withstand Stored XSS attacks and SQL injection attacks. The following security measures have been implemented:

1. **Stored XSS Protection**: All user input is properly sanitized and validated on both the client and server side to prevent the execution of malicious scripts injected through user inputs. The website ensures that user-generated content is displayed without posing a security risk.
2. **SQL Injection Protection**: SQL queries are constructed using parameterized queries or prepared statements to prevent SQL injection attacks. User inputs are treated as data rather than executable code, effectively mitigating the risk of unauthorized database access.
3. **Secure Session Management**: The website employs secure session management techniques, such as using randomly generated session identifiers and securely storing session data. This prevents session hijacking and ensures user authentication and authorization.
4. **Error Handling**: Appropriate error handling mechanisms are implemented to provide minimal error messages to users, preventing potential information leakage that could aid attackers.

## Unsecured Website
The unsecured website is intentionally left vulnerable to demonstrate the potential consequences of inadequate security measures. It lacks the protective measures mentioned above, making it susceptible to Stored XSS attacks and SQL injection attacks. This website serves as a comparison to highlight the importance of proper security practices.

## Installation and Setup
To run the project locally, please follow these steps:

1. Clone the project repository from GitHub.
2. Ensure you have Node.js and npm (Node Package Manager) installed on your machine.
3. Open a terminal and navigate to the project directory.
4. Run the command `npm install` to install the required dependencies.
5. Set up a MySQL database and update the database configuration settings in the project files.
6. Run the command `npm run dev` to start the development server.
7. Access the secured website at `https://localhost:8080` and the unsecured website at `https://localhost:8081`.

Note: The front-end of both websites is powered by Vite, a fast and lightweight development server. Vite optimizes the build process and provides a seamless development experience.

## Future Enhancements
Here are some potential enhancements to consider for the project:

- Implement additional security measures, such as input validation, output encoding, and content security policies, to further strengthen the secured website against various attack vectors.
- Incorporate two-factor authentication (2FA) to provide an extra layer of security for user accounts.
- Explore security testing techniques, such as penetration testing or code reviews, to identify and mitigate any potential vulnerabilities.
- Expand the user system page to include more advanced features, such as data visualization or exporting customer data to different formats.
- 
