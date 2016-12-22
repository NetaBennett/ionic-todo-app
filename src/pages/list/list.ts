import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { ItemDetailsPage } from '../item-details/item-details';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedItem: any;
  nbrItems: number;
  icons: string[];
  items: Array<{title: string, note: string, icon: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService: DataService) {
    // If we navigated to this page, we will have an item available as a nav param    
    this.selectedItem = navParams.get('item'); // NRB: REALLY?     
    this.items = [];
    

    dataService.getData().then( (itemData) => {
      if (itemData) {
        this.items = itemData;
        this.nbrItems = this.items.length;
      }
    });
  } //constructor

   

  itemTapped(event, item) {
    this.navCtrl.push(ItemDetailsPage, {
      item: item
    });
  }//itemTapped
}
