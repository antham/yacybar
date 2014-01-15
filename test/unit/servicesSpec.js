'use strict';

/* jasmine specs for services go here */

describe('service', function() {

  beforeEach(module('ngResource','yacy.services'));

  describe('storage', function() {
    var storage = null;

    beforeEach(inject(function(_storage_){
      storage = _storage_;

      storage.set("boolean",true);
      storage.set("integer",1);
      storage.set("string","hello");
      storage.set("null",null);
      storage.set("undefined",undefined);
    }));

    it('should check if value exists in localStorage', function(){
      expect(storage.has("boolean")).toEqual(true);
      expect(storage.has("integer")).toEqual(true);
      expect(storage.has("string")).toEqual(true);
      expect(storage.has("null")).toEqual(true);
      expect(storage.has("undefined")).toEqual(true);
      expect(storage.has("no existing key")).toEqual(false);
    });

    it('should retrieve value from localStorage', function(){
      expect(storage.get("boolean")).toEqual(true);
      expect(storage.get("integer")).toEqual(1);
      expect(storage.get("string")).toEqual("hello");
      expect(storage.get("null")).toEqual(null);
      expect(storage.get("undefined")).toEqual(undefined);
      expect(storage.get("no existing key")).toEqual(null);
    });

    it('should remove value from localStorage', function(){
      storage.remove("boolean");
      storage.remove("integer");
      storage.remove("string");
      storage.remove("null");
      storage.remove("undefined");
      storage.remove("no existing key");

      expect(storage.has("boolean")).toEqual(false);
      expect(storage.has("integer")).toEqual(false);
      expect(storage.has("string")).toEqual(false);
      expect(storage.has("null")).toEqual(false);
      expect(storage.has("undefined")).toEqual(false);
    });
  });
});
