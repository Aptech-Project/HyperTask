export const serializeObject = (object) => {
    Object.keys(object).forEach(key => {
        if (typeof object[key] !== 'string') {
            object[key] = JSON.stringify(object[key])
        }
    })
    return object;
}

export const deserializeObject = (object) => {
    Object.keys(object).forEach(key => {
        try {
            object[key] = JSON.parse(`${object[key]}`)
        } catch (error) { }
    })
    return object;
}