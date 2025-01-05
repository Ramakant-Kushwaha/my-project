import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IsvListService } from '../services/isv-list.service';
import { Router } from '@angular/router';

export interface UserData {
  id: string;
  name: string;
  domain: string;
}

@Component({
  selector: 'app-all-isv-list',
  templateUrl: './all-isv-list.component.html',
  styleUrls: ['./all-isv-list.component.css'],
})
export class AllIsvListComponent {
  displayedColumns: string[] = ['id', 'name', 'domain'];
  dataSource: MatTableDataSource<UserData>;

  public isvList: any[];
  public orgData: any[];

  public isUserFiltering: boolean = false;
  public selectedColumn: string = 'Both';
  public filterValue: string = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private isvS: IsvListService, public router: Router) {
    this.isvS.getIsvList().subscribe((res) => {
      this.isvList = res;
      this.loadData();
    });
  }

  ngOnInit(): void {}

  ngAfterViewInit() {}

  public loadData() {
    this.orgData = JSON.parse(JSON.stringify(this.isvList));

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(this.isvList);

    setTimeout(() => {
      this.listInit();
    }, 500);
  }

  public listInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.dataSource.sortData = (data, so) => {
      console.log(data);

      if (so.direction === '' && !this.isUserFiltering) {
      } else {
        const currentPageData = data.splice(
          this.paginator.pageIndex * this.paginator.pageSize,
          this.paginator.pageSize
        );

        currentPageData.sort((a, b) => {
          const isAsc = so.direction === 'asc';
          const valueA = a[so.active];
          const valueB = b[so.active];
          return (
            (valueA < valueB ? -1 : valueA > valueB ? 1 : 0) * (isAsc ? 1 : -1)
          );
        });

        data.splice(
          this.paginator.pageIndex * this.paginator.pageSize,
          0,
          ...currentPageData
        );
      }

      this.isUserFiltering = false;
      return data;
    };
  }
  public applyFilter($event, from: any) {
    if (from === 'search') {
      this.filterValue = $event.target.value;
    }

    if (from === 'select') {
      this.selectedColumn = $event.target.value;
    }
    if (this.selectedColumn === 'Both') {
      // Apply filter to specific column only
      this.dataSource.filterPredicate = (
        data: any,
        filter: string
      ): boolean => {
        const name = data['name']?.toString().toLowerCase() || '';

        const domain = data['domain']?.toString().toLowerCase() || '';
        return (
          name.includes(filter.trim().toLowerCase()) ||
          domain.includes(filter.trim().toLowerCase())
        );
      };
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    } else {
      // Apply filter to specific column only
      this.dataSource.filterPredicate = (
        data: any,
        filter: string
      ): boolean => {
        const columnValue =
          data[this.selectedColumn]?.toString().toLowerCase() || '';
        return columnValue.includes(filter.trim().toLowerCase());
      };
      this.dataSource.filter = this.filterValue.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
  }

  public onIsvClick(row) {
    this.router.navigate(['/isv-detail', row.name]);
  }
}
