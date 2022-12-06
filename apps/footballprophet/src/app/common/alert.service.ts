import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

export class AlertService {
  static alertSuccess(message: string): void {
    Swal.fire({
      title: 'Gelukt!',
      text: message,
      icon: 'success',
      confirmButtonColor: '#001E28',
      confirmButtonText: 'OK',
    });
  }

  static alertError(message: string): void {
    Swal.fire({
      title: 'Oeps!',
      text: message,
      icon: 'error',
      confirmButtonText: 'OK',
      confirmButtonColor: '#FF0000',
    });
  }
}