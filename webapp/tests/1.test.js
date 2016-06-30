/**
**1.js的测试用例文件
**/

describe("A suite of basic functions", function() {
    it("reverse word",function(){
        expect("BBB").toEqual(reverse("AAA"));
		expect("DCBA").toEqual(reverse("ABCD"));
    });
});


describe("测试求和函数",function(){
	it("求和",function(){
		expect(2).toEqual(add(1,1));
		expect(4).toEqual(add(2,2));
	});
});