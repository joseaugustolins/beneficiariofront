import axios from 'axios'
import React from 'react'

const BeneficiarioService = () => {
    const findAll = async() => {
        return await axios.get(`${process.env.REACT_APP_URL_BENEFICIARIO}`)
    }

    const findById = async(id) => {
        return await axios.get(`${process.env.REACT_APP_URL_BENEFICIARIO}/${id}`)
    }

    return {findAll, findById}
}
