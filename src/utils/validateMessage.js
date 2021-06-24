const validateMessage = (values) => {
    const errors = {}
    if (!values.message.length) {
        errors.message = 'Le message est requis.'
    }
    else if (values.message.length > 280) {
        errors.message = 'Le message ne doit pas dépasser 280 caractères.'
    }

    return errors
}

export default validateMessage
