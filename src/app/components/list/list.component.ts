import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list/list.service';
import { BasketService } from 'src/app/services/basket/basket.service';
import { priceCard } from 'src/app/utils/function';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  filterCategorie = "none";

  get listCard() {
    return this.service.listCard;
  }

  get listRarities() {
    return this.service.listRarities;
  }

  get isLoadList() {
    return this.service.isListLoad;
  }

  get currentPage() {
    return this.service.page;
  }

  set currentPage(page: any) {
    this.service.changePage = page;
  }

  get basket() {
    return this.serviceBasket.basket;
  }

  get filter() {
    return this.filterCategorie;
  }

  set filter(val) {
    this.service.changeFilter(val);
  }

  get pageSize() {
    return this.service.pageSize;
  }

  get isNextPage() {
    return !(this.pageSize > this.listCard.length);
  }

  constructor(private service: ListService,
    private serviceBasket: BasketService) { }

  ngOnInit(): void {
  }

  // Return correct price of the card
  priceCard = (price: any) => {
    return priceCard(price);
  }

  // Go to previous page of the list
  previousPage = () => {
    this.currentPage = this.currentPage - 1;
    this.scrollToTop();
  }

  // Go to next page of the list
  nextPage = () => {
    this.currentPage = this.currentPage + 1;
    this.scrollToTop();
  }

  // Function that scroll to top of the list
  scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  // Add card by 1 to basket
  addCard = (card: any) => {
    this.serviceBasket.addCard(card);
  }

  // Remove card by 1 to basket
  removeCard = (id: string) => {
    this.serviceBasket.removeCard(id);
  }

  // Return the quantity of cards in the basket
  quantityCard = (id: string) => {
    return this.basket.filter(card => card.id === id).length;
  }

}
