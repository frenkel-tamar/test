import { Component, Input, OnInit } from '@angular/core';
import { Link } from 'src/app/models/link';

@Component({
  selector: 'app-display-links',
  templateUrl: './display-links.component.html',
  styleUrls: ['./display-links.component.scss']
})
export class DisplayLinksComponent implements OnInit {

  @Input() title!:string
  @Input() links!: Link[];
  constructor() { }

  ngOnInit(): void {
  }

}
