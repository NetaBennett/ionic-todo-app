import { Component } from '@angular/core';

import { NavController, NavParams, LoadingController } from 'ionic-angular';

import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
  selectedCategory: any;
  categories: Array<any>;

  constructor(private nav: NavController, private navParams: NavParams, 
    private loadingController: LoadingController, private dataService: DataService) {


    this.selectedItem = this.navParams.get('item') || {};
    this.selectedCategory = (this.selectedItem) ? this.selectedItem.category : {};
    

    let loader = this.loadingController.create({
      content: 'Loading...'
    });

    loader.present().then(() => {
        this.dataService.getCategories().then(data => this.categories = data);
        loader.dismiss();
      }
    );
  }

  saveItem() {
      this.dataService.addListItem(this.selectedCategory, this.selectedItem.title, this.selectedItem.note);
  }
  
  selectedCategoryChange() {
    this.selectedItem.category = this.selectedCategory;
  }

  goHome() {
    this.nav.popToRoot();
  }
}
