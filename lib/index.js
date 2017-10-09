'use strict';

exports.__esModule = true;
exports.default = undefined;

var _pouchdb = require('pouchdb');

var _pouchdb2 = _interopRequireDefault(_pouchdb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

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

exports.default = PouchConnector;
module.exports = exports['default'];