import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ListPage } from '../pages';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(private nav: NavController) {

  }

  goToRemindersList() {
    this.nav.push(ListPage);
  }
  
}
