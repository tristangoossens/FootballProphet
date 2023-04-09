import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prediction, User } from '@footballprophet/domain';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class PredictionService {
    constructor(private http: HttpClient) { }

    public CreatePrediction(prediction: Prediction): Observable<User> {
        return this.http
            .post(`${environment.api_url}/users/predictions`, prediction, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
            .pipe(
                map((resp: any) => {
                    return resp.data;
                }
                )
            );
    }
}
