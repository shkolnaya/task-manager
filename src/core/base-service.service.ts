import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { GetResult } from "./interfaces/get-result.interface";

export class BaseService {
    constructor(private httpClient: HttpClient) {
    }

    private apiUrl: string = environment.apiEndoint;
 
    
    protected get<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(`${this.apiUrl}/${url}`);
    }

    protected getRecords<T>(url: string, body: any = null): Observable<T> {
        return this.httpClient.post<T>(`${this.apiUrl}/${url}`, body);
    }

    protected post<T>(url:string, body: any):Observable<T> {
        return this.httpClient.post<T>(`${this.apiUrl}/${url}`, body)
    }

    protected put<T>(url:string, body: any):Observable<T> {
        return this.httpClient.put<T>(`${this.apiUrl}/${url}`, body)
    }

    protected delete<T>(url:string): Observable<T> {
        return this.httpClient.delete<T>(`${this.apiUrl}/${url}`);
    }

}
