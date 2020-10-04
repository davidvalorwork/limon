import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js'

const ELEMENT_DATA= [
  {position: "David Valor", name: 'Colchon', weight: "27/08/2020",  symbol: '100',telefono:'+5615848514',estado:"Pendiente"},
  {position: "Enrique Nieves", name: 'Xiaomi Redmi', weight: "27/08/2020", symbol: '100',telefono:'+5615848514',estado:"Pendiente"},
];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  public doughnutChartLabels = ['Sales Q1', 'Sales Q2', 'Sales Q3', 'Sales Q4'];
  public doughnutChartData = [120, 150, 180, 90];
  public doughnutChartType = 'doughnut';
    constructor(){}
    ngOnInit(){}
    displayedColumns: string[] = ['position', 'name', 'weight', 'symbol','telefono','estado','options'];
    dataSource = ELEMENT_DATA;
}
