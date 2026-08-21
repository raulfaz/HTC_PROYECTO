# HTCPROYECTO

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Deploy to GitHub Pages

The repository includes a GitHub Actions workflow that uses pnpm to build and deploy the application to GitHub Pages after pushing to `master`.

In the repository settings, enable **Pages** with **GitHub Actions** as the source. The published application uses `/HTC_PROYECTO/` as its base path and hash-based routes, and is expected at <https://raulfaz.github.io/HTC_PROYECTO/>.

The API must be deployed separately at an HTTPS URL before API-backed features can work on GitHub Pages. The current development fallback (`http://HOST:3001/api`) is intentionally not treated as a production endpoint.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
