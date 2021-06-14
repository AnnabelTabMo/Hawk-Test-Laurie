import { Injectable } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket: Array<CardModel> = [];
  quantityCards: number = 0;
  totalPrice: number = 0;

  constructor() { }

  addCard(card: any) {
    this.basket = [...this.basket, new CardModel().create(card)];
    this.quantityCards = this.quantityCards + 1;
    this.totalPrice = this.totalPrice + parseFloat(this.priceCard(card.tcgplayer.prices));
  }

  removeCard(id: string) {
    const cardIndex = this.basket.findIndex(card => card.id === id);
    if (!!~cardIndex) {
      this.basket = [ ...this.basket.slice(0, cardIndex), ...this.basket.slice(cardIndex+1, this.basket.length) ];
      this.quantityCards = this.quantityCards-1;
      this.updateTotalPrice();
    }
  }

  updateTotalPrice() {
    this.totalPrice = this.basket.reduce((totalPrice, card: CardModel) => totalPrice + card.price, 0);
  }

  priceCard(price: any) {
    return price.holofoil && price.holofoil.low ||
    price.reverseHolofoil && price.reverseHolofoil.low ||
    price.normal && price.normal.low;
  }
}
