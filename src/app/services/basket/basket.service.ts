import { Injectable } from '@angular/core';
import { CardModel } from 'src/app/models/card.model';
import { priceCard } from 'src/app/utils/function';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  basket: Array<CardModel> = [];
  quantityCards: number = 0;
  totalPrice: number = 0;

  constructor() { }

  // Add card and uptade price and quantity to basket
  addCard = (card: any) => {
    this.basket = [...this.basket, new CardModel().create(card)];
    this.quantityCards = this.quantityCards + 1;
    this.totalPrice = this.totalPrice + parseFloat(card.price || priceCard(card.tcgplayer.prices));
  }

  // Remove card and update price and quantity to basket
  removeCard = (id: string) => {
    const cardIndex = this.basket.findIndex(card => card.id === id);
    if (!!~cardIndex) {
      this.basket = [...this.basket.slice(0, cardIndex), ...this.basket.slice(cardIndex + 1, this.basket.length)];
      this.quantityCards = this.quantityCards - 1;
      this.totalPrice = this.basket.reduce((totalPrice, card: CardModel) => totalPrice + card.price, 0);
    }
  }
}
