import React, { useState, useEffect } from 'react';

const useForm = (initialState, validate, next) => {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, SetIsSubmitting] = useState(false)

    useEffect(() => {
        if (isSubmitting) {
            const isErrors = Object.keys(errors).length  !== 0
            if (isErrors) {
                SetIsSubmitting(false)
            } else {
                next()
                SetIsSubmitting(false)
                setValues(initialState)
            }
        }
    }, [errors, next, isSubmitting, initialState])

    const handleKeyDown = (e) => {
        if (e.keyCode === 13 && e.ctrlKey) {

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const errors = validate(values)
        setErrors(errors)
        SetIsSubmitting(true)
    }

    const handleChange = (e) => {
        e.persist()
        setValues((prevValues) => ({ 
            ...prevValues,
            [e.target.name]: e.target.value
         }))
    }

    return {
        handleSubmit,
        handleKeyDown,
        handleChange,
        values,
        errors
    }
}

export default useForm;
