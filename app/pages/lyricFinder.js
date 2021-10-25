// modules
const { defineComponent, computed, ref } = require('vue');
const { toast } = require('materialize-css');
const lyricsFinder = require('lyrics-finder');

// component
module.exports = defineComponent({
    name: 'LyricsFinder',
    template: `
        <main class="row">
            <section class="col s12">
                <form class="row" @submit.prevent="queryLyrics">
                    <fieldset class="col s12">
                        <div class="input-field col s6">
                            <i class="material-icons prefix">mic</i>
                            <input 
                                id="icon_primary" 
                                type="text" 
                                class="validate" 
                                v-model="artist" 
                                @keypress.enter.prevent
                            >
                            <label for="icon_primary">enter a artirt name</label>
                        </div>
                        <div class="input-field col s6">
                            <i class="material-icons prefix">music_note</i>
                            <input 
                                id="icon_secondary" 
                                type="text" 
                                class="validate" 
                                v-model="song" 
                                @keypress.enter.prevent
                            >
                            <label for="icon_secondary">enter a song name</label>
                        </div>
                    </fieldset>
                    <fieldset class="col s12">
                        <div class="col s6">
                            <button class="btn full-btn waves-effect waves-light black" type="submit" :disabled="validateButton">
                                Start query
                                <i class="material-icons right">send</i>
                            </button>
                        </div>
                        <div class="col s6">
                            <button class="btn full-btn waves-effect waves-light red darken-4" @click="reset" :disabled="validateReset">
                                Reset query
                                <i class="material-icons right">loop</i>
                            </button>
                        </div>
                    </fieldset>
                </form>
            </section>
            <section class="col s12">
                <h2 class="card-title flow-text">{{title}}</h2>
                <pre class="scroll lyrics">{{lyrics}}</pre>
            </section>
        </main>
    `,
    setup() {
        const artist = ref('');
        const song = ref('');
        const lyrics = ref('');
        const title = ref('');

        const validateButton = computed(() => artist.value !== '' && song.value !== '' ? false : true );

        const validateReset = computed(() => (lyrics.value === '' ? true : false));

        const queryLyrics = async (e) => {
            try {
                const res = await lyricsFinder(artist.value, song.value);

                if (res !== '') {
                    title.value = `${artist.value} - ${song.value}`;
                    lyrics.value = res;
                } else {
                    toast({html: 'not lyrics found' });
                }
            } catch (err) {
                toast({html: err.messgage });
            }
            artist.value = "";
            song.value = "";
            e.target.reset();
        };

        function reset() {
            lyrics.value = "";
            title.value = "";
        }

        return {
            artist,
            song,
            lyrics,
            title,      
            queryLyrics,
            validateButton,
            validateReset,
            reset
        };
    }
});

