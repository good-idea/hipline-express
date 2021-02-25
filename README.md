# Hipline

Server: Express
Frontend: React
CMS: Kirby

## Architecture

The site and its internal API are all served by `server.js`. Before the site is deployed, the frontend CSS and javascript are compiled into `public/css` and `public/js`.

When a user visits the website, express generates the initial HTML for the page:

1. Express sends the request to the page to `controllers/publicController`
2. The controller fetches global site data such as MBO script tags and other things defined in the CMS and the SEO metadata for that page.
3. It renders the page using `views/index.pug`, which loads `public/js/bundle.js`
4. The client's browser runs the React javascript to build the frontend.

The client-side javascript will then makes a request to the API at `/api/content/initial`. This route is handled by the `initial` function in `controllers/contentController.js`. The routes within the CMS (see the `hipline-cms` repo) will return the data needed to render that page.

## Local Development

Run the command `yarn dev` to spin up a local server. You will be able to see the frontend on `localhost:8080` and interact with the API at `localhost:3000`.

This command handles the API routes and frontend a little differently. Instead of having express serve a generated HTML file, `webpack-dev-server` will use `index.local.html` and the styles and javascript from within `src`. Your changes will be hot-reloaded in the browser automatically.

*.env*

Use this file to override the [default configuration](config/index.js). If you want to be fetching CMS data locally, you can modify the `CMS_PORT` and `CMS_HOST` values. See [`.env.example`](.env.example)

### CSS

All of the styles are within `src/css`. Webpack will bundle these using PostCSS. Even though these are `.css` files, you can use SASS-like syntax such as `@import`, `@mixin` and `$variables`.

### JS: React App

All of the frontend code is in `src/js`. It is a fairly standard React app, using tools such as `react-router`.

*`sections`* contains the "Views" for the app, such as the Homepage, Classes Page, and generic InfoPage, as well global components such as the footer & navigation.

*`components`* contains general-use components, such as images, cards, icons, and form fields.

*`services`* contains a component that handles Google Analytics

*`utils`* includes a number of utility functions for things like parsing dates, manipulating the DOM, and parsing text from the CMS.

 - One notable file here is `utils/content.js`, which takes the data received from the API and organizes into the structure needed by the frontend. Kirby doesn't handle content relationships very well, so this bulky script makes up for it.

*`enhancers`* and *`UI`* contain legacy content that is not in use. See [Legacy Files](#Legacy Files) below.


# Server & Deployment

The site is hosted on a DigitalOcean droplet, managed by [PM2](https://pm2.keymetrics.io/). PM2 will handle deployments, restart the process if an error occurs or when the droplet is rebooted. You can ssh into the server and run `pm2 status`, `pm2 logs myhipline.com`, and any other pm2 commands.

To deploy, run `yarn deploy`. This will push your latest changes to `origin/main`, then run pm2's deployment command to:

1. SSH into the server
2. Pull the latest from the `main` branch
3. Install dependencies & bundle the CSS and javascript
4. Reload the process with the latest code

See more in [`ecosystem.config.js`](ecosystem.config.js)

# Legacy Files

Originally, this project aimed to use MBO's API to provide a customized portal for Hipline customers to sign up for classes. This initiative was scrapped in favor of simply linking out to MBO.

As a result, there are still a number of files here related to that content, such as `controllers/mboController.js`, `middleware/auth.js`, and others.

