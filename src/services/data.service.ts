import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable()
export class DataService {
    
    
    constructor(public storage: Storage) {
        this.initDefaultList();
    }

    getData() {
        //stopped here
        //this.storage.get('MY_LIST').then()
        //return JSON.parse(storedData); //return 
        return this.storage.get('MY_LIST').then((storedData) => {
            return JSON.parse(storedData);
        });
    }

    saveData(data) {
        let newData = JSON.stringify(data);
        this.storage.set('MY_LIST', newData);
    }

   

    initDefaultList() {
        let listItems = [];

        listItems.push(this.constructItem('House Project', 'clean closet', 'move items from 1st floor closet to bathroom closet', 'construct'));
        listItems.push(this.constructItem('House Project', 'paint kitchen', 'kitchen walls', 'construct'));
        listItems.push(this.constructItem('House Project', 'paint kitchen cabinets', 'kitchen cabinets', 'construct'));
        listItems.push(this.constructItem('Music Favorites', 'The Civil Wars', '', 'musical-note'));
        listItems.push(this.constructItem('Reminders', 'order amazon gift cards for xmas', 'C&J and J&B', 'alarm'));
        listItems.push(this.constructItem('Reminders', 'order amazon gift cards for xmas', 'C&J and J&B', 'alarm'));

        this.saveData(listItems);
        
    //List Item Categories and Icons   
    //construct = House Projects
    //bulb = Ideas
    //add = add
    //add-circle = add
    //alarm = Reminders
    //basket = Groceries
    //restaurant = Restaurants
    //funnel = Filter
    //map = Maps/Directions
    //musical-note = Music
    //remove-circle = remove
    //star = Important (sort first flag)
    //youtube = Youtube Vids Links
  }

  constructItem(category, title, note, icon) {
        return {category: category ,title: title, note: note, icon: icon};
  }

    
}