'use strict';

import PouchDB from 'pouchdb';

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
      return this.db.allDocs();
   }

   getDataByModel(model_id){
      return this.getAll().then((data) => {
         return data.rows.filter((x) => {
            if(x.type === model_id){
               return x;
            }
         });
      });
   }
}
