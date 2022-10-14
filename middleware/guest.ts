import {defineNuxtRouteMiddleware, navigateTo} from '#app';
import {useStore} from '~/store';

export default defineNuxtRouteMiddleware(() => {
    const store = useStore();
    if (store.auth.authenticated) {
        return navigateTo('/');
    }
});
