<template>
    <div>
        <h1 class="text-h2 mb-3">Login</h1>
        <v-form v-model="valid" ref="form" @submit.prevent="performLogin()">
            <v-alert class="mb-2" v-if="store.auth.error" type="error">{{ store.auth.error.message }}</v-alert>

            <v-text-field label="Username" v-model="username" :rules="[required]" required></v-text-field>
            <v-text-field type="password" label="Password" v-model="password" :rules="[required]"
                          required></v-text-field>

            <div class="buttons justify-end">
                <v-btn variant="plain" @click="navigateTo('/register')">
                    Register
                </v-btn>
                <v-btn type="submit">
                    Login
                </v-btn>
            </div>
        </v-form>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from 'vue';
import {definePageMeta} from '#imports';
import {useStore} from '~/store';
import useValidation from '~/composables/useValidation';

definePageMeta({
    layout: 'guest',
    middleware: 'guest',
});

export default defineComponent({
    setup() {
        const store = useStore();
        const {required} = useValidation();
        const form = ref();
        const valid = ref(false);
        const username = ref('');
        const password = ref('');

        const performLogin = async () => {
            if (!valid.value) {
                return;
            }

            await store.postLogin(username.value, password.value);

            if (!store.auth.error) {
                navigateTo('/');
            }
        };

        onMounted(() => {
            store.clearLogin();
        })

        return {
            store,
            form,
            valid,
            username,
            password,
            required,
            performLogin,
        };
    },
});
</script>

<style scoped lang="scss">

</style>
