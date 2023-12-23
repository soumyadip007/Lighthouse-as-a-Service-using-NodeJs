# Lighthouse-as-a-Service-using-NodeJs
 Lighthouse as a Service (LaaS) – a scalable Node.js solution automating website performance audits with Google's Lighthouse. Seamlessly integrate into projects for routine audits, ensuring optimal web performance. 

## Project Structure

![image](https://github.com/soumyadip007/Lighthouse-as-a-Service-using-NodeJs/assets/37873518/c9799335-7422-4bf8-a7f7-2ba44e7969c6)


### `src` Directory
- **controllers:** Handles HTTP requests and interfaces with services.
- **services:** Encapsulates business logic and external dependencies.
- **utils:** Includes utility functions shared across the application.
- **app.js:** Main entry point for the application.

### `reports` Directory
- An empty directory to store generated reports.

### `.gitignore` File
- Specifies patterns to be ignored by Git.

### `package.json` File
- Contains metadata about the project and its dependencies.

### `README.md` File
- Documentation and instructions for running the project.

## Components

### 1. `lighthouseController.js`
- Handles HTTP requests related to Lighthouse functionality.

### 2. `lhcliController.js`
- Handles HTTP requests related to Lighthouse CLI functionality.

### 3. `common.js`
- Contains common functions and imports shared across different services.

### 4. `lighthouseService.js`
- Contains functions related to Lighthouse automation and report generation.

### 5. `fileUtils.js`
- Utility functions for working with files (e.g., reading, writing).

### 6. `app.js`
- Main entry point for the application, where HTTP server setup and routes are defined.
