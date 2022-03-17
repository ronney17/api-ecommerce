const mongoose = require('mongoose')
const { isEmail } = require('validator')

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema({
    name: {
        /* The name of this User */

        type: String,
        required: [true, 'Por favor, insira um nome para o usuário'],
        maxlength: [100, 'Nome não pode conter mais de 100 caracteres'],
    },
    cpf: {
        /* The CPF of this User */

        type: String,
        required: [true, 'Por favor, insira um CPF para o usuário'],
        minlength: [11, 'CPF deve conter 11 caracteres'],
        maxlength: [11, 'CPF deve conter 11 caracteres'],
    },
    telephone: {
        /* The telephone number of this User */

        type: String,
        required: [true, 'Por favor, insira um número de telefone'],
        minlength: [9, 'Número deve conter no mínimo 9 caracteres'],
        maxlength: [13, 'Número deve conter no máximo 13 caracteres']
    },
    birthDate: {
        /* User birth date */

        type: String,
        required: [true, 'Por favor, insira uma data de nascimento']
    },
    sex: {
        /* User sex */

        type: String,
        default: 'Não informado'
    },
    email: {
        /* User e-mail */

        type: String,
        required: [true, 'Por favor, insira um e-mail'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Por favor, insira um e-mail valido']
    },
    password: {
        /* User password */

        type: String,
        required: [true, 'Por favor, insira uma senha.'],
        minlength: [8, 'Senha deve conter no mínimo 8 caracteres']
    },
    type: {
        /* User type */

        type: Number,
        required: [true, 'Por favor, insira o tipo de usuário.'],
        default: 1
    },
    addresses: [{
        cep: {
            /* User type */
    
            type: String,
            required: [true, 'Por favor, insira o cep.'],
            minlength: [8, 'Cep deve conter no mínimo 8 números']
        },
        street: {
            /* User street name */
    
            type: String,
            required: [true, 'Por favor, insira o nome da rua.']
        },
        number: {
            /* User house number */
    
            type: String,
            required: [true, 'Por favor, insira o número da casa.']
        },
        neighborhood: {
            /* User neighborhood */
    
            type: String,
            required: [true, 'Por favor, insira o bairro.']
        },
        city: {
            /* User city */
    
            type: String,
            required: [true, 'Por favor, insira a cidade.']
        },
        state: {
            /* User state */
    
            type: String,
            required: [true, 'Por favor, insira o estado.']
        },
        complement: {
            /* User address complement */
    
            type: String,
            default: 'Não informado'
        }
    }],
    activation: {
        /* Is User activated? */
        type: Boolean,
        required: true,
        default: false
    }

},{ timestamps: true })

module.exports = mongoose.model('user', UserSchema)