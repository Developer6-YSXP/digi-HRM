import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OnboardingService {

  private apiUrl ='https://your-api-url.com/schedule-appointment';

  constructor(private http: HttpClient) { }
  
  scheduleAppointment(appointmentData: any){
    return this.http.get(this.apiUrl, appointmentData)
  }
}
