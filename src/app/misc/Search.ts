export default function Search(items: any, bkpItems: any, searchableKeys: string[] = [], searchInput: string) {
    if (!searchInput.trim()) {
        return [...bkpItems]; // Return the original items if the search input is empty
    }

    const filteredItems = bkpItems.filter((item: any) =>
        searchableKeys.some((key) =>
            String(item[key])
                .toLowerCase()
                .includes(searchInput.toLowerCase())
        )
    );

    return filteredItems;
}