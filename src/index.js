'use strict';

import PouchDB from 'pouchdb';
var uuid = require('uuid');

export default class PouchConnector {
   constructor(opts){
      this.db = new PouchDB(opts.url, {
         auth: {
            username: opts.username,
            password: opts.password
         }
      });
   }

   getDataById(id){
      return this.db.get(id);
   }

   deleteDataById(id){
      return this.db.remove(id);
   }

   saveDataById(id, data){
      var d = Object.assign({}, {_id: id}, data);
      return this.db.put(d);
   }

   getAll(){
      return this.db.allDocs({include_docs:true, attachments: true});
   }

   getDataByModel(model_id){
      return this.getAll().then((data) => {
         return data.rows.filter((x) => {
            if(x.doc.type === model_id){
               return x;
            }
         }).map((x) => x.doc);
      });
   }

   createDataByModel(model_id, data){
      var d = Object.assign({}, {_id: uuid.v4(), type: model_id}, data);
      return this.db.put(d);
   }
}
