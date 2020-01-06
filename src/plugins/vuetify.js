import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: '#00b53d',
                secondary: '#009130',
                accent: '#ffa100'
            }
        }
    }
});
