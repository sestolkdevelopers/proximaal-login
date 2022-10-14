<template>
    <div>
        <h1 class="text-h2 mb-3">Register</h1>

        <v-form v-model="valid" ref="form" @submit.prevent="performRegister()">
            <v-alert class="mb-2" v-if="store.register.error" type="error">{{ store.register.error.message }}</v-alert>

            <div class="field">
                <v-text-field label="Username" v-model="user.username" :rules="[required]" required></v-text-field>
            </div>
            <div class="field">
                <v-text-field label="Firstname" v-model="user.firstName" required></v-text-field>
            </div>
            <div class="field">
                <v-text-field label="Lastname" v-model="user.lastName" required></v-text-field>
            </div>
            <div class="field">
                <v-text-field type="password" label="Password" v-model="user.password" :rules="[password(8)]"
                              required></v-text-field>
            </div>
            <div class="field">
                <v-text-field type="password" label="Confirm password" v-model="user.passwordConfirmation"
                              :rules="[confirmPassword(user.password, 8)]" required></v-text-field>
            </div>
            <div class="buttons justify-end">
                <v-btn variant="plain" @click="navigateTo('/login')">
                    Back to login
                </v-btn>
                <v-btn type="submit">
                    Register
                </v-btn>
            </div>
        </v-form>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {definePageMeta} from '#imports';
import {User} from '~/interfaces/models/User';
import {useStore} from '~/store';
import useValidation from '~/composables/useValidation';

definePageMeta({
    layout: 'guest',
    middleware: 'guest',
});

export default defineComponent({
    setup() {
        const store = useStore();
        const {required, password, confirmPassword} = useValidation();
        const form = ref();
        const valid = ref(false);
        const user = ref<User & { passwordConfirmation: string }>({
            firstName: '',
            lastName: '',
            password: '',
            username: '',
            passwordConfirmation: '',
        });

        const performRegister = async () => {
            if (!valid.value) {
                return;
            }

            await store.postRegister(user.value);

            if (!store.register.error) {
                navigateTo('/login');
            }
        };

        return {
            store,
            form,
            valid,
            user,
            required,
            password,
            confirmPassword,
            performRegister,
        };
    },
});
</script>

<style scoped>

</style>
