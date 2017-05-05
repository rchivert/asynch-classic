import "es6-promise"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  DEMO:  Calling Asynchronous functions using Promises
//
function asynch1() : Promise<string> 
    {
    let p: Promise<string> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let data: string = "1";
                if (data.length > 0)
                    {
                    console.log(data); 
                    resolve (data);
                    }
                else 
                    {
                    reject("error getting '1'");
                    }
            }, 4000);
    });
    return p;
    }

function asynch2() : Promise<string> 
    {
    let p: Promise<string> = new Promise((resolve, reject) => {
            setTimeout(() => {
                let data: string = "2";
                if (data.length > 0)
                {
                console.log(data);
                resolve (data);
                }
            else 
                {
                reject("error getting '2'");
                }
            }, 1000);
    });
    return p;
    }

function getAsyncDataSequentially() 
    {
    console.log("0");
    try
        {
        asynch1()
            .then(function (data1) {
                asynch2()
                    .then(function (data2){
                    })
                    .catch(function (err2) {
                        console.log(err2);
                    });
            })
            .catch (function (err1){
                console.log(err1);
            })
        }
    catch(err)
        {
        console.log(err);
        }
    console.log("3");
    }

    function getAsyncDataInParallel() 
        {
        console.log("0");
        let promise1 = asynch1();   
        let promise2 = asynch2();   

        Promise.all([promise1, promise2])
            .then(function([data1, data2])  // data1 = "1", data2 = "2"
                {
                //  do something with data1 & data2
                let s = data1 + data2;
                })
        .catch(function (err){
            console.log(err);
        })
        console.log("3");
        }

console.log('Before calling getAsyncDataSequentially...');
getAsyncDataSequentially();
console.log('After calling getAsyncDataSequentially...');

//console.log('Before calling getAsyncDataInParallel...');
//getAsyncDataInParallel();
//console.log('After calling getAsyncDataInParallel...');

