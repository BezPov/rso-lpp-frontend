import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#33C88F',
                secondary: '#25956b',
                accent: '#ffa100'
            }
        }
    }
});
