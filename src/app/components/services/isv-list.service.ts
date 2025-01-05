import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import isvList from './../../../assets/temp/isv-list.json';
import { map, tap } from 'rxjs';
@Injectable()
export class IsvListService {
  public isvList: any[];
  constructor(private http: HttpClient) {}

  public getIsvList() {
    return this.http.get<any>('http://localhost:5000/api/greet').pipe(
      map((res) => {
        return res.map((res) => {
          return {
            name: res.toolName,
            domain: res.domainName,
            ...res,
          };
        });
      }),
      tap((res) => {
        this.isvList = res;
      })
    );
  }

  public getChartLabel() {
    const toolCounts = isvList.reduce((acc, item) => {
      acc[item.toolName] = (acc[item.toolName] || 0) + 1;
      return acc;
    }, {});

    const uniqueToolNames = Object.keys(toolCounts);
    const counts = Object.values(toolCounts);

    return [uniqueToolNames, counts];
  }
  public getChartValue() {
    return isvList.slice(0, 10).map((isv) => {
      return isv.domainName;
    });
  }

  public getIsvById(name: string) {
    return isvList.find((isv) => isv.toolName === name);
  }
}
