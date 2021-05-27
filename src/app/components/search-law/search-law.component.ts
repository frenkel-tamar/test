import { Component, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Law } from 'src/app/models/law';
import { distinctUntilChanged, map, tap } from 'rxjs/operators'
import { LawsDataStoreService } from 'src/app/services/laws-data-store.service';
import { FormControl } from '@angular/forms';
import { Component as ComponentModel } from 'src/app/models/component';

@Component({
  selector: 'search-law',
  template: `
  <div style="width:100%;margin:10px">
      <div style="width:100%;">
        <mat-form-field style="width:50%;" class="example-full-width">
        <mat-label>בחר חוק</mat-label>
        <input type="text"
              placeholder="בחר חוק"
              matInput
              [formControl]="lawControl"
              [matAutocomplete]="auto">
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="getTitle.bind(this)">
            <mat-option (onSelectionChange)="selectionChange()" *ngFor="let law of laws$ | async" [value]="law">
                  {{law.LawName}}
            </mat-option>
        </mat-autocomplete>
      </mat-form-field>
      </div>
      <div>
        <mat-form-field class="example-full-width">
        <mat-label>בחר סעיף</mat-label>
        <input type="text"
              placeholder="בחר סעיף"
              matInput
              [formControl]="componentControl"
              [matAutocomplete]="autoComponent">
        <mat-autocomplete #autoComponent="matAutocomplete" [displayWith]="getTitleComponent.bind(this)">
            <mat-option *ngFor="let c of componentsList" [value]="c">
                  {{c.componentNum}}
            </mat-option>
        </mat-autocomplete>
        </mat-form-field>
      </div>
      <div style="width: 100%; display: flex; justify-content: center;">
        <button type="button" (click)="search()"> חפש קישורים</button>
      </div>
  
  </div>
  
    
   

  `,
  styleUrls: ['./search-law.component.scss']
})
export class SearchLawComponent implements OnInit {

  lawControl = new FormControl();
  componentControl = new FormControl();
  laws$!: Observable<Law[]>;
  componentsList!: ComponentModel[];

  constructor(private lawsDataStoreService: LawsDataStoreService) { }

  ngOnInit(): void {
    this.lawControl.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((value: Law) => {
      this.componentControl.setValue(null)
      if(value){
        this.componentsList = value.components
      }
      else {
        this.componentsList = [];
      }
    })
    this.laws$ = this.lawsDataStoreService.getLaw().pipe(
      map((laws:Law[]) => {
        return laws.sort(function(a, b){
          if(a.LawName < b.LawName) { return -1; }
          if(a.LawName > b.LawName) { return 1; }
          return 0 })
      })
    );
  }

  getTitle(law: Law) {
    return law ? law.LawName : '';
  }

  getTitleComponent(c: ComponentModel){
      return c ? c.componentNum : ''
  }

  selectionChange(){
    // this.componentsList = (<Law>this.lawControl.value).components
  }

  search(){
    this.lawsDataStoreService.searchLink(this.lawControl.value, <ComponentModel>this.componentControl.value);
  }

}
