# Shalash Frontend

1. This application helps actors/actoress to create their own profiles. View the details regarding upconming auditions, latest news, casting directors can search for their talents
   2.For applying new auditions

<!-- Web project starter kit including modern tools and workflow based on
[angular-cli](https://github.com/angular/angular-cli), best practices from the community, a scalable base template and
a good learning base. -->

# Getting started

1. Clone the project from repository.
2. Install with Shell script or By manually

Using shell script

````bash
  create a update_repos.sh file in your folder
  Give it execute permissions with chmod +x update_repos.sh
  Run it with ./update_repos.sh
  ```
  OR

Shift to Project repository

```bash
cd shalashwebsite
````

1. Install the dependencies required to run the project.

```bash
npm install
```

1. Launch development server, and open `localhost:4200` in your browser:

```bash
ng serve
```

# Project structure

```
dist/                        compiled version
docs/                        project docs and coding guides
src/                         project source code
|- app/                      app components
|  |- @shared/               shared module (common services, components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- translations/             translations files
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
node_modules/                installed packages
```

# Main Commands

We need to use the below commands asa most common for eunning the application.

| Tasks                    | Description                                              |
| ------------------------ | -------------------------------------------------------- |
| ng serve                 | Run development server on `http://localhost:4200/`       |
| ng build [-- --env=prod] | Lint code and build app for production in `dist/` folder |

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

# Environment

To configure variables for local, staging and production. angular predefine environment configuration we can use to local and production variable dynamically.

| Tasks       | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| apiUrl      | Address that allows you to access an API and its various features |
| imageUrl    | Images API that helps to add and retrieve image                   |
| imgBaseUrl  | Images API that helps to connect with timthumb resized url        |
| serverUrl   | API that helps to connect with server base url                    |
| resumeUrl   | API that helps to connect with Resume files                       |
| siteUrl     | API that helps to connect with site                               |
| auditionUrl | API that helps to connect with Auditions files                    |
