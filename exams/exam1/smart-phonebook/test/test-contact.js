'use strict';

var expect = require('chai').expect;
var contact = require('../contact');



describe('dummy test', function () {
    it('should should return true', function () {
        var fortytwo = 42;
        expect(fortytwo).to.equal(42);
    });
});


describe('contact module', function () {

    it('should add a new contact with valid parameters to database and return id', function () {

    });

    it('should throw an error if the contact parameters are invalid');

    it('should throw an error if database is down');

    it('should remove a contact by given id');

    it('should retrieve a contact by given id');

    it('should retieve all contacts if no id was passed');
});
