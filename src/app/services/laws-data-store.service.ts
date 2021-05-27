import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Component } from '../models/component';
import { Law } from '../models/law';
import { Link } from '../models/link';

// service 
// המ
@Injectable({
  providedIn: 'root'
})
export class LawsDataStoreService {

  private laws : Law[] = []
  laws$ : BehaviorSubject<Law[]> = new BehaviorSubject<Law[]>([]);

  currentLaw!:Law;
  currentComponent!: Component

  linkTo: Link[]= []
  linkFrom: Link[]= []
  constructor() { }

  setLaw(laws: Law[]) {
    this.laws = laws;
    this.laws$.next(this.laws);
  }

  getLaw(){
    return this.laws$;
  }

  searchLink(law: Law, com: Component){
    this.cleanData();
    // בניית שני מערכים האחד מכל את הקשרים היוצאים מהסעיף ואחד מכיל את כל מי שמקושר אליו
    // בניית מערך של הקשרים היוצאים מהסעיף
      com.refTo.forEach(refto => {
        let refId = refto.refTo_eId;
        // קשרים באותו הסעיף
        if(refId[0] === "#"){
          let eid = refId.substring(1, refId.length);
          this.linkFrom.push(new Link(law.LawName, this.findCompoentNum(law, eid)!));
        }
        // קשרים לסעיפים אחרים
        else {
          let lawProp = refId.split('#', 2);
          let law = this.laws.find((l) => l.LawUri.includes(lawProp[0]));
          // מצביע לסעיף הראשי
          if(lawProp.length === 1){
            this.linkFrom.push(new Link(law?.LawName!, ''));
          }
          // מצביע לסעיף בחוק
          else{
            this.linkFrom.push(new Link(law?.LawName!, this.findCompoentNum(law!, lawProp[1])!));
          }

        }
      });
      // בניית מערך של הקשרים המצביעים אל הסעיף
      this.laws.forEach((l) => {
        l.components.forEach(c => {
          c.refTo.forEach(ref => {
            if(ref.refTo_eId === (law.LawUri.replace('/main', '') + "#" + com.eId)){
              this.linkTo.push(new Link(l.LawName, c.componentNum))
            }
          });
        });
      })

  }

  cleanData() {
    this.linkTo = [];
    this.linkFrom = [];
  }

  findCompoentNum(law : Law, eid:string){
    return law.components.find((c) => c.eId === eid)?.componentNum
}

}
