// At the start of every test file, we want Rei's storage to be blank.

describe('Factoid plugin', function(){
	before(function() {
		var should = chai.should();

		Rei.storage = sessionStorage;
		Rei.storage.clear();
		Rei.initialize(['./plugins/factoids']);
	});
	describe('name memory', function(){
		it('should learn my name', function(){
            response = Rei.handleQuery("What is my name?");
			response.responses['factoids'][0].should.equal(0);
			var response = Rei.handleQuery("my name is Yoz");
			console.log("Factoid response:", response.responses);
			response.responses['factoids'][0].should.equal(1);
            response = Rei.handleQuery("What is my name?");
			response.responses['factoids'][0].should.equal(1);
			response.responses['factoids'][1].should.equal("Yoz");
		});
	});
});
