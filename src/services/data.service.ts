import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class DataService {

    private readonly CATEGORY_KEY: string = 'CATEGORIES';
    private readonly LIST_KEY: string = 'LIST';

    constructor(protected storage: Storage) {
        this.initCategories();
        this.initDefaultList();
    }

    public getCategories() {
        return this.getData(this.CATEGORY_KEY);
    }

    public getItems() {
        return this.getData(this.LIST_KEY);
    }

    public getItemCountsByCategory() {
        let list = [];
        let grouped = {};
        let result = [];
        //category, count

        return this.getItems().then((data) => {
            list = data;

            list.forEach(function (i) {
                var existing = getExistingEntry(result, i.category.title);

                if (!existing) {
                    result.push({ id: i.category.id, title: i.category.title, icon: i.category.icon, count: 1 });
                } else {
                    existing.count += 1;
                }
            });

            function getExistingEntry(ary, catTitle) {
                let existing = null;

                if (ary && ary.length > 0) {
                    for (let i = 0; i < ary.length; i++) {
                        if (ary[i].title === catTitle) {
                            existing = ary[i];
                            break;
                        }
                    }
                }
                return existing;
            }         
            //console.table(result);

            return result;
        });
    }

    public addListItem(category: any, title: string, note: string) {

        return new Promise((resolve, reject) => {

            let list = [];
            this.getItems().then((data) => {
                list = data;
                let id = this.getNextId(list);

                if (list) {
                    var item = this.constructItem(id, category, title, note);
                    list.push(item);
                    this.saveData(list, this.LIST_KEY);               
                    resolve(item);
                }
            });
        });
    }

    public removeListItem(id: number) {

        return new Promise((resolve, reject) => {

            let list = [];
            this.getItems().then((data) => {
                list = data;

                let idx = list.findIndex((item) => {
                    return item.id === id;
                });

                if (idx && idx > -1) {
                    list.splice(idx, 1);
                    this.saveData(list, this.LIST_KEY);
                    resolve();
                }
            });
        });       
    }

    public addCategory(title: string, icon: string) {
        let categories = [];
        this.getCategories().then((data) => {
            categories = data;
            let id = this.getNextId(categories);

            if (categories) {
                categories.push(this.constructCategory(id, title, icon));
                this.saveData(categories, this.CATEGORY_KEY);
            }
        });
    }

    public removeCategory(category: any) {
        let categories = [];
        this.getCategories().then((data) => {
            categories = data;

            if (categories) {
                let idx = -1;

                for (let i = 0; i < categories.length; i++) {
                    if (categories[i].title === category.title) {
                        idx = i;
                        break;
                    }
                }

                if (idx > -1) {
                    categories.splice(idx, 1);
                }

                this.saveData(categories, this.CATEGORY_KEY);
            }
        });
    }

    // ----------------------------------------------------------------------

    private getData(dataKey: string) {
        return this.storage.get(dataKey).then((storedData) => {
            return JSON.parse(storedData);
        });
    }

    private saveData(data: any, dataKey: string) {
        let newData = JSON.stringify(data);
        this.storage.set(dataKey, newData);
    }

    private initCategories() {

        let categories = [];
        this.getData(this.CATEGORY_KEY).then((storedData) => {
            categories = storedData;
        });

        if (!categories || categories.length < 1) {

            categories.push(this.constructCategory(1, 'House Projects', 'construct'));
            categories.push(this.constructCategory(2, 'Reminders', 'alarm'));
            categories.push(this.constructCategory(3, 'Groceries', 'basket'));
            categories.push(this.constructCategory(4, 'Restaurants', 'restaurant'));
            categories.push(this.constructCategory(5, 'Directions', 'map'));
            categories.push(this.constructCategory(6, 'YouTube', 'youtube'));
            categories.push(this.constructCategory(7, 'Music', 'musical-note'));
            categories.push(this.constructCategory(8, 'Ideas', 'bulb'));

            this.saveData(categories, this.CATEGORY_KEY);
        }

    }

    private initDefaultList() {
        let listItems = [];

        //pull catgory object out to construct items
        let categories = [];
        this.getData(this.CATEGORY_KEY).then((storedData) => {
            categories = storedData;

            listItems.push(this.constructItem(1, categories[0], 'clean closet', 'move items from 1st floor closet to bathroom closet'));
            listItems.push(this.constructItem(2, categories[0], 'paint kitchen', 'kitchen walls'));
            listItems.push(this.constructItem(3, categories[0], 'paint kitchen cabinets', 'kitchen cabinets'));
            listItems.push(this.constructItem(4, categories[6], 'The Civil Wars', ''));
            listItems.push(this.constructItem(5, categories[1], 'order amazon gift cards for xmas', 'C&J and J&B'));
            this.saveData(listItems, this.LIST_KEY);
        });


    }


    private constructItem(index: number, category: any, title: string, note: string) {
        return { id: index, category: category, title: title, note: note };
    }

    private constructCategory(index: number, title: string, icon: string) {
        return { id: index, title: title, icon: icon };
    }

    private getNextId(list: any) {
        let highestId = -1;

        list.forEach(function (element) {
            if (element && element.id && element.id > highestId) {
                highestId = element.id;
            }
        });

        return highestId + 1;
    }
}