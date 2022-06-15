class Widget
{
    constructor(element, containers)
    {
        this.containers = containers
        this.element = element
    }
    drawTable() {
        this.containers[position].drawTable()
    }
    setAttribute(attr){
        this.element.setAttribute('data-position', attr)
    }
}

export { Widget }