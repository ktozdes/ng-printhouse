import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpEventType,
  HttpEvent
} from '@angular/common/http';

import { UploadOutput, UploadInput, UploadFile, humanizeBytes, UploaderOptions, UploadStatus } from 'ngx-uploader';


import { map, tap, last } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploaderService {
  public progressSource = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {}
  
  upload(file: any) {

    return this.http.post(`${environment.backendUrl}/file/upload`, {file} ).pipe(
      map(event => {
        console.log('event:');
        //this.getEventMessage(event, file);
      }),
      //tap((envelope: any) => this.processProgress(envelope)),
      //last()
    );

    // const req = new HttpRequest(
    //   'POST',
    //   'http://localhost:5000/upload',
    //   formData,
    //   {
    //     reportProgress: true
    //   }
    // );

    // return this.http.request(req).pipe(
    //   map(event => this.getEventMessage(event, file)),
    //   tap((envelope: any) => this.processProgress(envelope)),
    //   last()
    // );
  }

  processProgress(envelope: any): void {
    if (typeof envelope === 'number') {
      this.progressSource.next(envelope);
    }
  }

  private getEventMessage(event: HttpEvent<any>, file: File) {
    switch (event.type) {
      case HttpEventType.Sent:
        return `Uploading file "${file.name}" of size ${file.size}.`;
      case HttpEventType.UploadProgress:
        return Math.round((100 * event.loaded) / event.total);
      case HttpEventType.Response:
        return `File "${file.name}" was completely uploaded!`;
      default:
        return `File "${file.name}" surprising upload event: ${event.type}.`;
    }
  }
}