<template>
    <div>
        <div class="d-flex">
            <h1 class="flex-fill text-h2 mb-3">Schools overview</h1>
            <v-btn class="mt-4" color="error" @click="performLogout()">Logout</v-btn>
        </div>

        <SearchAndFilters :items="schools"
                          :search-fields="searchFields"
                          :filter-fields="filterFields"
                          @selectFilter="onSelectFilter($event)"
        ></SearchAndFilters>

        <v-table>
            <thead>
            <tr>
                <th class="text-left">Name</th>
                <th class="text-left">Status</th>
                <th class="text-left">City</th>
                <th class="text-left">State</th>
            </tr>
            </thead>
            <tbody>
            <template v-if="filteredSchools.length">
                <tr v-for="school in filteredSchools" :key="school.id">
                    <td>{{ school.name }}</td>
                    <td>
                        <v-chip :color="school.status === 'active' ? 'green' : 'red'">{{ school.status }}</v-chip>
                    </td>
                    <td>{{ school.city }}</td>
                    <td>{{ school.state }}</td>
                </tr>
            </template>
            </tbody>
        </v-table>
    </div>
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, ref} from 'vue';
import {definePageMeta} from '#imports';
import {useStore} from '~/store';
import SearchAndFilters from '~/components/SearchAndFilters.vue';
import useFilters from '~/composables/useFilters';

definePageMeta({
    middleware: 'auth',
});

export default defineComponent({
    components: {SearchAndFilters},
    setup() {
        const store = useStore();
        const {applySearchAndFilters} = useFilters();
        const {schools} = store;
        const allSchools = computed(() => schools.data);
        const searchFields = ['name'];
        const filterFields = [
            {key: 'status', prepend: {title: 'All statuses', value: ''}},
            {key: 'city', prepend: {title: 'All cities', value: ''}},
            {key: 'state', prepend: {title: 'All states', value: ''}},
        ];
        const selected = ref({});
        const filteredSchools = computed(() => applySearchAndFilters(allSchools.value, selected.value));

        const onSelectFilter = (selectedFilters) => {
            selected.value = selectedFilters;
        };

        const performLogout = () => {
            store.postLogout();

            navigateTo('/login');
        };

        onMounted(() => {
            store.getSchools();
        });

        return {
            performLogout,
            searchFields,
            filterFields,
            filteredSchools,
            schools: allSchools,
            onSelectFilter,
        };
    },
});
</script>
