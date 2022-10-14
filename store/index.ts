import {defineStore} from 'pinia';
import {User} from '~/interfaces/models/User';

export interface StoreInterface {
    auth: {
        authenticated: boolean,
        userData: User | {},
        loading: boolean,
        error: null | string,
    },
    register: {
        loading: boolean,
        error: null | string,
    },
    schools: {
        loading: boolean,
        error: null | string,
        data: []
    }
}

export const useStore = defineStore<'main', StoreInterface>('main', {
    state: () => ({
        auth: {
            authenticated: false,
            userData: {},
            loading: false,
            error: null,
        },
        register: {
            loading: false,
            error: null,
        },
        schools: {
            loading: false,
            error: null,
            data: [],
        },
    }),
    actions: {
        clearLogin() {
            this.auth.error = null;
        },
        async postLogin(username, password) {
            this.clearLogin();
            this.auth.loading = true;

            try {
                const response = await $fetch(
                    '/api/login',
                    {
                        method: 'post',
                        body: {
                            username,
                            password,
                        },
                    });

                if (response) {
                    this.auth.authenticated = true;
                    this.auth.userData = response;
                }

            } catch (error) {
                this.auth.error = error;
            } finally {
                this.auth.loading = false;
            }
        },
        async postRegister(fields) {
            this.register.error = null;
            this.register.loading = true;

            try {
                await $fetch(
                    '/api/register',
                    {
                        method: 'post',
                        body: fields,
                    });
            } catch (error) {
                this.register.error = error;
            } finally {
                this.register.loading = false;
            }
        },
        postLogout() {
            // Perhaps to clear any tokens
            this.auth = {
                authenticated: false,
                userData: {},
            };
        },
        async getSchools() {
            this.schools.error = null;
            this.schools.loading = true;

            try {
                const response = await $fetch('/api/schools');

                if (response) {
                    this.schools.data = response;
                }
            } catch (error) {
                this.schools.error = error;
            } finally {
                this.schools.loading = false;
            }
        },
    },
});
