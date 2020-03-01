
//let time=require('time')
let _registry=require('../modules/registry.js')

var exports=module.exports={}

args=process.argv.slice(2)

const pk=require('./providers.json').pk.kovanpk
const net='4'

iface=args[0]
action=args[1]
actargs=args.slice(2)

if(iface=='registry')
{
	if(action=='newcase')
	{
		_registry.newCase(actargs[0],actargs[1],actargs[2],actargs[3],net,pk,(err,th)=>{
		//_registry.newCase(actargs[0],actargs[1],time.time(),actargs[2],net,pk,(err,th)=>{
			if(err){throw err}
			console.log(th)		
		})
	}
	else if(action=='request')
	{
		_registry.requestSupport(actargs[0],actargs[1],actargs[2],actargs[3],net,pk,(err,th)=>{
			if(err) throw err
			console.log(th)
		})
	}
	else if(action=='set')
	{
		if(actargs[0]=='focus')
		{
			_registry.setFocus(actargs[1],net,pk,(err,th)=>{
				if(err) throw err
				console.log(th)
			})
		}
		else if(actargs[0]=='locale')
		{
			_registry.setLocale(actargs[1],net,pk,(err,th)=>{
				if(err) throw err
				console.log(th)
			})
		}
		else if(actargs[0]=='entity')
		{
			_registry.setEntity(actargs[1],actargs[2],net,pk,(err,th)=>{
				if(err) throw err
				console.log(th)			
			})		
		}
	}
	else if(action=='show')
	{
		if(actargs[0]=='events')
		{
			_registry.events(actargs[1],net,(e)=>{
				console.log(e)			
			})		
		}
		if(actargs[0]=='focus')
		{
			_registry.focus(net,(err,f)=>{
				if(err) throw err
				console.log(f)
			})
		}
		else if(actargs[0]=='locale')
		{
			_registry.locale(net,(err,f)=>{
				if(err) throw err
				console.log(f)
			})			
		}
		else if(actargs[0]=='address')
		{
			_registry.address(actargs[1],(a)=>{
				console.log(a)			
			})
		}
		else if(actargs[0]=='abi')
		{
			_registry.abi(actargs[1],(a)=>{
				console.log(a)			
			})
		}
	}
}
