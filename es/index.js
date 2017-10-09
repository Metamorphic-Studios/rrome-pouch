'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PouchDB = require('pouchdb');

var PouchConnector = function () {
   function PouchConnector(opts) {
      _classCallCheck(this, PouchConnector);

      this.db = new PouchDB(opts.url, {
         auth: {
            username: opts.username,
            password: opts.password
         }
      });
   }

   PouchConnector.prototype.getDataById = function getDataById(id) {
      return this.db.get(id);
   };

   PouchConnector.prototype.deleteDataById = function deleteDataById(id) {
      return this.db.remove(id);
   };

   PouchConnector.prototype.saveDataById = function saveDataById(id, data) {
      var d = Object.assign({}, { _id: id }, data);
      return this.db.put(d);
   };

   PouchConnector.prototype.getDataByModel = function getDataByModel(model_id) {
      return this.db.allDocs().then(function (data) {
         return data.filter(function (x) {
            if (x.type === model_id) {
               return x;
            }
         });
      });
   };

   return PouchConnector;
}();

export { PouchConnector as default };