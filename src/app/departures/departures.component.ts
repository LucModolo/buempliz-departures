import {Component, OnInit} from '@angular/core';
import {Departure} from "../core/departure.model";
import {DepartureService} from "../core/departure.service";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-departures',
  templateUrl: './departures.component.html',
  styleUrls: ['./departures.component.scss']
})
export class DeparturesComponent implements OnInit {

  departures: Departure[];
  private updateSubscription: Subscription | undefined;

  constructor(private departureService: DepartureService) {
    this.departures = [];
  }

  changeDate(string: string): string {
    // 1. new Date from string
    // 2. convert Date to LocalTimeString (gets rid off Date
    // 3. remove seconds by clipping string
    return new Date(string)
      .toLocaleTimeString('en-GB')
      .substring(0, 5);
  }

  ngOnInit(): void {
    //first request
    this.departureService.list().subscribe(data => {this.departures = data;});
    //page refresh
    this.updateSubscription = interval(600000).subscribe(
      (val) => {
        console.log("Refresh")
        //http get request
        this.departureService.list().subscribe(data => {this.departures = data;});
      }
    );
  }
}
