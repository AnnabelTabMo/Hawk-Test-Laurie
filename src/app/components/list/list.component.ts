import { Component, OnInit } from '@angular/core';
import { ListService } from 'src/app/services/list/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  get listCard() {
    return this.service.listCard;
  }

  get isLoadList() {
    return this.service.isListLoad;
  }

  constructor(public service: ListService) { }

  ngOnInit(): void {
  }

  priceCard(price: any) {
    return price.holofoil && price.holofoil.low ||
    price.reverseHolofoil && price.reverseHolofoil.low ||
    price.normal && price.normal.low;
  }

}
