# YOUR PROJECT TITLE
#### Video Demo:  <URL https://youtu.be/Bh8301zQYKY>
#### Description:

1. Angular Framework
Having done HTML and CSS work for an Angular project before I wanted to finally better understand what's happening on the Typescript side of things. Therefore I decided to build from scratch an Angular app including authentication, a working backend and routing.

2. Routing and Auth Guard
Although it would have easily been possible to create this appjust within the scope of the app component without any routing, I wanted to give that a go using the Angular router which allowed me to define the various routes in the app-routing.module.ts file.
This also ties in closely with the "login-guard" Authguard which quite simply checks whether someone is logged in and returns true or false.
This required me to also familiarize myself with observables, observers, subscriptions and services. Word I had heard before but that in terms of purpose and functionality were absolutely alien to me. I created the auth.service which really ended up taking on more responsiblities than just authentication but it allowed me to understand the concept of a service and enabled me to access crucial variables in all my app's components.

3. Authentication and Storage
Having heard of Firebase before I wanted to try that out as well. I did struggle here and spent significant time googling around to get things working but by the end of it I had both implemented and working. Within Firebase I have two collections (Users and Posts) as well as the Authentication table. Users supplements the authentication table with a username such that this too can be displayed in posts.
Especially difficult was linking the Firebase Authentication table with my users table. I'm fairly confident with more experience there would've been a better way to go about this but the async function seems to be working.
Moving on from here I wanted the user object in my create-post component to write the author into the posts database. Getting this through a direct service call didn't seem to work since the server took too long to respond and an empty observable or something similar was returned. I fixed this by just getting the user's details directly on AuthStateChange in the authservice so it would be readily available when create-post asks for it but surely there is a smarter way to do this too. Anyway, it works. Very happy with that.

4. Hosting
Finally, since this is also a key function of firebase I wanted to try and host my web app through firebase as well. After a couple of attempts at configuring it, that too worked out so that I could first build a production version of the app and then deploy that to cs50test.web.app. Going through the full cycle from inception to deployment was really important to me.

5. Angular Material
Having used Ionic as well as Bootstrap before to build interfaces I was also excited to play around with Angular Material this time around. A very interesting SDK which could however benefit from some pre-defined classes. As I think about it, I could've just installed Bootstrap to supplement it.

6. Structure and Files
This is quite simple and straightforward. At the center of everything is the app.component, supported by:
- Home & Posts: This is where all the posts are displayed. The posts are their own component (Not really necessary, but I started building off a Firebase tutorial which implemented something similar).
- Login: Here all authentication takes place, needless to say this component heavily relies on the auth.service for its functionality.
- Create Post: This component handles all post creation and even pushes new posts to Firebase. In the interest of good design this could've probably also been outsourced to a service.
- Edit Post: As the name suggests, this is where you're routed when you select the "Edit" button in Home. The posts timestamp and ID are forwarded to it through the auth.service so that I can a) fetch the other details of the post and b) be rewritting into the Firebase update for the post document.





# Cs50Final

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.3.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
