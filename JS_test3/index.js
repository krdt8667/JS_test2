import { createGridData } from './data.js'
import { withProxyContainers } from './proxyContainers.js'
import { Container } from './Container.js'
import { Widget } from './Widget.js'
let dynamicGrid


window.onload = () =>
 //получить и заполнить дату в сторэйдж
{   
    const positions = createGridData()
    const tabs = 
    {
        left: document.querySelector('[data-toggle="left"]'),
        middle: document.querySelector('[data-toggle="middle"]'),
        right: document.querySelector('[data-toggle="right"]')
    }
    const containers = 
    {
        left: new Container('left'), 
        middle: new Container('middle'),
        right: new Container('right') 
    }
    const widgets =
    {
        left: withProxyContainers(document.querySelector('.widgets div')),
        middle: withProxyContainers(document.querySelector('.widgets div')),
        right: withProxyContainers(document.querySelector('.widgets div'))  
    }
    dynamicGrid = withProxyContainers(new Widget(document.querySelector('#dynamicGrid'), containers))  
    dynamicGrid.toggleTab = position =>
    {   
        for(let i in tabs)
        {
            tabs[i].classList.remove('active')
        }  
        tabs[position].classList.add('active')
    }
    dynamicGrid.setAttribute(window.location.hash.slice(1))
    for (let item in widgets)
    {
        widgets[item].drawTable = item =>
        {
            return containers[item].drawTable()
            
        }
        widgets[item].setAttribute('data-position', item)
    }
}
