export default function useFilters() {
    const createFilterItems = <I = unknown[]>(items: I[], key: string, prepend: { title: string, value: string } | null = null): { title: string, value: string }[] => {
        const unique = items
            .map((item) => ({
                title: item[key],
                value: item[key],
            }))
            .filter((item, index, self) => self.map(inner => inner.value).indexOf(item.value) === index);

        if (prepend) {
            return [prepend].concat(unique);
        }

        return unique;
    };

    const applySearchAndFilters = <I = unknown[]>(items: I[], filters: Record<string, string>): I[] => {
        const filterKeys = Object.keys(filters);
        return items.filter((item) => {
            for (const filterKey of filterKeys) {
                if (typeof item[filterKey] !== 'undefined' && item[filterKey] !== filters[filterKey]) {
                    return false;
                }
            }

            return true;
        });
    };

    return {
        createFilterItems,
        applySearchAndFilters,
    };
}
