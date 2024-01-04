import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {lastValueFrom, Observable} from "rxjs";
import {Router} from "@angular/router";

//class User {} //pas convaincu nn plus

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  constructor(private http: HttpClient,private router: Router) {}

  displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource= []; //pas convaincu c pas comme l'énoncé mais sinon ça avait pas l'air de marcher (enft si jsp pk)

  ngOnInit(): void {
    const request: Observable<any> = this.http.get(
      'http://localhost:3000/users',
      { observe: 'response' },
    );
    request.subscribe({
      next: (response) => (this.dataSource = response.body,console.log(this.dataSource)),
});
  }

  idRedirect(id:number ): void{
    this.router.navigateByUrl("/users/"+id);

  }
}

