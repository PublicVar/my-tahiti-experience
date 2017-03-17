let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../../app');
let should = chai.should();
let expect = chai.expect;
let cheerio = require('cheerio');

chai.use(chaiHttp); //make http request while testing


describe('Ask Chat Bot', () => {
    describe.skip('An empty request', () => {
        it('should response ask me something', (done) => {
            chai.request(app).post('/').end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.text).to.be.equal('Ask me something')
                done();
            });
        })
    });

    describe('Tahiti location', () => {
        it('Where is Tahiti should response ...', (done) => {
            chai
            .request(app).post('/')
            .send({ask:'Where is Tahiti?' })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.text).to.include(`The islands are located equal distance south of the equator as Hawaii`);
                done();
            });
        });
         it('Where Tahiti should response ...', (done) => {
            chai
            .request(app).post('/')
            .send({ask:'where tahiti' })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.text).to.include(`The islands are located equal distance south of the equator as Hawaii`);
                done();
            });
        })
    });
})