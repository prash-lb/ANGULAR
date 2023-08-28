import { Component, EventEmitter , Output } from '@angular/core';
import { TODO } from '../model/model';
import { TASK } from '../mock-task';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  Tache:TODO[]=TASK;
  label:string='';
  date:string = '';
  user:string ="exemple";
  id:number = 3;

  ngOnInit() {}

  emitFormValue() {
    console.log(this.label);
    this.Tache.push({
      id:this.id,
      label: this.label,
      done:false,
      date :  new Date(this.date),
      user : this.user
    })
    this.id ++;
    alert("new task added")
    

  }

  raiseTaskAcomplied(task :TODO){
    task.done = ! task.done;
    console.log(    this.Tache.splice(task.id)
    );
    delete this.Tache[task.id];
    this.Tache.push({
      id:this.id,
      label : task.label,
      done:task.done,
      date:task.date,
      user:task.user
    })
    this.id++;
  }
}
