import axios from 'axios'
import React from 'react'

const BeneficiarioService = () => {
    const findAll = async() => {
        return await axios.get(`${process.env.REACT_APP_URL_BENEFICIARIO}`)
    }

    const findById = async(id) => {
        return await axios.get(`${process.env.REACT_APP_URL_BENEFICIARIO}/${id}`)
    }

    const save = async(data) => {
        return await axios.post(`${process.env.REACT_APP_URL_BENEFICIARIO}`, data)
    }

    const aportar = async(data) => {
        return await axios.post(`${process.env.REACT_APP_URL_CAIXA_APORTE}`, data);
    }

    return {findAll, findById, save, aportar}
}

export default BeneficiarioService;