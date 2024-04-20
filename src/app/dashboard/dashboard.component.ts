import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import * as Highcharts from 'highcharts';
import { WebsiteComponent } from '../website/website.component';
import { HighchartsChartModule } from 'highcharts-angular';
import HC_more from 'highcharts/highcharts-more';
import HC_exporting from 'highcharts/modules/exporting';
import HighchartsExportData from 'highcharts/modules/export-data';
import { CommonModule } from '@angular/common';
HC_more(Highcharts);
HC_exporting(Highcharts);
HighchartsExportData(Highcharts);
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [HighchartsChartModule, CommonModule]
})
export class DashboardComponent implements AfterViewInit {
  Highcharts: typeof Highcharts = Highcharts;
  updateFlag = false;
  data_sales: any = [];
  data_customer: any = [];
  data_salespercustomer: any = [];
  chartOptions_sales!: Highcharts.Options;
  chartOptions_customer!: Highcharts.Options;
  chartOptions_salespercustomer!: Highcharts.Options;
  chartOptions_newsletter!: Highcharts.Options;
  constructor(private firestore: AngularFirestore, private site: WebsiteComponent) { this.userId = this.site.test; }
  allUsers = [];
  userId: any;
  newsletter: any;
  lastNewsletterSend: any = [];
  activated: boolean = false;
  message: any = '';
  parser = new DOMParser();
  ngAfterViewInit() {
    this.firestore.collection('customer')
      .valueChanges({ idField: 'customIdName' })
      .subscribe((changes: any) => this.initDashboard(changes));

    this.firestore.collection('newsletter').valueChanges({ idField: 'customIdName' })
    .subscribe((changes: any) => this.initNewsletter(changes));
  }

  initDashboard(changes: any) {
    this.allUsers = changes;
    if (this.allUsers.length > 0) this.generateCharts()
  }

  initNewsletter(changes: any) {
    this.newsletter = changes;
    let lastNewsletter: any = new Date('24 September 2017').getTime();
    this.newsletter.forEach((n: any) => {
      let testime = n.date.split(',')[0];
      testime = testime.replaceAll('.', ' ');
      testime = testime.split(' ');
      testime = testime[0] + ' ' + testime[1].replace(8, 'August') + ' ' +testime[2];
      testime = new Date(testime).getTime();

      if ( testime > lastNewsletter) {
        lastNewsletter = testime;
        this.lastNewsletterSend = n;
      }
    });
    document.getElementById('messageI')!.innerHTML = this.lastNewsletterSend.message;
  }

  generateCharts() {
    this.getTotals();
    this.getCustomer();
    this.getSalesperCustomer();
    this.activated = true;
  }

  addSalesPerMonth() {
    let january23 = 0;
    let feb23 = 0;
    let mar23 = 0;
    let apr23 = 0;
    let may23 = 0;
    let jun23 = 0;
    let jul23 = 0;
    let aug23 = 0;
    let sep23 = 0;
    let oct23 = 0;
    let nov23 = 0;
    let dec23 = 0;
    this.allUsers.forEach((user: any) => {
      if (user.invoices) {
        user.invoices.forEach((invoice: any) => {
          user.invoices[0].date.split('.')[1] == '1' && invoice.date.split('.')[2] == '2023' ? january23 += invoice.price : january23;
          user.invoices[0].date.split('.')[1] == '2' && invoice.date.split('.')[2] == '2023' ? feb23 += invoice.price : feb23;
          user.invoices[0].date.split('.')[1] == '3' && invoice.date.split('.')[2] == '2023' ? mar23 += invoice.price : mar23;
          user.invoices[0].date.split('.')[1] == '4' && invoice.date.split('.')[2] == '2023' ? apr23 += invoice.price : apr23;
          user.invoices[0].date.split('.')[1] == '5' && invoice.date.split('.')[2] == '2023' ? may23 += invoice.price : may23;
          user.invoices[0].date.split('.')[1] == '6' && invoice.date.split('.')[2] == '2023' ? jun23 += invoice.price : jun23;
          user.invoices[0].date.split('.')[1] == '7' && invoice.date.split('.')[2] == '2023' ? jul23 += invoice.price : jul23;
          user.invoices[0].date.split('.')[1] == '8' && invoice.date.split('.')[2] == '2023' ? aug23 += invoice.price : aug23;
          user.invoices[0].date.split('.')[1] == '9' && invoice.date.split('.')[2] == '2023' ? sep23 += invoice.price : sep23;
          user.invoices[0].date.split('.')[1] == '10' && invoice.date.split('.')[2] == '2023' ? oct23 += invoice.price : oct23;
          user.invoices[0].date.split('.')[1] == '11' && invoice.date.split('.')[2] == '2023' ? nov23 += invoice.price : nov23;
          user.invoices[0].date.split('.')[1] == '12' && invoice.date.split('.')[2] == '2023' ? dec23 += invoice.price : dec23;
        });
      }
    });
    this.data_sales.push(january23, feb23, mar23, apr23, may23, jun23, jul23, aug23, sep23, oct23, nov23, dec23);
  }

