import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/global/services/employees/employees.response';
import { WorkdaysService } from 'src/app/global/services/workdays/workdays.service';
import { NewWorkdayModalComponent } from './new/new.component';
import { DateUtils, Month } from 'src/app/global/utils/dateutils';
import { Workday } from 'src/app/global/services/workdays/workdays.response';

/**
 * Component for displaying workdays in a modal dialog.
 */
@Component({
  selector: 'app-modal-workday',
  templateUrl: './workday.component.html',
  styleUrls: ['./workday.component.scss']
})
export class WorkdayModalComponent implements OnInit {

  /**
   * Array of months for display in the UI.
   */
  public months: Array<Month>;
  /**
   * The employee whose workdays are being displayed.
   */
  public employee: Employee;
  /**
   * Array of workdays for the employee.
   */
  public workdays: Array<Workday> = [];
  /**
   * Data source for the workdays table.
   */
  public dataSource: MatTableDataSource<Workday> = new MatTableDataSource<Workday>([]);
  /**
   * Label for the next page button in the paginator.
   */
  public nextPageLabel: string = 'Siguiente Página';
  /**
   * Label for the previous page button in the paginator.
   */
  public previousPageLabel: string = 'Página anterior';
  /**
   * Label for the items per page select in the paginator.
   */
  public itemsPerPageLabel: string = 'Elementos por páginas';
  /**
   * Loading flag for displaying loading spinner.
   */
  public loading: boolean = true;
  /**
   * Flag to include archived workdays in the table.
   */
  public includeArchived: boolean = false;
  /**
   * Array of filtered workdays.
   */
  public filteredWorkdays: Array<Workday> = [];
  /**
   * Paginator instance for the table.
   */
  @ViewChild(MatPaginator) paginator?: MatPaginator;
  /**
   * Sort instance for the table.
   */
  @ViewChild(MatSort) sort?: MatSort;

  /**
   * Displayed columns in the table.
   */
  public displayedColumns: string[] = [
    'Year',
    'Month',
    'Deliveries',
    'GrossSalary',
    'NetSalary',
    'Taxes',
    'FoodSupportPayment',
    'BonusTotalPayment',
    'DeliveriesTotalPayment'
  ];

  /**
   * @constructor
   * @param {_workdaysService} _workdaysService
   * Represents the WorkdaysService used for fetching workday data.
   * @param {MAT_DIALOG_DATA} data
   * Represents the data injected into the modal, containing the employee object.
   * @param {_matDialogRef} _matDialogRef
   * Represents the MatDialogRef used for controlling the modal.
   */
  constructor(
    private _workdaysService: WorkdaysService,
    @Inject(MAT_DIALOG_DATA) data: { employee: Employee },
    public _matDialogRef: MatDialogRef<WorkdayModalComponent>,
    private _matDialog: MatDialog
  ) {
    this.employee = data.employee;
    this.months = DateUtils.Months;
  }

  /**
   * Angular lifecycle hook for component initialization.
   * @override
   */
  ngOnInit(): void {
    this.buildWorkdaysTable();
  }

  /**
   * Builds the workdays table.
   * @method
   */
  public buildWorkdaysTable = () => {
    this.dataSource.sortingDataAccessor = (item, property) => {
      if (property === 'Year') {
        return item.Year;
      } else {
        return item.Year;
      }
    };
    this._workdaysService.getAllWorkdaysByEmployee(this.employee.ID).subscribe({
      next: (workdays: Array<Workday>) => {
        this.workdays = workdays
        this.filteredWorkdays = this.workdays;
        this.refreshTable();
      },
    });
  }

  /**
   * Refreshes the table with filtered workdays.
   * @method
   */
  public refreshTable = () => {
    this.dataSource = new MatTableDataSource<Workday>(this.filteredWorkdays);
    this.dataSource.filterPredicate = (
      data: Workday,
      filter: string
    ): boolean => {
      const dataStr = Object.keys(data)
        .reduce((currentTerm: string, key: string) => {
          return currentTerm + (data as { [key: string]: any })[key] + '◬';
        }, '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      const transformedFilter = filter
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();

      return dataStr.indexOf(transformedFilter) != -1;
    };
    this.dataSource.paginator = this.paginator ?? null;
    this.dataSource.sort = this.sort ?? null;
    this.loading = false;
  };

  /**
   * Opens a new workday modal for creating a new workday entry.
   * @method
   */
  public createNewWorkday = () => {
    this._matDialog
      .open(NewWorkdayModalComponent, {
        data: { employee: this.employee },
        disableClose: false,
        maxWidth: 1000,
      })
      .afterClosed()
      .subscribe({
        next: () => {
          //console.log('closed');
          this.buildWorkdaysTable();
        },
      });
  };

  /**
   * Returns the name of the month based on the monthId.
   * @method
   * @param monthId The monthId for which to get the month name.
   * @returns The name of the month.
   */
  public getMonth = (monthId: number) => {
    return this.months.find((month) => month.id === monthId)?.name;
  };

  /**
   * Closes the current modal dialog.
   * @method
   */
  public closeThis = () => {
    this._matDialogRef.close();
  };
}
