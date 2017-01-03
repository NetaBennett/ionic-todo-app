import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DataService } from '../../services/data.service';
import { ListPage, ItemDetailsPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  items: Array<any>;

  constructor(private nav: NavController, private dataService: DataService) {

    dataService.getListItems().then(itemData => this.items = itemData);

  }



  goToListView() {
    this.nav.push(ListPage);
  }

  goToDetailView() {
    this.nav.push(ItemDetailsPage);
  }
}
