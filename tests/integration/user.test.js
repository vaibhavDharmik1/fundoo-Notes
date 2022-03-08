import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';

describe('User APIs Test', () => {
  before((done) => {
    const clearCollections = () => {
      for (const collection in mongoose.connection.collections) {
        mongoose.connection.collections[collection].deleteOne(() => {});
      }
    };

    const mongooseConnect = async () => {
      await mongoose.connect(process.env.DATABASE_TEST);
      clearCollections();
    };

    if (mongoose.connection.readyState === 0) {
      mongooseConnect();
    } else {
      clearCollections();
    }

    done();
  });

  describe(`POST/userregister`, () => {
    it('User Registration', (done) => {
      const details = {
        firstname: 'Ayush',
        lastname: 'Dharmik',
        emailID: 'ayushdharmik55@gmail.com',
        password: 'Ayush@123'
      };

      request(app)
        .post('/api/v1/users/userregister')
        .send(details)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });

    // it('enter the firstname', (done) => {
    //   const nameerr = {
    //     firstname: '',
    //     lastname: 'malode',
    //     emailID: 'ankit@gmail.com',
    //     password: 'Ankit@123'
    //   };

    //   request(app)
    //     .post('/api/v1/users/userregister')
    //     .send(nameerr)
    //     .end((err, res) => {
    //       expect(res.statusCode).to.be.equal(HttpStatus.INTERNAL_SERVER_ERROR);
    //       done();
    //     });
    // });
  });

  describe(`POST/login`, () => {
    it('user login', (done) => {
      const logintest = {
        emailID: 'ayushdharmik55@gmail.com',
        password: 'Ayush@123'
      };

      request(app)
        .post('/api/v1/users/login')
        .send(logintest)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe(`POST/forgetpassword`, () => {
    it('forgetpassword', (done) => {
      const forgettest = {
        emailID: 'ayushdharmik55@gmail.com'
      };

      request(app)
        .post('/api/v1/users/forgetpassword')
        .send(forgettest)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe(`Put/reset`, () => {
    it('should reset', (done) => {
      const resettest = {
        password: 'Ayush@19'
      };
      const newJwtoken =
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImF5dXNoZGhhcm1pazU1QGdtYWlsLmNvbSIsImlkIjoiNjIyNTcwMDY1ZTM3MzM0ZmUwMmQxNTNkIiwiaWF0IjoxNjQ2NjIwNjc4fQ.xsNmCxMkL9J-dMr67Di9OXYlX0w2mGV5Yi6BqqTd3O0';
      request(app)
        .put('/api/v1/users/reset')
        .set('Authorization', `${newJwtoken}`)
        .send(resettest)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });
});
