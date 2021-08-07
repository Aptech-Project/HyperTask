export const serializeObject = (object) => {
    Object.keys(object).forEach(key => {
        if (typeof object[key] !== 'string') {
            object[key] = JSON.stringify(object[key])
        }
    })
    return object;
}

export const deserializeObject = (object) => {
    if (Array.isArray(object)) {
        object.forEach(item => {
            Object.keys(item).forEach(key => {
                try {
                    item[key] = JSON.parse(`${item[key]}`)
                } catch (error) { }
            })
        })
    }
    Object.keys(object).forEach(key => {
        try {
            object[key] = JSON.parse(`${object[key]}`)
        } catch (error) { }
    })
    return object;
}