// modules
const { defineComponent, reactive, computed } = require('vue');
const { toast } = require('materialize-css');
const { format } = require('timeago.js');
const axios = require('axios');

// componenent
module.exports = defineComponent({
    name: 'GithubInfo',
    template: `
        <main class="row">
            <section class="col s12">
                <form @submit.prevent="githubInfo">
                    <fieldset class="input-field col s12">
                        <i class="material-icons prefix">
                            account_box
                        </i>
                        <input 
                            id="git-user" 
                            class="input-focus" 
                            type="text"
                            v-model="github.user"
                            @keypress.enter.prevent
                        >
                        <label class="label-focus" for="git-user">
                            enter a github user
                        </label>
                    </fieldset>
                    <fieldset class="col s12 row">
                        <div class="col s6">
                            <button 
                                class="btn full-btn waves-effect waves-light black"
                                type="submit"
                            >
                                send search
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                        <div class="col s6">
                            <button 
                                class="btn full-btn waves-effect waves-light red darken-4"
                                :disabled="resetValidate"
                                @click="reset"
                            >
                                reset search
                                <i class="material-icons right">loop</i>
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section class="col s12 row">
                <article class="col s4 offset-s4" v-if="githubInfoCount === 0">
                    <div class="card">
                        <figure class="card-image">
                            <img src="img/No-image-found.jpg" alt="not found">
                        </figure>
                        <h2 class="card-title"> not info</h2>
                    </div>
                </article>
                <article class="col s4 offset-s4" v-else>
                    <div class="card medium">
                        <figure class="card-image">
                            <img 
                                :src="github.data.avatar_url" 
                                :alt="github.data.id"
                            >
                        </figure>
                        <div class="card-content">
                            <h2 class="card-title flow-text">
                                {{github.data.login}}
                            </h2>
                            <span class="activator">show info</span>
                        </div>
                        <div class="card-reveal scroll">
                            <h2 class="card-title grey-text text-darken-4">
                                description
                                <i class="material-icons right">close</i>
                            </h2>
                            <strong>{{github.data.name === null ? "no info" : github.data.name}}</strong>
                            <blockquote class="desc">{{github.data.bio === null ? "no bio" : github.data.bio}}</blockquote>
                            <p>
                                twitter: {{github.data.twitter_username === null ? 'no twitter info' : '@'+ github.data.twitter_username}}<br>
                                created at: {{format(github.data.created_at)}}
                            </p>
                            <p>
                                repos: {{github.data.public_repos}}, 
                                gists: {{github.data.public_gists}}
                            </p>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    `,
    setup() {
        const github = reactive({
            user: '',
            data: {}
        });

        const githubInfoCount = computed(() => Object.entries(github.data).length);

        const resetValidate = computed(() => githubInfoCount.value === 0 ? true : false);

        const reset = () => (github.data = {});

        const githubInfo = async (e) => {
            if (github.user === '') {
                toast({ html: 'required field' });
            } else {
                try {
                    const res = await axios.get(`https://api.github.com/users/${github.user}`);
                    github.data = res.data;
                } catch (err) {
                    toast({ html: err.message });
                }
                github.user = '';
                e.target.reset();
            }
        };

        return {
            format,
            github,
            githubInfoCount,
            resetValidate,
            reset,
            githubInfo
        };
    }
});
