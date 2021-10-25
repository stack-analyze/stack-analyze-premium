// modules
const { defineComponent, reactive, computed } = require('vue');
const { toast } = require('materialize-css');
const { format } = require('timeago.js');
const axios = require('axios');

// componenent
module.exports = defineComponent({
    name: 'AnimeSearch',
    template: `
        <main class="row">
            <section class="col s12">
                <form @submit.prevent="animeSearch">
                    <fieldset class="input-field col s12">
                        <i class="material-icons prefix">
                            search
                        </i>
                        <input 
                            id="git-user" 
                            class="input-focus" type="text"
                            v-model="anime.title"
                            @keypress.enter.prevent
                        >
                        <label class="label-focus" for="git-user">
                            enter a anime title
                        </label>
                    </fieldset>
                    <fieldset class="col s12 row">
                        <div class="col s6">
                            <button 
                                class="btn full-btn waves-effect waves-light black"
                                type="submit"
                            >
                                Start anime search
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                        <div class="col s6">
                            <button 
                                class="btn full-btn waves-effect waves-light red darken-4"
                                :disabled="resetValidate"
                                @click="reset"
                            >
                                Reset search
                                <i class="material-icons right">loop</i>
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section class="col s12 scroll collections">
                <article class="col s4" v-for="(anime, i) of anime.results" :key="i">
                    <div class="card large">
                        <figure class="card-image">
                            <img 
                                class="poster"
                                :src="anime.image_url" 
                                :alt="anime.title"
                            >
                        </figure>
                        <div class="card-content">
                            <h2 class="card-title flow-text activator">
                                {{anime.title}}
                                <i class="material-icons right">more_vert</i>
                            </h2>
                        </div>
                        <div class="card-reveal">
                            <h2 class="card-title grey-text text-darken-4">
                                description
                                <i class="material-icons right">close</i>
                            </h2>
                            <strong>rated: {{anime.rated}}</strong>
                            <blockquote class="desc">{{anime.synopsis}}</blockquote>
                            <p>
                                created at: {{format(anime.start_date)}}<br>
                                finished at: {{anime.end_date === null ? 'present airing': format(anime.end_date)}}
                            </p>
                        </div>
                    </div>
                </article>
            </section>
        </main>
    `,
    setup() {
        const anime = reactive({
            title: '',
            results: []
        });

        const resetValidate = computed(() => anime.results[0] === undefined ? true : false);

        const reset = () => (anime.results = []);

        const animeSearch = async (e) => {
            if (anime.title === '') {
                toast({ html: 'required field' });
            } else {
                try {
                    const res = await axios.get("https://api.jikan.moe/v3/search/anime",
          {
            params: {
              q: anime.title
            }
          }
        );
                    anime.results = res.data.results;
                    console.log(anime.results);
                } catch (err) {
                    toast({ html: err.message });
                }
                anime.title = '';
                e.target.reset();
            }
        };

        return {
            format,
            anime,
            resetValidate,
            reset,
            animeSearch
        };
    }
});
