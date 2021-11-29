import {Injectable} from '@angular/core';
import {Adapter} from "./adapter";

export class Stop {
  constructor(
    public departure: string,
    public platform: string,
    public delay: string,
  ) {}
}

@Injectable({
  providedIn: 'root',
})

export class StopAdapter implements Adapter<Stop> {
  adapt(item: any): Stop {
    return new Stop(item.departure, item.platform, item.delay);
  }
}
