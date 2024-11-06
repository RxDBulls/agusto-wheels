// Importa as dependências necessárias


const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');


// Carrega as variáveis de ambiente


dotenv.config();


// Cria a aplicação Express


const app = express();


// Configura o Express para trabalhar com JSON e habilita o CORS (Cross-Origin Resource Sharing)


app.use(express.json());
app.use(cors());


// Conecta ao MongoDB usando a URL de conexão armazenada no arquivo .env


mongoose.connect(process.env.MONGO_URI, {

})
.then(() => {
    console.log("Conectado ao MongoDB - Agusto Wheels");
})
.catch((error) => {
    console.log("Erro ao conectar ao MongoDB:", error);
});

// Define o modelo da roda


const wheelSchema = new mongoose.Schema({

    title: { type: String, required: true },
    diameter: { type: Number, required: true },
    width: { type: Number, required: true },
    boltPattern: { type: String, required: true },
    color: { type: String, required: true },
    offset: { type: Number, required: true },
    insideSpace: { type: String, required: true },
    backsideSpace: { type: String, required: true },
    frontSpace: { type: String, required: true },
    weight: { type: String, required: true },
    cb: { type: Number, required: true }

});


// Cria o modelo Wheel


const Wheel = mongoose.model('Wheel', wheelSchema);


// Rota de Teste


app.get('/', (req, res) => {
    res.send("Bem-vindo à API da Agusto Wheels!");
});


// Criar uma nova roda


app.post('/wheels', async (req, res) => {
    const { title, diameter, width, boltPattern, color, offset, insideSpace, backsideSpace, frontSpace, weight, cb } = req.body;


    // Validação dos campos


    if (!title || !diameter || !width || !boltPattern || !color || !offset || !insideSpace || !backsideSpace || !frontSpace || !weight || !cb) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    const newWheel = new Wheel({ title, diameter, width, boltPattern, color, offset, insideSpace, backsideSpace, frontSpace, weight, cb });

    try {
        const savedWheel = await newWheel.save();
        res.status(201).json({ success: true, message: 'Roda criada com sucesso!', data: savedWheel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Listar todas as rodas


app.get('/wheels', async (req, res) => {
    try {
        const wheels = await Wheel.find();
        res.status(200).json(wheels);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Obter uma roda por ID


app.get('/wheels/:id', async (req, res) => {
    try {
        const wheel = await Wheel.findById(req.params.id);
        if (!wheel) {
            return res.status(404).json({ message: `Roda com ID ${req.params.id} não encontrada.` });
        }
        res.status(200).json(wheel);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Atualizar uma roda


app.put('/wheels/:id', async (req, res) => {
    const { title, diameter, width, boltPattern, color, offset, insideSpace, backsideSpace, frontSpace, weight, cb } = req.body;


    // Validação dos campos


    if (!title || !diameter || !width || !boltPattern || !color || !offset || !insideSpace || !backsideSpace || !frontSpace || !weight || !cb) {
        return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
    }

    try {
        const wheel = await Wheel.findById(req.params.id);
        if (!wheel) {
            return res.status(404).json({ message: `Roda com ID ${req.params.id} não encontrada.` });
        }


        // Atualiza os dados da roda


        wheel.title = title;
        wheel.diameter = diameter;
        wheel.width = width;
        wheel.boltPattern = boltPattern;
        wheel.color = color;
        wheel.offset = offset;
        wheel.insideSpace = insideSpace;
        wheel.backsideSpace = backsideSpace;
        wheel.frontSpace = frontSpace;
        wheel.weight = weight;
        wheel.cb = cb;

        const updatedWheel = await wheel.save();
        res.status(200).json({ success: true, message: 'Roda atualizada com sucesso!', data: updatedWheel });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});


// Deletar uma roda


app.delete('/wheels/:id', async (req, res) => {
    try {
        const wheel = await Wheel.findByIdAndDelete(req.params.id);
        if (!wheel) {
            return res.status(404).json({ message: `Roda com ID ${req.params.id} não encontrada.` });
        }
        res.status(200).json({ success: true, message: 'Roda deletada com sucesso!' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Define a porta do servidor


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor da Agusto Wheels rodando na porta ${PORT}`);
});