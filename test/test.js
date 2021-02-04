
const chai = require('chai');
const assert = chai.assert;    // Using Assert style
const expect = chai.expect;    // Using Expect style
const should = chai.should();  // Using Should style
const faker = require('faker');
const sinon = require("sinon");
require('mocha-testcheck').install();//  { check, gen, property }



// $ node_modules/.bin/mocha test/test -g 13
describe('Behavior #13', () => {

    const { Customer,Rental,Movie} = require('../js/13.js');

    it('output format', () => {

        let rental = new Rental(new Movie("Name film", Movie.REGULAR ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
            customer.addRental(rental);
            customer.addRental(rental2);

        var output = 'Учет аренды для Jeka\n' +
            '\tName film\t2\n' +
            '\tName2 film\t2\n' +
            'Сумма задолженности составляет 4\n' +
            'Вы заработали 2 очкa(ов) за активность';

        assert.strictEqual(customer.statement(),output,'The format is not correct')

    });

});

// $ node_modules/.bin/mocha test/test -g 17
describe('Behavior #17', () => {

    const { Customer,Rental,Movie} = require('../js/17.js');

    it('output format', () => {

        let rental = new Rental(new Movie("Name film", Movie.REGULAR ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
        customer.addRental(rental);
        customer.addRental(rental2);

        var output = 'Учет аренды для Jeka\n' +
            '\tName film\t2\n' +
            '\tName2 film\t2\n' +
            'Сумма задолженности составляет 4\n' +
            'Вы заработали 2 очкa(ов) за активность';

        assert.strictEqual(customer.statement(),output,'The format is not correct')

    });

});

// $ node_modules/.bin/mocha test/test -g 21
describe('Behavior #21', () => {

    const { Customer,Rental,Movie} = require('../js/21.js');

    it('output format', () => {

        let rental = new Rental(new Movie("Name film", Movie.REGULAR ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
        customer.addRental(rental);
        customer.addRental(rental2);

        var output = 'Учет аренды для Jeka\n' +
            '\tName film\t2\n' +
            '\tName2 film\t2\n' +
            'Сумма задолженности составляет 4\n' +
            'Вы заработали 2 очкa(ов) за активность';

        assert.strictEqual(customer.statement(),output,'The format is not correct')

    });

});

// $ node_modules/.bin/mocha test/test -g 31
describe('Behavior #31', () => {

    const { Customer,Rental,Movie} = require('../js/31.js');

    it('output format', () => {

        let rental = new Rental(new Movie("Name film", Movie.REGULAR ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
        customer.addRental(rental);
        customer.addRental(rental2);

        var output = 'Учет аренды для Jeka\n' +
            '\tName film\t2\n' +
            '\tName2 film\t2\n' +
            'Сумма задолженности составляет 4\n' +
            'Вы заработали 2 очкa(ов) за активность';

        assert.strictEqual(customer.statement(),output,'The format is not correct')
    });

    it('output html format', () => {

        let rental = new Rental(new Movie("Name film", Movie.REGULAR ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
        customer.addRental(rental);
        customer.addRental(rental2);

        var output = '<H1>0перации аренды для <ЕМ>Jeka</EM></H1><P>Name film<ЕМ>2</EM><BR>Name2 film<ЕМ>2</EM><BR><Р>' +
            'Сумма задолженности составляет <ЕМ>4</EM></P>Вы заработали <ЕМ>2</ЕМ> очкa(ов) за активность</Р>';

        assert.strictEqual(customer.htmlStatement(),output,'The format is not correct')

    });
});

// $ node_modules/.bin/mocha test/test -g 32
describe('Behavior #32', () => {

    const { Customer,Rental,Movie} = require('../js/32.js');

    it('output format REGULAR', () => {

        let rental = new Rental(new Movie("Name film", Movie.REGULAR ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
        customer.addRental(rental);
        customer.addRental(rental2);

        var output = 'Учет аренды для Jeka\n' +
            '\tName film\t2\n' +
            '\tName2 film\t2\n' +
            'Сумма задолженности составляет 4\n' +
            'Вы заработали 2 очкa(ов) за активность';

        assert.strictEqual(customer.statement(),output,'The format is not correct')
    });

    it('output format NEW_RELEASE REGULAR', () => {

        let rental = new Rental(new Movie("Name film", Movie.NEW_RELEASE ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
        customer.addRental(rental);
        customer.addRental(rental2);

        var output = 'Учет аренды для Jeka\n' +
            '\tName film\t6\n' +
            '\tName2 film\t2\n' +
            'Сумма задолженности составляет 8\n' +
            'Вы заработали 3 очкa(ов) за активность';

        assert.strictEqual(customer.statement(),output,'The format is not correct')
    });

    it('output html format REGULAR', () => {

        let rental = new Rental(new Movie("Name film", Movie.REGULAR ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
        customer.addRental(rental);
        customer.addRental(rental2);

        var output = '<H1>0перации аренды для <ЕМ>Jeka</EM></H1><P>Name film<ЕМ>2</EM><BR>Name2 film<ЕМ>2</EM><BR><Р>' +
            'Сумма задолженности составляет <ЕМ>4</EM></P>Вы заработали <ЕМ>2</ЕМ> очкa(ов) за активность</Р>';

        assert.strictEqual(customer.htmlStatement(),output,'The format is not correct')

    });

    it('output html format NEW_RELEASE REGULAR', () => {

        let rental = new Rental(new Movie("Name film", Movie.NEW_RELEASE ), 2);
        let rental2 = new Rental(new Movie("Name2 film", Movie.REGULAR ), 1);
        let customer = new Customer("Jeka");
        customer.addRental(rental);
        customer.addRental(rental2);

        var output = '<H1>0перации аренды для <ЕМ>Jeka</EM></H1><P>Name film<ЕМ>6</EM><BR>Name2 film<ЕМ>2</EM><BR><Р>' +
            'Сумма задолженности составляет <ЕМ>8</EM></P>Вы заработали <ЕМ>3</ЕМ> очкa(ов) за активность</Р>';

        assert.strictEqual(customer.htmlStatement(),output,'The format is not correct')

    });
});