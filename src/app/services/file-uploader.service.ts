import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, tap, last, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, empty } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  public progressSource = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient,
              private messageService: MessageService
    ) {}

  deleteFile(fileID: number, orderID?: number): Observable<any> {
    return this.http.post(`${environment.backendUrl}/file/destroy`, {id: fileID, orderID})
    .pipe(
      map((response: any) => {
        this.messageService.setMessage({message: response.message, messageType: response.status});
        return true;
      }),
      catchError((err, caught) => {
        this.messageService.setMessage({message: err.error.message, messageType: err.error.status});
        return empty();
      })
    );
  }
  downloadFile(url): any {
    
  }
}
