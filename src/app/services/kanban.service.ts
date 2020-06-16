import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bucket } from '../models/bucket.model';

@Injectable({
  providedIn: 'root'
})
export class KanbanService {

  constructor(private http: HttpClient) { }

  // funcao para listagem dos buckets
  listTodo(): Observable<Bucket[]>{
    return this.http.get<Bucket[]>('https://crudcrud.com/api/acafadfff7f94fe58611b3411e2afa1b/buckets');
  }

  // funcao para adicionar novos buckets
  addTodo(bucket: Bucket): Observable<Bucket>{
    return this.http.post<Bucket>('https://crudcrud.com/api/acafadfff7f94fe58611b3411e2afa1b/buckets', bucket);
  }

  // funcao para atualizar os buckets
  updateTodo(bucket: Bucket): Observable<any>{
    const id = bucket._id;
    delete bucket._id;

    return this.http.put('https://crudcrud.com/api/acafadfff7f94fe58611b3411e2afa1b/buckets/' + id, bucket);
  }

  // funcao para deletar os buckets
  deleteTodo(id: string): Observable<any> {
    return this.http.delete('https://crudcrud.com/api/acafadfff7f94fe58611b3411e2afa1b/buckets/' + id);
  }
}
