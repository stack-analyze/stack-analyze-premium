// vue module
const { defineComponent } = require('vue');
const { license } = require('../../package.json');

module.exports = defineComponent({
    name: 'About',
    template: `
        <main class="row">
            <section class="col s4 offset-s4">
                <article class="card medium">
                    <figure class="card-image">
                        <img src="sidenav/logo.png" alt="app about">
                    </figure>
                    <div class="card-content">
                        <strong class="card-title">stack-analyze premium</strong>
                        <p>
                            omega5300 main developer
                            license: {{license}}
                        </p>
                    </div>
                </article>
            </section>
        </main>
    `,
    setup() { 
        return { license };
    }
});
