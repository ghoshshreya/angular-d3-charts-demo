import { Component, OnInit, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import * as d3Bullet from 'd3v4-bullet';

@Component({
  selector: 'bullet-chart',
  templateUrl: './bullet-chart.component.html',
  styleUrls: ['./bullet-chart.component.css']
})
export class BulletChartComponent implements OnInit {

  constructor(public container: ElementRef) {}

  public margin = {top: 5, right: 40, bottom: 20, left: 120};
  width = 960 - this.margin.left - this.margin.right;
  height = 50 - this.margin.top - this.margin.bottom;

  public chart = d3Bullet.bullet()
  .width(this.width)
  .height(this.height);

  public data = [
    {"title":"Revenue","subtitle":"US$, in thousands","ranges":[150,225,300],"measures":[220,270],"markers":[250]},
    {"title":"Profit","subtitle":"%","ranges":[20,25,30],"measures":[21,23],"markers":[26]},
    {"title":"Order Size","subtitle":"US$, average","ranges":[350,500,600],"measures":[100,320],"markers":[550]},
    {"title":"New Customers","subtitle":"count","ranges":[1400,2000,2500],"measures":[1000,1650],"markers":[2100]},
    {"title":"Satisfaction","subtitle":"out of 5","ranges":[3.5,4.25,5],"measures":[3.2,4.7],"markers":[4.4]}
  ]

  ngOnInit() {
    this.renderChart();
  }
 
  renderChart() {
    var svg = d3.select(this.container.nativeElement).selectAll("svg")
      .data(this.data)
      .enter().append("svg")
        .attr("class", "bullet")
        .attr("width", this.width + this.margin.left + this.margin.right)
        .attr("height", this.height + this.margin.top + this.margin.bottom)
      .append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")")
        .call(this.chart);

    var title = svg.append("g")
        .style("text-anchor", "end")
        .attr("transform", "translate(-6," + this.height / 2 + ")");

    title.append("text")
        .attr("class", "title")
        .text(function(d) { return d.title; });

    title.append("text")
        .attr("class", "subtitle")
        .attr("dy", "1em")
        .text(function(d) { return d.subtitle; });
  }
}