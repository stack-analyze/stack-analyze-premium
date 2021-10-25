// vue-rouete module
const { createRouter, createWebHistory } = require('vue-router');


const routes = [
    {
        path: '/',
        component: require('./pages/singleStack'),
        name: 'single stack'
    },
    {
        path: '/multiple',
        component: require('./pages/multipleStack'),
        name: 'multiple stack'
    },
    {
        path: '/pagespeed',
        component: require('./pages/pagespeed'),
        name: 'pagespeed'
    },
    {
        path: '/github',
        component: require('./pages/github'),
        name: 'github info'
    },
    {
        path: '/anime',
        component: require('./pages/animeInfo'),
        name: 'anime search'
    },
    {
        path: '/validator',
        component: require('./pages/htmlValidator'),
        name: 'html validator'
    },
    {
        path: '/hardware',
        component: require('./pages/hardware'),
        name: 'Hardware Information'
    },
    {
        path: '/whois',
        component: require('./pages/whois'),
        name: 'whois info'
    },
    {
        path: '/js-libraries',
        component: require('./pages/cdnServices'),
        name: 'cdnjs services'
    },
    {
        path: '/music',
        component: require('./pages/lyricFinder'),
        name: 'lyric finder'
    },
    
    {
        path: '/speed-test',
        component: require('./pages/speed'),
        name: 'speed test'
    },
    {
        path: '/deezer-info',
        component: require('./pages/deezer'),
        name: 'deezer info'
    },
    {
        path: '/about',
        component: require('./pages/about'),
        name: 'about app'
    }
];

const router = createRouter({
    history: createWebHistory(location.pathname),
    routes
});

module.exports = router;