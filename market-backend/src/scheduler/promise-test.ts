import AsyncSafeLoadScheduler from "./async-safeload-scheduler";


setTimeout(() => 
    console.log("DDD"), 100);
const scheduler = new AsyncSafeLoadScheduler<string>(
    "Test",
    new Promise<string>((resolve, err) => {
        resolve("AAAA");
    })
);
setTimeout(() => 
    setTimeout(() => console.log("CAAAAAAAAAAA")), 100);
console.log("De");

scheduler.scheduleTask((val, source) => {
    console.log("Test 1 " + val + " " + source.source);
});

scheduler.scheduleTask((val, source) => {
    console.log("Test 2 " + val + " " + source.source);
});

scheduler.scheduleTask((val, source) => {
    console.log("Test 3 " + val + " " + source.source);
});

scheduler.scheduleTask((val, source) => {
    console.log("Test 4 " + val + " " + source.source);
});

setTimeout(() => {
    scheduler.scheduleTask((val, source) => {
        console.log("Test 5 " + val + " " + source.source);
    });
}, 1);

async function g() {
    scheduler.load();    
}
g();
console.log("Hello world!");