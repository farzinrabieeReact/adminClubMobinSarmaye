
export const distinctMethod = (data, structure) => {
    let addedItem = []

    data.forEach(item => {

        if (structure.length === 1) {
            if (!addedItem.includes(item[structure[0]].trim())) {
                addedItem.push(item[structure[0]].trim())
            }
        }

        if (structure.length === 2) {
            if (!addedItem.includes(item[structure[0]][structure[1]].trim())) {
                addedItem.push(item[structure[0]][structure[1]].trim())
            }
        }
    })

    return addedItem
}