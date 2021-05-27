import { Component } from '@angular/core';
import { LawsDataStoreService } from './services/laws-data-store.service';
import { LawsService } from './services/laws.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'test';

  constructor(private lawsService: LawsService, public lawsStoreService:LawsDataStoreService){
  }

  ngOnInit(){
    this.lawsService.loadLaws()
  }

}
