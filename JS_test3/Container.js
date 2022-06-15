import { getDataByPosition }    from './data.js'

class Container
{
    constructor(position)
    {
        this.position   = position
        this.checkedIds = []
    }
    drawTable() {
        const data      = getDataByPosition(this.position),
        template        = document.createElement('template')
        template.innerHTML = `
                            <ol class="list-group list-group-flush">
                                ${
                                    data.map(el =>`
                                        <li class="list-group-item list-group-item-info" >
                                            ${el.title}   ${el.id}
                                        </li>
                                        `).join('')		
                                }
                            </ol>  
                            `
        return template.content.cloneNode(true) 
    }
}

export { Container }