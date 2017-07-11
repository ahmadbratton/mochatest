const assert = require('assert');
const mongoose = require('mongoose');
const config = require("../config")[process.env.NODE_ENV || 'test'];
const app = require("../main.js");
const request = require("supertest");
const items = require("../models/items");
const routes = require('../routes/routes');

before("connect to mongo", function (done) {
 mongoose.connect(config.mongoURL).then(done)
});

after("drop database" , function (done) {
  mongoose.connection.dropDatabase(done)
});

describe("item", function () {

    it("can be created, fuck mocha!", function (done) {
        items.create({
          status: "fail",
          data: [
            {
              id: 1,
              description: "butter finger",
              cost: 50,
              quantity: 7,
              money_given:50,
              money_required:50
            }
          ]
        }, function (err, item) {
            if (err) {
                done(err)
            } else {
                assert(item);
                assert(items.find(item));
                done();
            }
        });
    });
    it("item found, fuck testing!",function (done) {
      items.find({}, function (err, item) {
        if (err) {
          done(err)
        }else {
          assert(item);
          done();
        }
      });
    });
    it("can buy items, fuck testing!", function (done) {
      request(app)
        .post("/api/customer/items/:itemId/purchases")
        .expect("Content-Type", "application/json; charset=utf-8")
        .expect(200)
        .expect(function (req) {
          assert.equal(req.body.money_given)
        })
        .end(done)

    })
//     it("can give back change", function (done) {
//       request(app)
//         .get("/api/vendor/purchases")
//         .expect("Content-Type", "application/json; charset=utf-8")
//         .expect(200)
//         .expect(function (res) {
//         assert.equal(res.body.change)
//     })
//
//
//
//
});
