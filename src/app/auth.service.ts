import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  base_url1 = "https://localhost:44383/api/";
  base_url = "https://biz1pos.azurewebsites.net/api/";

  constructor(private http: HttpClient) { }

  getissues() {
    return this.http.get(this.base_url1 + "Issue/GetIssues");
  }
  GetCompany() {
    return this.http.get(this.base_url1 + "Company/GetAll");
  }
  GetUPCompanies() {
    return this.http.get(this.base_url1 + "Company/GetUPCompanies")
  }


  ///////////////////URBAN PIPER///////////////////////////
  getmerchants() {
    return this.http.get("https://gamma-server.urbanpiper.com/partners/82/merchants/?offset=0&limit=10&current_state=&search=&ordering=-current_units_count", {
      headers: new HttpHeaders({
        'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo4NSwidXNlcm5hbWUiOiJrYXJ0aGlrK2JpejFib29rIiwiZXhwIjoxNjA2ODQ2MTA5LCJlbWFpbCI6ImFkbWluQGJpejFib29rLmNvbSIsIm9yaWdfaWF0IjoxNjA2MjQxMzA5LCJpc19zdGFmZiI6ZmFsc2UsImZpcnN0X25hbWUiOiJLYXJ0aGlrIiwibGFzdF9uYW1lIjoiIiwicGVybWlzc2lvbnMiOlsiY2FuX2NyZWF0ZV9waXBlbGluZSIsImNhbl91cGRhdGVfZmVhdHVyZV9zdGF0ZSIsImNhbl92aWV3X2ludm9pY2UiXSwicGFydG5lcl9zdGF0ZXMiOlt7ImlkIjoxLCJuYW1lIjoibmV3IiwiY29sb3IiOiJibHVlIn0seyJpZCI6MiwibmFtZSI6InVuZGVyLWRldiIsImNvbG9yIjoiY3lhbiJ9LHsiaWQiOjMsIm5hbWUiOiJvbi1ob2xkIiwiY29sb3IiOiJvcmFuZ2UifSx7ImlkIjo0LCJuYW1lIjoiYWN0aXZlIiwiY29sb3IiOiJncmVlbiJ9LHsiaWQiOjUsIm5hbWUiOiJjaHVybmVkIiwiY29sb3IiOiJyZWQifV0sImZlYXR1cmVfc3RhdGVzIjpbeyJpZCI6MSwibmFtZSI6Im5ldyIsImNvbG9yIjoiYmx1ZSJ9LHsiaWQiOjIsIm5hbWUiOiJpbi1wcm9ncmVzcyIsImNvbG9yIjoiY3lhbiJ9LHsiaWQiOjMsIm5hbWUiOiJ0by1iZS12ZXJpZmllZCIsImNvbG9yIjoib3JhbmdlIn0seyJpZCI6NCwibmFtZSI6ImNvbXBsZXRlZCIsImNvbG9yIjoiZ3JlZW4ifV0sIm1lcmNoYW50X3N0YXRlcyI6W3siaWQiOjEsIm5hbWUiOiJuZXciLCJjb2xvciI6ImJsdWUifSx7ImlkIjoyLCJuYW1lIjoiYWN0aXZlIiwiY29sb3IiOiJncmVlbiJ9LHsiaWQiOjMsIm5hbWUiOiJjaHVybmVkIiwiY29sb3IiOiJyZWQifSx7ImlkIjo0LCJuYW1lIjoibWlncmF0ZWQiLCJjb2xvciI6IiJ9XSwicGxhdGZvcm1zIjpbInpvbWF0byIsInN3aWdneSIsImR1bnpvIiwidWJlcmVhdHMiLCJ6b21hdG9tYXJrZXQiLCJzd2lnZ3lzdG9yZSIsImRvdHBlIl0sInBvc19wbGF0Zm9ybXMiOlsiZGVza3RvcCIsIndlYiIsImFwcCJdLCJxdWlja2Jvb2tzX2F1dGgiOmZhbHNlLCJjdXJyZW5jeSI6IklOUiJ9.1PSZ7iw3OE_ZEDuEIgM1T-sSYq4f4RMmunAj73bYPG8'
      })
    });
  }
  getmerchant(bizid) {
    return this.http.get(this.base_url + "Company/getbybizid?bizid=" + bizid);
  }
  savemerchant(payload){
    return this.http.post(this.base_url + 'Company/savemerchant', payload);
  }
  getwebhooks(apikey) {
    return this.http.get("https://api.urbanpiper.com/external/api/v1/webhooks/", {
      headers: new HttpHeaders({
        'Authorization': "apikey "+apikey
      })
    })
  }
  addwebhook(payload,apikey) {
    return this.http.post(`https://api.urbanpiper.com/external/api/v1/webhooks/`, payload, {
      headers: new HttpHeaders({
        'Authorization': "apikey "+apikey
      })
    })
  }
  updatewebhook(webhook_id,payload,apikey) {
    return this.http.put(`https://api.urbanpiper.com/external/api/v1/webhooks/${webhook_id}`,payload, {
      headers: new HttpHeaders({
        'Authorization': "apikey "+apikey
      })
    })
  }
}