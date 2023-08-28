import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormTODO, TODO ,TODOResponse, USER} from '../model/model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit{
  todos :TODO[] =[];
  isLoading = false;
  label:string='';
  done:boolean = false;
  date:Date = new Date();
  name:string ="";

  private RefreshTodo(){
    this.isLoading = true;
    this.userservice.getTodo().subscribe((todo) => {
      this.todos = [];
      todo.forEach(t => {
        if(t.user===this.name){this.todos.push(t);}
      });
      this.isLoading = false
    });}
  
  gotologin(){
    this.router.navigate(['HOME/LOGIN']);
  }
  gotosignup(){
    this.router.navigate(['HOME/SIGN_UP']);
  }
  deleteTask(id:number){
    this.userservice.DeleteTask(id).subscribe(
      (resp)=>{
        if(resp){
          this.RefreshTodo();
        }
        else{
          alert("Erreur server");
        }
      }
  );}
    

  updateTask(todo:TODO){
    console.log("on est dans update task pere ")
    this.userservice.updateTask(todo).subscribe(
      (update)=>{
        if(update){
          this.ngOnInit();
        }else{
          alert("ERROR SERVER")
        }
      }
    );
  }
  
  emitSignFormValue(task : FormTODO){
    this.userservice.createTodo(task.label,false,task.date,this.name).subscribe(
      (created) => {
        if(created){
          this.ngOnInit();
        } else{
          alert('Error server')
        }
      }
    );
  }
  constructor(private route: ActivatedRoute,private router:Router ,protected userservice : UserService) {}
  
  verificationnameurl(name:string):boolean{
    let user :USER[]=  [];
    this.userservice.getUser().subscribe((users)=> {
      for(let i =0 ; i<users.length;i++){
        user.push(users[i]);
      }
    });
    for(let i=0;i<user.length;i++){
      if(user[i].name=== name){
        return true;
      }
    }
    return false;
  };

  
  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    if(this.verificationnameurl(this.name)===false){
      this.router.navigate(["**"]);
    }
    this.RefreshTodo()
  }
  
}

