from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/converter", methods=["POST"])
def converter():
    data = request.json
    valor = float(data.get("valor", 0))
    de = data.get("de", "USD")
    para = data.get("para", "BRL")

    taxas = {
        ("USD", "BRL"): 5.2,
        ("BRL", "USD"): 0.19,
        ("EUR", "USD"): 1.07,
        ("USD", "EUR"): 0.93,
        ("BRL", "EUR"): 0.18,
        ("EUR", "BRL"): 5.6
    }

    taxa = taxas.get((de, para), 1)
    convertido = round(valor * taxa, 2)

    return jsonify({
        "resultado": convertido,
        "de": de,
        "para": para
    })

if __name__ == "__main__":
    app.run(debug=True)
