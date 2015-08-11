var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */

    function isMushroom(x) {
      return x === "mushrooms";
    }

    function hasNutsOrMushrooms(product) {
      return product.containsNuts || _.any(product.ingredients, isMushroom);
    }

    productsICanEat = products.filter(function (x) {
      return !hasNutsOrMushrooms(x);
    });      

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(1, 1000)
      .filter(function (x) {
        return x % 3 === 0 || x % 5 === 0;
      })
      .reduce(function (a, b) {
        return a + b;
      }, 0);    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    ingredientCount = _.chain(products)
      .map(function (x) {
        return x.ingredients;
      })
      .flatten()
      .reduce(function (acc, current) {
        if (!acc.hasOwnProperty(current)) {
          acc[current] = 0;
        }
        acc[current]++;
        return acc;
      }, {})
      .value();    

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */
  
  it("should find the largest prime factor of a composite number", function () {

    function isPrime(num) {
      var counter = 2;
      while (counter < num) {
        if (num % counter === 0) {
          return false;
        }
        counter++;
      }
      return true;
    }

    function largestPrimeOfComposite(num) {
      // find all factors
      var counter = num - 1;
      while (num > 1) {
        if (num % counter === 0 && isPrime(counter)) {
          return counter;
        }
        counter--;
      }
    }

    expect(largestPrimeOfComposite(111))
      .toBe(37);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    function isPalin(str) {
      str = str.split(" ")
        .join("");
      for (var i = 0; i < str.length; i++) {
        if (str[i] !== str[str.length - 1 - i]) {
          return false;
        }
      }
      return true;
    }

    function largestPalindromeNum() {
      var num1, num2, testNum;
      var palinArray = {};
      for (num1 = 999; num1 > 900; num1--) {
        for (num2 = 999; num2 > 900; num2--) {
          testNum = num1 * num2;
          if (isPalin(testNum + "")) {
            palinArray[testNum] = [num1, num2];
          }
        }
      }
      return palinArray;
    }

    var maxNum = Math.max.apply(null, Object.keys(largestPalindromeNum())
      .map(function (x) {
        return parseInt(x);
      }));    



    expect(maxNum)
      .toBe(906609);

  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
      
    
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    
  });

  it("should find the 10001st prime", function () {

    function isPrime(num) {
      var counter = 2;
      while (counter < num) {
        if (num % counter === 0) {
          return false;
        }
        counter++;
      }
      return true;
    }

    function findNthPrime(num) {
      var counter = 0;
      var testNum = 1;
      while (counter < num) {
        testNum++;
        if (isPrime(testNum)) {
          counter++;
        }
      }
      return testNum;
    }

    expect(findNthPrime(10001))
      .toBe(104743);

  });
  
});
