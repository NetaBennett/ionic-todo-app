import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  selectedCategory: any;
  categories: Array<any>;

  constructor(public nav: NavController, public navParams: NavParams, public dataService: DataService) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
    this.selectedCategory = this.selectedItem.category;
    dataService.getCategories().then(data => this.categories = data); //todo, move this into ion will load event handler
  }

  public selectCategory(category) {
    console.log('selected category: ' + category.title);
    this.selectedItem.category = category;
  }

  goHome() {
    this.nav.popToRoot();
  }
}
