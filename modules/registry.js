let Web3=require('web3')
let HWP=require('@truffle/hdwallet-provider');


var exports=module.exports={}

providers=require('../cli/providers.json').providers

exports.events=async function(evt,network,cb)
{
	let web3=new Web3(providers[network])
	c=contract('Registry',network)
	let r=web3.eth.Contract(c.abi,c.address)
	ev=await (()=>{
			 r.methods.getPastEvents(evt,{},(err,e)=>{
				if(err) return
				return e;			 
			 })
	})
	cb(ev)
}

exports.deploy=function(network,pk,cb)
{
	let web3=new Web3(providers[network])
	c=contract('Registry','5777')
	
}

exports.address=function(net,cb)
{
	c=contract('Registry',net)
	cb(c.address)
}

exports.abi=function(net,cb)
{
	c=contract('Registry',net)
	cb(c.abi)
}

exports.events=function()
{
	
}

exports.setFocus=function(_focus,network,pk,cb)
{
	let web3=new Web3(providers[network]);
	c=contract('Registry',network);
	let r=new web3.eth.Contract(c.abi,c.address);
	dat=r.methods.setFocus(web3.utils.toHex(_focus)).encodeABI();
	sendTransaction({to:c.address,gas:70000,data:dat},pk,providers[network],(err,th)=>{
		cb(err,th)	
	})
}

exports.focus=function(network,cb)
{
	let web3=new Web3(providers[network]);
	c=contract('Registry',network);
	console.log(c.address)
	let r=new web3.eth.Contract(c.abi,c.address);	
	r.methods.focus().call((err,f)=>{
		cb(err,web3.utils.hexToAscii(f))	
	})
}

exports.setLocale=function(_locale,network,pk,cb)
{
	let web3=new Web3(providers[network]);
	c=contract('Registry',network);
	let r=new web3.eth.Contract(c.abi,c.address);
	dat=r.methods.setLocale(web3.utils.toHex(_locale)).encodeABI();
	sendTransaction({to:c.address,gas:70000,data:dat},pk,providers[network],(err,th)=>{
		cb(err,th)	
	})
}


exports.locale=function(network,cb)
{
	let web3=new Web3(providers[network]);
	c=contract('Registry',network);
	console.log(c.address)
	let r=new web3.eth.Contract(c.abi,c.address);	
	r.methods.locale().call((err,f)=>{
		cb(err,web3.utils.hexToAscii(f))	
	})
}


exports.newCase=function(longitude,latitude,_time,data,net,pk,cb)
{
	let web3=new Web3(providers[net])
	c=contract('Registry',net)
	let r=new web3.eth.Contract(c.abi,c.address)
	let d=Date();
	//var _time=Date.getTime()
	dat=r.methods.newCase(web3.utils.toHex(longitude),web3.utils.toHex(latitude),web3.utils.toHex(_time),web3.utils.toHex(data)).encodeABI()	
	sendTransaction({to:c.address,data:dat,gas:100000},pk,providers[net],(err,th)=>{
		cb(err,th)	
	})	
	
}

exports.requestSupport=function(longitude,latitude,asset,amount)
{
	let web3=new Web3(providers[net])
	c=contract('Registry',net)
	let r=new web3.eth.Contract(c.abi,c.address)
	dat=r.methods.requestSupport(web3.utils.toHex(longitude),web3.utils.toHex(latitude),web3.utils.toHex(asset),web3.utils.toHex(amount)).encodeABI()
	sendTransaction({},(err,th)=>{
		cb(err,th)	
	})

}

exports.setEntity=function(ind,et,net,pk,cb)
{
	let web3=new Web3(providers[net])
	c=contract('Registry',net)
	let r=new web3.eth.Contract(c.abi,c.address)
	dat=r.methods.setEntity(web3.utils.toHex(ind),et).encodeABI()
	sendTransaction({to:c.address,data:dat,gas:100000},pk,providers[net],(err,th)=>{
		cb(err,th)	
	})
}	

function contract(contract_name,network)
{
	dep=require('../build/contracts/'+contract_name+'.json');
	return {abi:dep.abi,address:dep.networks[network].address}
}

function sendTransaction(tx,pk,prov,cb)
{
	console.log(prov)
	let pkp=new HWP(pk,prov)
	let web3=new Web3(pkp)
	from=web3.eth.accounts.privateKeyToAccount(pk).address
	web3.eth.sendTransaction({to:tx.to,data:tx.data,from:from,value:tx.value,gas:tx.gas},(err,th)=>{
		if(err) throw err
		cb(th)
	})
}
