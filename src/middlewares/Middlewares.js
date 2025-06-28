function checkCPF(req, res, next) {
    if (!req.body.cpf) {
        return res.status(400).send({ message: "CPF inválido" });
    }

    const cpfLimpo = req.body.cpf.replace(/\D/g, "");

    if (cpfLimpo.length !== 11 || /^(\d)\1+$/.test(cpfLimpo)) {
        return res.status(400).send({ message: "CPF inválido" });
    }

    const calcDigito = (cpf, pos) => {
        const slice = cpf.slice(0, pos - 1);
        let soma = 0;
        let peso = pos;

        for (let i = 0; i < slice.length; i++) {
            soma += parseInt(slice[i]) * peso--;
        }

        let resto = (soma * 10) % 11;
        return resto === 10 ? 0 : resto;
    };

    const digito1 = calcDigito(cpfLimpo, 10);
    const digito2 = calcDigito(cpfLimpo, 11);

    if (digito1 !== parseInt(cpfLimpo[9]) || digito2 !== parseInt(cpfLimpo[10])) {
        return res.status(400).send({ message: "CPF inválido" });
    }

  return next();
}

function checkNomePrato(req, res, next) {
    if (!req.body.nome) {
        return res.status(400).send({ message: "Nome do prato inválido" });
    }

    const regex = /^[A-Za-zÀ-ÿ\s]{3,50}$/;

    if (!regex.test(req.body.nome)) {
        return res.status(400).send({ message: "Nome do prato deve conter apenas letras e ter entre 3 a 50 caracteres" });
    }

    return next();
}

module.exports = { checkCPF, checkNomePrato };
