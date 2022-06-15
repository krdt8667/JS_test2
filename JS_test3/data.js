let data
const createGridData = () =>
{
    let count = 30
    const dataArr = side =>
    {
        const arr = []
        for (let i = 1; i <= count; i++)
        {
            const elemArr = {
                id:     i-1,
                title:  side
            }
            arr.push(elemArr) 
        }
        return arr
    }

    data = {
        left:       dataArr('Left'),
        middle:     dataArr('Middle'),
        right:      dataArr('Right')
    }
    return Object.keys(data)
}

const getDataByPosition = position => data[position]


export  { createGridData, getDataByPosition }