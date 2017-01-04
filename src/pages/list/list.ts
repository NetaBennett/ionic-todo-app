import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { ItemDetailsPage } from '../pages';


@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})

export class ListPage {
  selectedItem: any;
  categoryIdFilter: number;
  allItems: any;
  items: any;
  categories: any;

  constructor(public nav: NavController, public navParams: NavParams,
    private loadingController: LoadingController, public dataService: DataService) {
    this.items = [];

    this.categoryIdFilter = this.navParams.get('categoryId') || 0;
    let loader = this.loadingController.create({
      content: 'Loading...'
    });

    loader.present().then(() => {

      
      this.dataService.getCategories().then(data => this.categories = data);

  

      this.dataService.getItems().then((data) => {
            this.allItems = data
           this.items = filterItemList(this.allItems, this.categoryIdFilter);

        });


      function filterItemList(itemList, categoryId) {
        let filteredList = [];

          if (categoryId > 0) {

            itemList.forEach(function (i) {
              if (i.category.id === categoryId) {
                filteredList.push(i);
              }
            });
          } else {
            filteredList = itemList;
          }
          return filteredList;
      }

     loader.dismiss();
    });

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
