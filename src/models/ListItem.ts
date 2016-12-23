import { Category } from './Category';

export class ListItem {
    category: Category;
    title: string;
    note: string;

    constructor(category: Category, title:string, note: string) {
        this.category = category;
        this.title = title;
        this.note = note;
    }
}