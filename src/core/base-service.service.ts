import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

export class BaseService {
    constructor(private httpClient: HttpClient) {
    }

    private apiUrl: string = environment.apiEndoint;
 
    
    protected get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(`${this.apiUrl}/${url}`);
    }


    protected post<T>(url:string, body: any):Observable<T> {
        return this.httpClient.post<T>(`${this.apiUrl}/${url}`, body)
    }

}
