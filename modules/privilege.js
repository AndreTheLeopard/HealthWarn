
let time=require('time')
let _registry=require('../modules/registry.js')

var exports=module.exports={}

args=process.argv.slice(2)

const pk='0x3e670d8b4387ea0af06139a2b4a1fbe15020b1ce298558b8bc02404d4bf8e174'
const net='5777'

iface=args[0]
action=args[1]
actargs=args.slice(2)

if(iface=='registry')
{
	if(action=='newcase')
	{
		//_registry.newCase(actargs[0],actargs[1],actargs[2],actargs[3],net,pk,(err,th)=>{
		_registry.newCase(actargs[0],actargs[1],time.time(),actargs[2],net,pk,(err,th)=>{
			if(err) throw err
			console.log(th)		
		})
	}
	else if(action=='request')
	{

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
	}
	else if(action=='show')
	{
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
	}
}
