<template>
    <v-expansion-panels multiple>
        <v-expansion-panel>
            <v-expansion-panel-title>Search &amp; Filters</v-expansion-panel-title>
            <v-expansion-panel-text>
                <h4 class="text-h6 text-decoration-underline">Search</h4>
                <v-autocomplete v-for="(searchItem, index) in search"
                                v-model="searchItem.value"
                                @update:modelValue="onSelectFilter(searchItem.name, $event)"
                                clearable
                                :key="index"
                                :label="`Search on ${searchItem.name}`"
                                :items="searchItem.items"></v-autocomplete>

                <h4 class="text-h6 text-decoration-underline">Filters</h4>
                <v-select v-for="(filter, index) in filters"
                          v-model="filter.value"
                          @update:modelValue="onSelectFilter(filter.name, $event)"
                          :key="index"
                          :label="`Filter on ${filter.name}`"
                          :items="filter.items"></v-select>
            </v-expansion-panel-text>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue';
import useFilters from '~/composables/useFilters';

export default defineComponent({
    emits: ['selectFilter'],

    props: {
        items: {
            type: Array,
        },
        searchFields: {
            type: Array as PropType<Array<string>>,
            default: () => ([]),
        },
        filterFields: {
            type: Array as PropType<Array<{ key: string, prepend: { title: string, value: string } }>>,
            default: () => ([]),
        },
    },

    setup(props, {emit}) {
        const {searchFields, filterFields} = props;
        const selectedFilters = ref({});
        const {createFilterItems} = useFilters();
        const search = computed(() => {
            return searchFields.map((field) => ({
                name: field,
                items: createFilterItems(props.items, field),
                value: selectedFilters.value[field] ?? '',
            }));
        });
        const filters = computed(() => {
            return filterFields.map((field) => ({
                name: field.key,
                items: createFilterItems(props.items, field.key, field.prepend),
                value: selectedFilters.value[field.key] ?? '',
            }));
        });

        const onSelectFilter = (field, value) => {
            if (typeof selectedFilters.value[field] !== 'undefined') {
                delete selectedFilters.value[field];
            }
            if (value && value.length) {
                selectedFilters.value[field] = value;
            }

            emit('selectFilter', selectedFilters.value);
        };

        return {
            search,
            filters,
            onSelectFilter,
        };
    },
});
</script>

<style scoped>

</style>
