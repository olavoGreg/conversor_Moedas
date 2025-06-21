import { useState } from "react";
import "./App.css";

function App() {
  const [valor, setValor] = useState("");
  const [de, setDe] = useState("USD");
  const [para, setPara] = useState("BRL");
  const [resultado, setResultado] = useState(null);
  const [historico, setHistorico] = useState([]);

  async function converter() {
    if (!valor || isNaN(valor)) return;

    const res = await fetch("http://localhost:5000/converter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ valor, de, para }),
    });

    const data = await res.json();
    setResultado(data.resultado);
    setHistorico((prev) => [
      { ...data, valor },
      ...prev.slice(0, 4)
    ]);
  }

  return (
    <div className="container">
      <h1>Conversor de Moedas</h1>

      <div className="form">
        <input
          type="number"
          placeholder="Valor"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
        <select value={de} onChange={(e) => setDe(e.target.value)}>
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
          <option value="EUR">EUR</option>
        </select>
        <span>→</span>
        <select value={para} onChange={(e) => setPara(e.target.value)}>
          <option value="USD">USD</option>
          <option value="BRL">BRL</option>
          <option value="EUR">EUR</option>
        </select>
        <button onClick={converter}>Converter</button>
      </div>

      {resultado !== null && (
        <p className="resultado">
          Resultado: <strong>{resultado} {para}</strong>
        </p>
      )}

      {historico.length > 0 && (
        <div className="historico">
          <h3>Histórico</h3>
          <ul>
            {historico.map((item, index) => (
              <li key={index}>
                {item.valor} {item.de} → {item.resultado} {item.para}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
