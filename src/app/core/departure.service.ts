import {Injectable} from '@angular/core';
import {forkJoin, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map, tap} from 'rxjs/operators';
import {Departure, DepartureAdapter} from "./departure.model";

@Injectable({
  providedIn: 'root',
})

export class DepartureService {

  private baseUrl = 'https://transport.opendata.ch/v1/stationboard';

  constructor(private http: HttpClient, private adapter: DepartureAdapter) {
  }

  listTrain(): Observable<Departure[]> {
    const url = `${this.baseUrl}?id=8504106&limit=5`
    return this.http.get(url).pipe(
      map((data: any) => data.stationboard.map((item: any) => this.adapter.adapt(item)))
    );
  }

  listBus(): Observable<Departure[]> {
    const url = `${this.baseUrl}?id=8589226&limit=7`
    return this.http.get(url).pipe(
      map((data: any) => data.stationboard.map((item: any) => this.adapter.adapt(item)))
    );
  }

  list(): Observable<Departure[]> {
    return forkJoin([this.listTrain(), this.listBus()]).pipe(map(([s1, s2]) => [...s1, ...s2].sort((a, b) => new Date(a.stop.departure).getTime() - new Date(b.stop.departure).getTime()).splice(0, 10)));
  }
}
