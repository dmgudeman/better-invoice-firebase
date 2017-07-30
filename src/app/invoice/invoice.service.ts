import { Injectable }       from '@angular/core';
import {
  Http,
  Response,
  Headers,
  RequestOptions
}                           from '@angular/http';
// 3rd Party
import { Observable }       from 'rxjs/Observable';
import 'rxjs/add/operator/map';
// Custom
import { Company }          from '../company/company';
import { Invoice }          from './invoice';
import { Item }             from '../item/item';
import { Shared }           from '../shared/shared';

@Injectable()
export class InvoiceService {

  invoice: Invoice;
  items: Item[];
  shared: Shared;
  errorMessage: string;

  private _url;

  constructor(private _http: Http) {
          this.shared = new Shared();
  }
  head = `<!doctype html>
  <html>
  <head>
      <meta charset="utf-8">
      <title>A simple, clean, and responsive HTML invoice template</title>
      <style>
      .invoice-box{
          max-width:800px;
          margin:auto;
          padding:30px;
          /* border:1px solid #eee;
          box-shadow:0 0 10px rgba(0, 0, 0, .15); */
          font-size:16px;
          line-height:24px;
          font-family:'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
          color:#555;
      }
      
      .invoice-box table{
          width:100%;
          line-height:inherit;
          text-align:left;
      }
      
      .invoice-box table td{
          padding:5px;
          vertical-align:top;
      }

      
      .invoice-box table tr td:nth-child(1){
          text-align:left;
      
      }
      .invoice-box table tr td:nth-child(2){
          text-align:center;
      }
      .invoice-box table tr td:nth-child(3){
          text-align:right;
      }
      
      .invoice-box table tr.top table td{
          padding-bottom:20px;
      }
      
      .invoice-box table tr.top table td.title{
          font-size:45px;
          line-height:45px;
          color:#333;
      }
      
      .invoice-box table tr.information table td{
          padding-bottom:40px;
      }
      
      .invoice-box table tr.heading td{
          background:#eee;
          border-bottom:1px solid #ddd;
          font-weight:bold;
      }
      
      .invoice-box table tr.details td{
          padding-bottom:20px;
      }
      
      .invoice-box table tr.item td{
          border-bottom:1px solid #eee;
      }
      
      .invoice-box table tr.item.last td{
          border-bottom:none;
      }
      
      .invoice-box table tr.total td:nth-child(2){
          border-top:2px solid #eee;
          font-weight:bold;
      }
      .item:nth-of-type(even){
          background-color: rgba(238, 238, 238, 0.5);
      }
      .row1 {
          display: flex;
          flex-direction: row;
          min-width: 800px;
      }
      .col1 {
          display: flex;
          flex: 1 1 0;
      }
      .col1.col1-mid {
          flex: 3 3 0;
      }
      
      /*@media only screen and (max-width: 600px) {
          .invoice-box table tr.top table td{
              width:100%;
              display:block;
              text-align:center;
          }
          
          .invoice-box table tr.information table td{
              width:100%;
              display:block;
              text-align:center;
          }
      }*/
  /*==============SMALLER SCREENS=======================*/
  /*--------------SMALL SCREEN--------------------------*/
  @media (max-width: 766px) {
      #col1,
      #col2,
      #col4, 
      .myCol {
          display: none
      }

      #header {
          display: flex;
          position: fixed;
          font-size:130%;
          font-weight:strong;
          left: 0px;
          top: 0px;
          height:8%;
          width: 100%;
          background-color: white;
          flex-direction: column;
          justify-content: center;
          z-index: 3;
      }

      /*.ni-description {
          width: 100%;
          height: 270px;
          resize: none;
          box-sizing: border-box;
          border-radius: 4px;
          background-color: #fff;
          font-size: 90%;
          font-weight: 300;
          color: black;
      }*/
      #footer {
          display: flex;
          position: fixed;
          padding-top: 4%;
          left: 0px;
          bottom: 0px;
          height: 10%;
          width: 100%;
          background-color: #34495e;
          color: #f2f2f2;
          z-index: 2;
          justify-content: center;
          text-align: center;
      }

  }
  /*--------------MEDIUM SCREEN-------------------------*/
  /*@media (min-width: 416px) and (max-width: 1025px) {
      #col1,
      .myCol {
          display: none
      }
    .myCol {
          font-size: 90%;
          max-width: 150px;
          box-sizing: border-box;
          border-radius: 4px;
          border: transparent 0px;
          background-color: #34495e;
          color: #f2f2f2;
          margin: 15px;
          line-height: 2.0;
      }
      .ni-description {
          width: 100%;
          height: 300px;
          resize: none;
          box-sizing: border-box;
          border-radius: 4px;
          background-color: #fff;
          font-size: 90%;
          font-weight: 300;
          color: black;
      }
  }*/

  /*--------------LARGE SCREEN--------------------------*/
  /*screen-lg corresponds with col-lg*/
  @media (min-width: 767px) {
      /*header,
      footer {
          display: none;
      }*/
      
      /*.ni-description {
          width: 100%;
          height: 300px;
          resize: none;
          box-sizing: border-box;
          border-radius: 4px;
          background-color: #fff;
          font-size: 90%;
          font-weight: 300;
          color: black;
      }*/
  }
      </style>
      </head>
      <body>`
            
  tail = `  </body
            </html>          
        `
    

  addPdf(payload) {
    let augmented  = this.head + payload + this.tail;
      return augmented; 
  }
}