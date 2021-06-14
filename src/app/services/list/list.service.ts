import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ListService {
  listCard: Array<any> = [];
  isListLoad = true;
  page = 1;
  pageSize = 30;
  api: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Api-Key': 'e5c74483-d484-4e7d-a807-ecdf465578aa'
    })
  }

  set changePage(page: number) {
    this.page = page;
    this.isListLoad = true;
    this.loadList();
  }

  set changePageSize(pageSize: number) {
    this.pageSize = pageSize;
    this.isListLoad = true;
    this.loadList();
  }

  constructor(private http: HttpClient) {
    this.api = 'https://api.pokemontcg.io/v2';
    this.loadList();
  }

  resetList() {
    this.listCard = [];
  }

  loadList() {
    this.http.get(`${this.api}/cards?page=${this.page}&pageSize=${this.pageSize}`, this.httpOptions)
      .subscribe((res: any) => {
        this.listCard = res['data'];
        this.isListLoad = false;
      });
  }
}
