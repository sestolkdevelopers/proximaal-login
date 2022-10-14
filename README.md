# Proximaal FE Challenge - Login
I started building the application with NuxtJS using the default install command `yarn create nuxt-app`, unfortunately once I got it configured and started development I noticed that the current stable version of NuxtJS runs on VueJS v2 and does NOT support v3. Since VueJS v2 does not officially support (out of the box) the Composition API I had to switch to Nuxt3.

However (!) Nuxt3 is not a stable version, it is a release candidate. This meant that most of the features are working but still some basic features that exist in NuxtJS v2, were either not available (yet) in v3 or changed so much I had to go through the documentation to get it to work. The documentation itself is also still a work-in-progress, so in some cases getting it to work was quite a struggle. In other cases I had to find alternatives that kinda worked, but also were not 100% stable.

Features built using/with:
- All API endpoints are stubbed using the built-in [Nitro server](https://nitro.unjs.io/guide/introduction/routing)
- Saving the registered users is done using the built-in [Nitro storage layer](https://nitro.unjs.io/guide/introduction/storage) 
- Material Design using [Vuetify v3](https://next.vuetifyjs.com/en/) which is also still in Beta.
- State management is done using [Pinia](https://pinia.vuejs.org/)

### Registration page
The registration page consists of several <v-text-field> components which ask for the most basic information. The username and password fields have some basic validation rules applied to them. Username is checked if a value is entered. Password is checked for a minimum length of 8 characters and matches the confirm password field.

### Before you login
Before you are about to login you must create an account.

### Login page
The login page consists of two <v-text-field> components. A username and password field, both of which have very basic validation rule that only checks if a value has been entered.

### School overview page
The school overview page consists of an expendable panel which holds the search and filter fields and a table with the schools fetched from the stubbed API.

### What would I like to improve?
- Add more typing
  - Lack of time, only added in places where it was required to get it working
- Add unit tests
  - Lack of time, and I am not sure if it even works yet with Nuxt3
- Add linting
  - ESLint does not work yet with Nuxt3

## In hindsight
Next time I would wait for Nuxt3 to be stable with an added grace period for other dependencies to be upgraded/be compatible with this new version before using it. And instead try to get NuxtJS v2 working with VueJS v2 and the composition API package, but at the time that looked like more of workaround than the one I have taken.

## Setup
Make sure to install the dependencies:

```bash
yarn install
```

## Development Server
Start the development server on http://localhost:3000

```bash
yarn dev
```
