import { Component, OnInit } from '@angular/core';
import { BasketService } from 'src/app/services/basket/basket.service';
import { CardModel } from 'src/app/models/card.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {

  dataSource: Array<CardModel> = [];
  displayedColumns: string[] = ['image', 'name', 'types', 'rarity', 'quantity', 'price', 'total'];

  get totalPrice() {
    return this.service.totalPrice;
  }

  constructor(private service: BasketService,
    private router: Router) { }

  ngOnInit(): void {
    this.updateTable();
  }

  // Update cart content
  updateTable = () => {
    const uniqueCardsIds = [...new Set(this.service.basket.map(card => card.id))];
    const uniqueCards = uniqueCardsIds.reduce((acc: any[], curr) => {
      return [...acc, {
        ...this.service.basket.find(card => card.id === curr),
        quantity: this.service.basket.filter(card => card.id === curr).length
      }];
    }, []);
    this.dataSource = uniqueCards;
  }

  // Return Types of card in a string
  getTypes = (types: Array<string>) => {
    return types.reduce((acc, curr) => `${acc} ${curr}`, "");
  }

  // Navigate to list of cards
  goToList = () => {
    this.router.navigate(['list']);
  }

  // Reduce card quantity by 1
  removeCard = (id: string) => {
    this.service.removeCard(id);
    this.updateTable();
  }

  // Increase cart quantity by 1
  addCard = (card: any) => {
    this.service.addCard(card);
    this.updateTable();
  }

}
