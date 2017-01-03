import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { ItemDetailsPage } from '../pages';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  selectedItem: any;
  items: Array<{id: number, category: any, title: string, note: string}>;

  constructor(public nav: NavController, public navParams: NavParams, public dataService: DataService) {  
    this.items = [];    

    dataService.getListItems().then(itemData => this.items = itemData);
  } 
   
  itemTapped(event, selectedItem) {
    this.goToDetailView(selectedItem);
  }

  goHome() {
    this.nav.popToRoot();
  }

  goToDetailView(selectedItem) {
    this.nav.push(ItemDetailsPage, {
      item: selectedItem
    });
  }
}
