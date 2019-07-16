

// return an array of all primes less than n
function getPrimes(num) {
    var a = [...Array(num+1).keys()]; // =[0,1,...,num]
    a[1] = 0; // 1 is not prime
    var rt = Math.sqrt(num); // calculate only once
    for (i=2;i<=rt;i++){
        for (var j=i*i; j<=num; j+=i) {
          a[j]=0;
        }
    }
    return a.filter(Number); // kick out the zeroes
}
