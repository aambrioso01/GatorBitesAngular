import { Component, OnInit, Input } from '@angular/core';
import { Location } from '../location';

@Component({
  selector: 'app-overview-detail',
  templateUrl: './overview-detail.component.html',
  styleUrls: ['./overview-detail.component.css']
})

export class OverviewDetailComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() location?: Location;
}
