import { expect } from 'chai';
import request from 'supertest';
import mongoose from 'mongoose';
import HttpStatus from 'http-status-codes';

import app from '../../src/index';
let notetoken;

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

    it('enter the firstname', (done) => {
      const nameerr = {
        firstname: '',
        lastname: 'malode',
        emailID: 'ankit@gmail.com',
        password: 'Ankit@123'
      };

      request(app)
        .post('/api/v1/users/userregister')
        .send(nameerr)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });


     it('enter the lastname', (done) => {
      const nameerr = {
        firstname: 'Ankit',
        lastname: '',
        emailID: 'ankit@gmail.com',
        password: 'Ankit@123'
      };

      request(app)
        .post('/api/v1/users/userregister')
        .send(nameerr)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
          done();
        });
    });
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
          notetoken = res.body.data;
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  

      it('user email required', (done) => {
        const logintest = {
          emailID: '',
          password: 'Ayush@123'
        };
  
        request(app)
          .post('/api/v1/users/login')
          .send(logintest)
          .end((err, res) => {
            expect(res.statusCode).to.be.equal(HttpStatus.BAD_REQUEST);
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
  

  // Notes

  describe(`POST/Create note`, () => {
    it('Create note', (done) => {
      const note = {
        Title: 'title',
        Description: 'description',
        Color: 'Green',
      };

      request(app)
        .post('/api/v1/note')
        .set('Authorization',  `Bearer ${notetoken}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.CREATED);
          done();
        });
    });
  });


  describe(`GET/Fetched all notes`, () => {
    it('Get all note', (done) => {
      const note = {
        Title: 'title',
        Description: 'description',
        Color: 'Green',
      };

      request(app)
        .get('/api/v1/note')
        .set('Authorization',  `Bearer ${notetoken}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe(`GET/get single note`, () => {
    it('Get single note', (done) => {
      const note = {
        Title: 'title',
        Description: 'description',
        Color: 'Green',
      };

      request(app)
        .get('/api/v1/note/6229f8ee047f7396a4284fb2')
        .set('Authorization',  `Bearer ${notetoken}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });



  describe(`PUT/archive note`, () => {
    it('Archive note', (done) => {
      const note = {
        Title: 'title',
        Description: 'description',
        Color: 'Green',
      };

      request(app)
        .put('/api/v1/note/archive/6229f8ee047f7396a4284fb2')
        .set('Authorization',  `Bearer ${notetoken}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe(`PUT/trash note`, () => {
    it('Trash note', (done) => {
      const note = {
        Title: 'title',
        Description: 'description',
        Color: 'Green',
      };

      request(app)
        .put('/api/v1/note/trash/6229f8ee047f7396a4284fb2')
        .set('Authorization',  `Bearer ${notetoken}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });

  describe(`PUT/update note `, () => {
    it('Update a note by ID', (done) => {
      const note = {
        Title: 'title',
        Description: 'description',
        Color: 'Green',
      };

      request(app)
        .put('/api/v1/note/6229f8ee047f7396a4284fb2')
        .set('Authorization',  `Bearer ${notetoken}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


  describe(`DELETE/delete note `, () => {
    it('Delete note', (done) => {
      const note = {
        Title: 'title',
        Description: 'description',
        Color: 'Green',
      };

      request(app)
        .delete('/api/v1/note')
        .set('Authorization',  `Bearer ${notetoken}`)
        .send(note)
        .end((err, res) => {
          expect(res.statusCode).to.be.equal(HttpStatus.OK);
          done();
        });
    });
  });


});
