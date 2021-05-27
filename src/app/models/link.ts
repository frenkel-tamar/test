export class Link {
    lawName: string;
    comNum: string;

    constructor(lawName : string, comNum : string){
        this.lawName = lawName;
        this.comNum = comNum;
    }

    getTitle(){
        let s = this.lawName;
        if(this.comNum){
            s+= ' סעיף ' + this.comNum
        }
        else {
            //אם לא נמצא הסעיף שהיה רשום
            if(this.comNum === undefined){
                s+= ' מקושר לסעיף שלא קיים בחוק '
            }
        }
        return s;
    }
}