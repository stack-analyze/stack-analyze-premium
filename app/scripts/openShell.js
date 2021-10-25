const { shell } = require('electron');

function openWeb(e) {
            if (e.target.href.startsWith('http')) {
                e.preventDefault();
                shell.openExternal(e.target.href);
            }
        }
        
        module.exports = openWeb;