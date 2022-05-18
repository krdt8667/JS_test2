import {createGridData, topBottomArray, getDataKeys, getDataByKeys} from './data.js'
const   topBottomArr = topBottomArray(),
        tabContent = document.getElementsByClassName('tab-c')

window.onload = () => {
    const keyArr = getDataKeys(),
            firstKey = keyArr[0]
    let locationHash = window.location.hash.slice(1)
        
    keyArr.map((key, index) => {
        let data = getDataByKeys(key),
            dataByFirstKey = getDataByKeys(firstKey)
        renderWidgets(key, data)
        renderTabs(key, index, firstKey, keyArr)
        if (locationHash == '')
            renderGrid(firstKey, dataByFirstKey)
        if (key == locationHash)
            renderGrid(key, data)
    })
    document.querySelector('.tab-h').addEventListener('click', () => console.log(Event.type))
    
}
window.onhashchange = () => window.location.reload()


const renderWidgets = (key, keyData) => {
    const template = document.createElement('template')
    template.innerHTML = `<div class="widg-group">
                            <div class="title">${key} grid</div>
                            <div class="widget" id="${key}-top">
                                <ol class="list-group list-group-flush">
                                    <fieldset id="group">
                                        <legend><input class="mainCheck" id="mainCheck-${key}-top" type="checkbox">Check all</legend>
                                        ${
                                        keyData.map(el =>`
                                            <li class="list-group-item list-group-item-info" >
                                                <input type="checkbox" class="chk-${key}-top}" id="chk${el.id}-${key}-top">   
                                                ${el.title}   ${el.id}
                                            </li>
                                        `).join('')		
                                        }
                                    </fieldset>
                                </ol>  
                            </div>
                        </div>
                        `
    document.querySelector('.widgets').append(template.content.cloneNode(true))
}

const renderTabs = (key, index, firstKey, keyArr) => {
    const template = document.createElement('template')
    template.innerHTML = `<div class="tab-h" id="${index}" data-tab="${index}">${key}</div>`
    document.querySelector('.tab-headers').append(template.content.cloneNode(true))
    const location = window.location.hash,
          keyByLocation = window.location.hash.slice(1)
    if (location == '') {
        history.pushState(null, null, `#${firstKey}`)
       
        document.getElementById('0').style.backgroundColor = '#cff4fc'
    }
    else {
      
            if (location == `#${key}`) {
                
             document.getElementById(index).style.backgroundColor = '#cff4fc'
            }
            else {
                    document.getElementById(index).style.backgroundColor = 'rgb(126, 211, 214)'
            }
        
    }
    
}


const renderGrid = (key, keyData) => {
    const template = document.createElement('template')
    template.innerHTML = `<div class="tab-c" id="${key}-bottom">
                            <ol class="list-group list-group-flush">
                                <fieldset id="group">
                                    <legend><input class="mainCheck" id="mainCheck-${key}-bottom" type="checkbox">Check all</legend>
                                    ${
                                    keyData.map(el =>`
                                        <li class="list-group-item list-group-item-info" >
                                            <input type="checkbox" class="chk-${key}-bottom}" id="chk${el.id}-${key}-bottom">   
                                            ${el.title}   ${el.id}
                                        </li>
                                    `).join('')		
                                    }
                                </fieldset>
                            </ol>  
                         </div>
                        `
    document.querySelector('.tab-content').append(template.content.cloneNode(true))
}

const activeTab = (event, keyArr, firstKey) => {
    if (event.type == 'click') {
        const dataTab = event.target.getAttribute('data-tab')
        for (let i = 0; i < keyArr.length; i++) {
            if (dataTab == i) {
                history.pushState(null, null, `#${keyArr[i]}`)
                document.getElementById(i).style.backgroundColor = '#cff4fc'
                }
            else {         
                document.getElementById(i).style.backgroundColor = 'rgb(126, 211, 214)'  
            }
        }   
    }
    
}

window.checkBox = (item, key, id) => {
    let  all = [],
         allTop = [],
         allBottom = [],
        count = document.querySelectorAll(`.chk-${item}-${key}`).length
    const main  = document.getElementById('mainCheck' + '-' + item + '-' + key)
    for ( let i = 0; i < count; i++) {
         all.push(document.getElementById('chk' + i + '-' + item + '-' + key))
         allTop.push(document.getElementById('chk' + i + '-' + item + '-top'))
         allBottom.push(document.getElementById('chk' + i + '-' + item + '-bottom'))
    }
    
    for(let i = 0; i < all.length; i++) {  
        all[i].onclick = () => {
            let allChecked = document.querySelectorAll(`.chk-${item}-${key}:checked`).length,
                elem = document.getElementById('chk' + i + '-' + item + '-' + key)
            topBottomArr.map(tb => {
                document.querySelector(`#mainCheck-${item}-${tb}`).checked = allChecked == all.length
                document.querySelector(`#mainCheck-${item}-${tb}`).indeterminate = allChecked > 0 && allChecked < all.length
                document.getElementById('chk' + i + '-' + item + '-' + tb).checked = elem.checked
            })
            
        }
    }
    topBottomArr.map(tb => {
        document.querySelector(`#mainCheck-${item}-${tb}`).checked = main.checked
        document.querySelector(`#mainCheck-${item}-${tb}`).indeterminate = main.indeterminate
    })
           
    if (!id)    {
        for(let i = 0; i < all.length; i++) {
            all[i].checked = main.checked
            allTop[i].checked = main.checked 
            allBottom[i].checked = main.checked  
        }
    }
    else    {
            let allChecked = document.querySelectorAll(`.chk-${item}-${key}:checked`).length,
                elem = document.getElementById('chk' + id + '-' + item + '-' + key)
            topBottomArr.map(tb => {
                document.querySelector(`#mainCheck-${item}-${tb}`).checked = allChecked == all.length
                document.querySelector(`#mainCheck-${item}-${tb}`).indeterminate = allChecked > 0 && allChecked < all.length
                document.getElementById('chk' + id + '-' + item + '-' + tb).checked = elem.checked
            })
            
    }
}