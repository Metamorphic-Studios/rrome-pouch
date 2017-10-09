'use strict';

var PouchDB = require('pouchdb');

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

   getDataByModel(model_id){
      return this.db.allDocs().then((data) => {
         return data.filter((x) => {
            if(x.type === model_id){
               return x;
            }
         });
      });
   }
}
