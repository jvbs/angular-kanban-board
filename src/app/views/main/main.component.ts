import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Bucket } from 'src/app/models/bucket.model';
import { KanbanService } from 'src/app/services/kanban.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  // variaveis
  buckets: Bucket[];
  selectedTodo: Bucket;
  createMode = false;
  editMode = false;
  todo = [];
  doing = [];
  done = [];

  //iniciando o service do kanban
  constructor(private kanbanService: KanbanService) { }

  // funcoes que executam no inicio do componente
  ngOnInit(): void {
    this.list()
  }

  // criando nova tarefa
  newTodo(){
    this.createMode = true;
    this.editMode = false;
    this.selectedTodo = new Bucket();
  }

  // alternatando modo de edicao/criacao
  changeMode(mode: string){
    switch (mode) {
      case 'edit':
        this.editMode = !this.editMode;
        break;

      case 'create':
        this.createMode = !this.createMode;
        break;
    }
  }

  // resetando selectedsTodos
  resetSelectedTodo(){
    this.selectedTodo.name = null
    this.selectedTodo.bucket = null
  }

  // listagem
  list(){
    this.kanbanService.listTodo().subscribe(buckets => {
      this.buckets = buckets;
      this.todo = buckets.filter(i => i.bucket === 'To Do');
      this.doing = buckets.filter(i => i.bucket === 'Doing');
      this.done = buckets.filter(i => i.bucket === 'Done');
    });
  }

  // seleciona bucket
  selected(bucket: Bucket){
    this.editMode = true;
    this.createMode = false;
    this.selectedTodo = bucket;
  }

  // remove bucket
  remove(id: string){
    this.kanbanService.deleteTodo(id).subscribe(() => {
      this.list();
      alert('Removido com sucesso');
    });
  }

  // salvar alteraçoes/criação
  save(){
    // console.log('acionado')
    if(this.createMode){
      if(this.selectedTodo.name == null || this.selectedTodo.bucket == null){
        alert('Favor preencher todos os campos!');
      } else {
        // console.log(this.selectedTodo)
        this.kanbanService.addTodo(this.selectedTodo).subscribe(() => {
          this.list();
          this.createMode = false;
          alert('Tarefa adicionada!');
          this.resetSelectedTodo()
        })
      }
    } else {
      this.kanbanService.updateTodo(this.selectedTodo).subscribe(() => {
        this.list();
        this.editMode = false;
        alert('Tarefa atualizada!');
        this.resetSelectedTodo()
      })
    }
  }

  // manipulando o drag and drop
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

}
