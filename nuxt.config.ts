// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    nitro: {
        storage: {
            memory: {
                driver: 'memory'
            }
        },
    },
    css: [
        '@mdi/font/scss/materialdesignicons.scss',
        'vuetify/lib/styles/main.sass',
        '~/assets/scss/main.scss'
    ],
    build: {
        transpile: ['vuetify'],
    },
    vite: {
        define: {
            'process.env.DEBUG': false,
        },
    },
    modules: [
        '@pinia/nuxt',
    ]
})
