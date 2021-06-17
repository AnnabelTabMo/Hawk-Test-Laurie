import { priceCard } from '../utils/function';

export class CardModel {
  id: string = '';
  name?: string;
  types?: Array<string>;
  price: number = 0;
  hp?: string;
  image?: string;
  quantity?: number;

  constructor() { }

  create(card: any) {
    let instance: CardModel = new CardModel();

    instance.id = card.id;
    instance.name = card.name;
    instance.types = [...card.types];
    instance.price = card.price || priceCard(card.tcgplayer.prices);
    instance.hp = card.hp;
    instance.image = card.image || card.images.small;

    return instance;
  }
}