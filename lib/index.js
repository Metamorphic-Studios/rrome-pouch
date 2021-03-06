'use strict';

exports.__esModule = true;
exports.default = undefined;

var _pouchdb = require('pouchdb');

var _pouchdb2 = _interopRequireDefault(_pouchdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var uuid = require('uuid');

var PouchConnector = function () {
   function PouchConnector(opts) {
      _classCallCheck(this, PouchConnector);

      this.db = new _pouchdb2.default(opts.url, {
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

   PouchConnector.prototype.getAll = function getAll() {
      return this.db.allDocs({ include_docs: true, attachments: true });
   };

   PouchConnector.prototype.getDataByModel = function getDataByModel(model_id) {
      return this.getAll().then(function (data) {
         return data.rows.filter(function (x) {
            if (x.doc.type === model_id) {
               return x;
            }
         }).map(function (x) {
            return x.doc;
         });
      });
   };

   PouchConnector.prototype.createDataByModel = function createDataByModel(model_id, data) {
      var d = Object.assign({}, { _id: uuid.v4(), type: model_id }, data);
      return this.db.put(d);
   };

   return PouchConnector;
}();

exports.default = PouchConnector;
module.exports = exports['default'];