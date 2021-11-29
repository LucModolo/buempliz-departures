import {Injectable} from '@angular/core';
import {Adapter} from "./adapter";
import {Stop} from "./stop.model";

export class Departure {
  constructor(
    public stop: Stop,
    public name: string,
    public category: string,
    public number: string,
    public operator: string,
    public to: string,
    public capacity1st: string,
    public capacity2nd: string,
  ) {}
}

@Injectable({
  providedIn: 'root',
})

export class DepartureAdapter implements Adapter<Departure> {
  adapt(item: any): Departure {
    return new Departure(item.stop, item.name, item.category, item.number, item.operator, item.to, item.capacity1st, item.capacity2nd);
  }
}
