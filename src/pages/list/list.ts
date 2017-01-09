import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import * as _ from 'lodash';

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
  queryText: string = '';

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

  doQueryFilter() {  

    if (this.queryText && this.queryText.trim().length > 0) {
      let queryTextLower = this.queryText.toLowerCase();
      let filteredItems = [];
      
        _.forEach(this.allItems, itemData => {
            if (itemData) {
              if (itemData.title.toLowerCase().includes(queryTextLower) || 
                itemData.category.title.toLowerCase().includes(queryTextLower)) {

                  filteredItems.push(itemData);
              }
            }
        });

        this.items = []; //dunno why but have to do this for ui model to detect change
        this.items = filteredItems;
    } else {
       this.items = []; //dunno why but have to do this for ui model to detect change
       this.items = this.allItems;
    }

   
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
