const withProxyContainers = elem => new Proxy(elem,
{
    get(target, method, reciver)  
    {
        if (typeof target[method] == 'function')
            return function(...args)
            {
                if(method == 'setAttribute')
                {
                    const table = target.drawTable(args[1])
                    target.innerHTML = ''
                    target.append(table)
                    target.toggleTab && 
                        target.toggleTab(args[1])
                }
                Reflect.apply(target[method], target, args)
            }
        else return Reflect.get(...arguments)
    }
})
   
 

 export  {withProxyContainers}
 