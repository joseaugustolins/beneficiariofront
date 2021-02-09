import { useEffect, useState } from "react";
import BeneficiarioService from "./service/BeneficiarioService";

function App() {
  const [cpf, setCpf] = useState("");
  const [email, setEmail] = useState("");
  const [valor, setValor] = useState("");
  const [valorAportar, setValorAportar] = useState("");
  const [anos, setAnos] = useState("");

  const [beneficiarioSelected, setBeneficiarioSelected] = useState("");
  const beneficiarioService = BeneficiarioService("");

  const [beneficiariosList, setBeneficiariosList] = useState([])
  useEffect(() => {
    load()
  }, [])

  const load = async () => {
    const data = await beneficiarioService.findAll();
    data.data.sort((a, b) => {
      return a.id - b.id;
    })
    setBeneficiariosList(data.data)
  }

  const cadastrar = async () => {
    if (!cpf || !email || !valor || !anos) {
      alert("Valores precisam ser preenchidos")
      return
    }
    const data = {
      cpf,
      email,
      valor,
      anos
    }

    try {
      await beneficiarioService.save(data)
      alert("Cadastro Efetuado")
      await load();
    } catch (error) {
      alert(error)
    }
    limpar()

  }

  const limpar = () => {
    setCpf(0)
    setEmail("")
    setValor(0)
    setAnos(0)
  }



  const ListaBeneficiarios = ({ beneficiario }) => {
    return (
      <tr key={beneficiario.id}>
        <td>{beneficiario.id}</td>
        <td>{beneficiario.cpf}</td>
        <td>{beneficiario.email}</td>
        <td>{beneficiario.valor}</td>
        <td>{beneficiario.anos}</td>
      </tr>
    )
  }

  const aportar = async () => {


    if (!valorAportar || !beneficiarioSelected) {
      alert("Valores precisam ser preenchidos")
      return;
    }

    const data = {
      id_beneficiario: beneficiarioSelected,
      valor_aporte: valorAportar
    }

    try {
      const result = await beneficiarioService.aportar(data)

      alert(result.data)
      await load();
    } catch (error) {
      alert(error)
    }

  }


  return (
    <div className="App">
      <div>
        <div>
          <form>
            <fieldset className=".uk-fieldset">
              <legend>
                Cadastro Beneficiário
          </legend>
              CPF: <input placeholder="Apenas Números" type="number" className="uk-input" id="cpf" name="cpf" value={cpf} onChange={e => setCpf(e.target.value)} /><br /><br />

              E-mail: <input type="email" id="email" placeholder="E-mail" className="uk-input" name="email" value={email} onChange={e => setEmail(e.target.value)} /><br /><br />
              Valor: <input type="number" id="valor" name="valor" placeholder="Apenas Números" className="uk-input" value={valor} onChange={e => setValor(e.target.value)} /><br /><br />
              Anos de Aposentadoria: <input type="number" id="anos" name="anos" value={anos} placeholder="Apenas Números" className="uk-input" onChange={e => setAnos(e.target.value)} /><br /><br />
              <button type="submit" onClick={cadastrar} className="uk-button uk-button-primary">Cadastrar</button>
            </fieldset>
          </form>
        </div>
      </div>
      <hr />
      <div>
        Aportar valor de <input type="number" id="valorAportar" onChange={e => setValorAportar(e.target.value)} value={valorAportar} /> para:
          <select value={beneficiarioSelected} onChange={event => { setBeneficiarioSelected(event.target.value) }} >
          <option value="">Selecione um Beneficiário</option>
          {beneficiariosList && beneficiariosList.map(beneficiario => (
            <option key={beneficiario.id} value={beneficiario.id}>{beneficiario.id} - {beneficiario.cpf} - {beneficiario.email}</option>
          ))}
        </select>

        <button type="submit" onClick={aportar} className="uk-button uk-button-primary">Aportar</button>
      </div>
      <hr />
      <table className="uk-table uk-table-divider">
        <tbody>
          <tr>
            <td>ID</td>
            <td>CPF</td>
            <td>E-MAIL</td>
            <td>VALOR</td>
            <td>ANOS</td>
          </tr>
          {beneficiariosList && beneficiariosList.map(beneficiario => (
            <ListaBeneficiarios key={beneficiario.id} beneficiario={beneficiario} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
