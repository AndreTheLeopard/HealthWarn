
let fs=require('fs')
registry=require('./build/contracts/Registry.json')

r=new Object;
r.abi=registry.abi;
r.networks=new Object;
r.networks['4']=new Object;
r.networks['4'].address=registry.networks['4'].address

fs.writeFileSync('healthwarn/src/registry.json',JSON.stringify(r))