  getTotals() {
    this.addSalesPerMonth();
    this.chartOptions_sales = {
      chart: {
        type: 'column',
        backgroundColor: '#d1d2d3',
        borderRadius: 10,
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true,
        accessibility: {
          description: 'Years'
        },
        lineColor: '#ec5020c9',
      },
      yAxis: {
        min: 0,
        title: {
          text: '€'
        },
        gridLineColor: '#ec5020c9',

      },
      tooltip: {
        valueSuffix: ' '
      },
      plotOptions: {
        column: {
          pointPadding: 0.3,
          borderWidth: 0
        }
      },
      title: {
        text: 'Sales volume 2023'
      },
      credits: {
        enabled: false
      },
      navigation: {
        buttonOptions: {
          enabled: true,
          theme: {
            fill: '#d1d2d3',
          },
        },
      },
      series: [
        {
          name: 'Sales Volume in €/month',
          data: this.data_sales,
          type: 'column',
        }
      ]
    };
  }

  getInvoices() {
    let sc2023 = 0;
    this.allUsers.forEach((user: any) => {
      if (user.invoices) {
        user.invoices.forEach((invoice: any) => sc2023 += invoice.price);
        this.data_salespercustomer.push({ 'name': user.company, 'y': sc2023 });
        sc2023 = 0;
      }
    });
  }

  getSalesperCustomer() {
    this.getInvoices();
    this.chartOptions_salespercustomer = {
      chart: {
        plotBorderWidth: 0,
        plotShadow: false,
        type: 'pie',
        backgroundColor: '#d1d2d3',
        borderRadius: 10,
      },

      tooltip: {
        valueSuffix: '€ '
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          shadow: false,

          dataLabels: {
            enabled: false,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              textOutline: '0 0 0px none',
            }
          },
          showInLegend: true,
        }
      },
      title: {
        text: 'Sales Volume/Customer'
      },
      credits: {
        enabled: false,
      },
      legend: {
        enabled: true,
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
        itemStyle: {
          color: '#000000',
          fontWeight: 'bold',
          fontSize: '12px',
          textOutline: '0 0 0px none',
        },
        labelFormat: '<span style="font-weight:bold">{name}</span> ({percentage:.1f} %)',
        itemMarginTop: 10,
        itemMarginBottom: 10,
        itemDistance: 10,
        symbolRadius: 0,
        symbolHeight: 10,
        symbolWidth: 10,
        symbolPadding: 5,
      },
      navigation: {
        buttonOptions: {
          enabled: true,
          theme: {
            fill: '#d1d2d3'
          }
        },
      },
      series: [{
        type: 'pie',
        name: 'Sales',
        data: this.data_salespercustomer,
      }],
    };

  }

  getNewCustomerMonth() {
    let january23 = 0;
    let feb23 = 0;
    let mar23 = 0;
    let apr23 = 0;
    let may23 = 0;
    let jun23 = 0;
    let jul23 = 0;
    let aug23 = 0;
    let sep23 = 0;
    let oct23 = 0;
    let nov23 = 0;
    let dec23 = 0;
    this.allUsers.forEach((user: any) => {
      user.notices[0].date.split('.')[1] == '1' ? january23++ : january23;
      user.notices[0].date.split('.')[1] == '2' ? feb23++ : feb23;
      user.notices[0].date.split('.')[1] == '3' ? mar23++ : mar23;
      user.notices[0].date.split('.')[1] == '4' ? apr23++ : apr23;
      user.notices[0].date.split('.')[1] == '5' ? may23++ : may23;
      user.notices[0].date.split('.')[1] == '6' ? jun23++ : jun23;
      user.notices[0].date.split('.')[1] == '7' ? jul23++ : jul23;
      user.notices[0].date.split('.')[1] == '8' ? aug23++ : aug23;
      user.notices[0].date.split('.')[1] == '9' ? sep23++ : sep23;
      user.notices[0].date.split('.')[1] == '10' ? oct23++ : oct23;
      user.notices[0].date.split('.')[1] == '11' ? nov23++ : nov23;
      user.notices[0].date.split('.')[1] == '21' ? dec23++ : dec23;
    });
    this.data_customer.push(january23, feb23, mar23, apr23, may23, jun23, jul23, aug23, sep23, oct23, nov23, dec23);
  }

  getCustomer() {
    this.getNewCustomerMonth();
    this.chartOptions_customer = {
      chart: {
        type: 'column',
        backgroundColor: '#d1d2d3',
        borderRadius: 10,
      },
      xAxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        crosshair: true,

        lineColor: '#ec5020c9',
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Customers'
        },
        gridLineColor: '#ec5020c9',
      },
      tooltip: {
        valueSuffix: ' '
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      title: {
        text: 'New customers 2023'
      },
      credits: {
        enabled: false
      },
      time: {
        timezone: 'America/New_York'
      },
      navigation: {
        buttonOptions: {
          enabled: true,
          theme: {
            fill: '#d1d2d3'
          }
        },
      },
      series: [
        {
          name: 'New customers/month',
          data: this.data_customer,
          type: 'column',
        }
      ]
    };
  }
}
