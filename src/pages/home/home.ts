import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { ListPage, ItemDetailsPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  items: Array<any>;
  itemCounts: any;

  constructor(private nav: NavController, private dataService: DataService, private loadingController: LoadingController, ) {

  }

  itemTapped(event, selectedItem) {
    this.goToListViewWithFilter(selectedItem);
  }

  goToListView() {
    this.nav.push(ListPage);
  }

  goToAddItemView() {
    this.nav.push(ItemDetailsPage);
  }

  goToListViewWithFilter(selectedCategory) {
    this.nav.push(ListPage, {
      categoryId: selectedCategory.id
    });
  }

  //testing ion view event cycle
  ionViewDidLoad() {
    //console.log('ionViewDidLoad');
  }

  ionViewWillEnter() {
    //console.log('ionViewWillEnter');

    let loader = this.loadingController.create({
      content: 'Loading...'
    });

    loader.present().then(() => {
      this.dataService.getItemCountsByCategory().then(itemData => this.itemCounts = itemData);
      loader.dismiss();
    });
  }

  ionViewDidEnter() {
    //console.log('ionViewDidEnter');
  }

}
