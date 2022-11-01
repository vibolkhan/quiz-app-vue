import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            light: {
                primary: "#3A4C72",
                secondary: "#1867C0",
                accent: "#8c9eff",
                error: "#f44336",
                success: '#66bb6a'
            },
        },
    },
});
