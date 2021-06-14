import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  quantityCards: number = 0;
  totalPrice: number = 0;

  constructor(public router: Router) { }

  ngOnInit(): void {
  }

  goToBasket() {
    this.router.navigate(['basket']);
  }

}
