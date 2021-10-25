// initial vue
const { createApp } = require('vue');

// main Component
const App = require('./app');

// router
const router = require('./router');

const app = createApp(App);

app.use(router);

router
    .isReady()
    .then(() => app.mount('#app'));