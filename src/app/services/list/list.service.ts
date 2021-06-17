import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  listCard: Array<any> = [];
  listRarities: Array<string> = [];
  isListLoad = true;
  filter = "none";
  page = 1;
  pageSize = 30;
  api: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Api-Key': 'e5c74483-d484-4e7d-a807-ecdf465578aa'
    })
  }

  set changePage(page: number) {
    this.page = page;
    this.loadList();
  }

  set changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.loadList();
  }

  constructor(private http: HttpClient) {
    this.api = 'https://api.pokemontcg.io/v2';
    this.loadRaritiesCategorie();
    this.loadList();
  }

  resetList() {
    this.listCard = [];
  }

  resetPage() {
    this.page = 1;
    this.pageSize = 30;
  }

  loadList() {
    this.isListLoad = true;
    if (this.filter === "none") {
      this.http.get(`${this.api}/cards?page=${this.page}&pageSize=${this.pageSize}`, this.httpOptions)
        .subscribe((res: any) => {
          this.listCard = res['data'];
          this.isListLoad = false;
        });
    } else {
      this.loadRarities();
    }

  }

  loadRaritiesCategorie() {
    this.http.get(`${this.api}/rarities`, this.httpOptions)
      .subscribe((res: any) => {
        this.listRarities = res['data'];
      });
  }

  loadRarities() {
    this.http.get(`${this.api}/cards?q=!rarity:"${this.filter}"&page=${this.page}&pageSize=${this.pageSize}`, this.httpOptions)
      .subscribe((res: any) => {
        this.listCard = res['data'];
        this.isListLoad = false;
      });
  }

  changeFilter(filter: string) {
    this.resetPage();
    this.filter = filter;
    this.loadList();
  }
}
