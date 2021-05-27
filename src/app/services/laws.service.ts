import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Law } from '../models/law';
import { LawsDataStoreService } from './laws-data-store.service';

//קבלת נתוני החוקים
@Injectable({
  providedIn: 'root'
})
export class LawsService {

  constructor(private http: HttpClient, private lawsDataStore: LawsDataStoreService) { }

  loadLaws(){
    this.http.get(environment.jsonLink).subscribe((res)=> {
      let laws: Law[] = []
      laws = JSON.parse(JSON.stringify(res));
      this.lawsDataStore.setLaw(laws);
        });
  }
}
