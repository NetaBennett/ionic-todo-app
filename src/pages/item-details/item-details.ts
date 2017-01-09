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
  selectedCategoryName: string;
  categories: Array<any> = [];

  constructor(private nav: NavController, private navParams: NavParams, 
    private loadingController: LoadingController, private dataService: DataService) {
   
     this.selectedItem = this.navParams.get('item') || {};
     this.selectedCategory = (this.selectedItem) ? this.selectedItem.category : {};
     

    let loader = this.loadingController.create({
      content: 'Loading...'
    });

    loader.present().then(() => {
        this.dataService.getCategories().then(data => {
          this.categories = data;
          this.selectedCategory = (this.selectedItem && this.selectedItem.category) ? this.selectedItem.category : {};
          this.selectedCategoryName = this.selectedCategory.title;
        });
        loader.dismiss();
      }
    );
  }

   saveItem() {      
      this.dataService.saveListItem(this.selectedItem)
      .then(result => { 
        this.goHome(); 
      });     
  }

  removeItem() {   
    this.dataService.removeListItem(this.selectedItem.id)
      .then(result => { 
        this.goHome(); 
      }); 
  }
  
  selectedCategoryChange() {  
    let tmp = this.categories.find(cat => cat.title === this.selectedCategoryName);    
    this.selectedItem.category = tmp; 
  }

  goHome() {
    this.nav.popToRoot();
  }
}
