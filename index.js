import {createGridData, topBottomArray} from './data.js'
const   keyArr    = createGridData('keys'),
        topBottomArr = topBottomArray(),
        tabContent = document.getElementsByClassName('tab-c')
window.onload = () => {
    renderTab(keyArr)
    showTab() 
}
window.onhashchange = () => showTab()
const renderTab = (Arr) => {
    const tabCnt = Arr.length
    let tmpContainer = document.createElement('template')
        tmpContainer.innerHTML = `<div class="widgets"></div>
                          <div class="tab-headers"></div>
                          <div class="tab-content"></div>`
    document.querySelector('.container').append(tmpContainer.content.cloneNode(true))
    createGridData('keys').map((elem, index) => {
        let tmpWidgets = document.createElement('template'),
            tmpTabHeaders = document.createElement('template'), 
            tmpTabContent = document.createElement('template'),
            tmpTabC 	= document.createElement('template')
        tmpWidgets.innerHTML = `<div class="widg-group">
                                    <div class="title">${elem} grid</div>
                                    <div class="widget" id="${elem}-top"></div>
                                </div>`
        tmpTabHeaders.innerHTML = `<div class="tab-h" id="${index}" data-tab="${index}" onclick="activeTab(event)">${elem}</div>`
        tmpTabContent.innerHTML = `<div class="tab-c" id="${elem}-bottom" style="display: none"></div>`
        document.querySelector('.widgets').append(tmpWidgets.content.cloneNode(true))
        document.querySelector('.tab-headers').append(tmpTabHeaders.content.cloneNode(true))
        document.querySelector('.tab-content').append(tmpTabContent.content.cloneNode(true))
        
        topBottomArr.map(key => {
            tmpTabC.innerHTML = `
            <ol class="list-group list-group-flush">
            <fieldset id="group">
                <legend><input class="mainCheck" id="mainCheck-${elem}-${key}" type="checkbox" onclick="checkBox('${elem}', '${key}')">Check all</legend>
                ${
                createGridData(elem).map(el =>`
                    <li class="list-group-item list-group-item-info" >
                        <input type="checkbox" class="chk-${elem}-${key}" id="chk${el.id}-${elem}-${key}" onclick="checkBox('${elem}', '${key}', '${el.id}')">   
                        ${el.title}   ${el.id}
                    </li>
                `).join('')		
                }
            </fieldset>
            </ol>
            `
            document.querySelector('#' + elem + '-' + key).append(tmpTabC.content.cloneNode(true))
        })
       
    })    
}

const showTab = () => {
    const location = window.location.hash
    if (location == '') {
        history.pushState(null, null, `#${keyArr[0]}`)
        tabContent[0].style.display = 'block'
        document.getElementById('0').style.backgroundColor = '#cff4fc'
    }
    else {
        for (let i = 0; i < tabContent.length; i++) {
            if (location == `#${keyArr[i]}`) {
             tabContent[i].style.display = 'block'
             document.getElementById(i).style.backgroundColor = '#cff4fc'
            }
            else {
                    tabContent[i].style.display = 'none'
                    document.getElementById(i).style.backgroundColor = 'rgb(126, 211, 214)'
            }
        }
    }
}

window.activeTab = (event) => {
    const dataTab = event.target.getAttribute('data-tab')
    for (let i = 0; i < tabContent.length; i++) {
        if (dataTab == i) {
            tabContent[i].style.display = 'block'
            history.pushState(null, null, `#${keyArr[i]}`)
            document.getElementById(i).style.backgroundColor = '#cff4fc'
            }
        else {
            tabContent[i].style.display = 'none'
            document.getElementById(i).style.backgroundColor = 'rgb(126, 211, 214)'  
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