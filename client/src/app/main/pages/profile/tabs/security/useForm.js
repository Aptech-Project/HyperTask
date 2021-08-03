import { useState } from "react";

const useForm = (initialFieldValues, validate) => {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target
        let tmp = {}
        console.log("namename")
        console.log(name)
        console.log(typeof name)
        console.log(["gender", "birthday", "phoneNumber", "address"].includes(name))

        if (["gender", "birthday", "phoneNumber", "address"].includes(name)) {
            tmp = Object.assign({}, values)
            tmp.info[name] = value
        } else {
            tmp = { [name]: value }
        }
        console.log("tmptmp")
        console.log(tmp)
        const fieldValue = tmp

        setValues({
            ...values,
            ...fieldValue
        })

        validate(fieldValue)
    }

    const resetForm = () => {
        setValues({
            ...initialFieldValues
        })
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    };
}

export default useForm;