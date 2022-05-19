import { atom, selector } from 'recoil';

export const notes = atom({
    key: 'notes',
    default: [
        {
            id: 1,
            title: 'Note1',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            category_id: '1',
            entry_date: '05-18-2022'
        },
        {
            id: 2,
            title: 'Note2',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            category_id: '1',
            entry_date: '05-18-2022'
        },
        {
            id: 3,
            title: 'Note3',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            category_id: '1',
            entry_date: '05-18-2022'
        },
        {
            id: 4,
            title: 'Note4',
            body: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
            category_id: '1',
            entry_date: '05-18-2022'
        },
    ]
});

export const categories = atom({
    key: 'categories',
    default: [
        {
            id: 1,
            label: "Global"
        },
        {
            id: 2,
            label: "Management"
        },
        {
            id: 3,
            label: "Ideas"
        },
        {
            id: 4,
            label: "Planning"
        },
    ]
});

export const currentCategoryId = atom({
    key: 'current_category_id',
    default: 1
});
