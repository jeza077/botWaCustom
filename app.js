const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
} = require('@bot-whatsapp/bot')

const MetaProvider = require('@bot-whatsapp/provider/meta')
// const MySQLAdapter = require('@bot-whatsapp/database/mysql')
const MockAdapter = require('@bot-whatsapp/database/mock')


/**
 * Declaramos las conexiones de MySQL
 */
// const MYSQL_DB_HOST = 'localhost'
// const MYSQL_DB_USER = 'root'
// const MYSQL_DB_PASSWORD = ''
// const MYSQL_DB_NAME = 'bot'

/**
 * Aqui declaramos los flujos hijos, los flujos se declaran de atras para adelante, es decir que si tienes un flujo de este tipo:
 *
 *          Menu Principal
 *           - SubMenu 1
 *             - Submenu 1.1
 *           - Submenu 2
 *             - Submenu 2.1
 *
 * Primero declaras los submenus 1.1 y 2.1, luego el 1 y 2 y al final el principal.
 */

// const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer([
//     '📄 Aquí tenemos el flujo secundario',
// ])

// const flowDocs = addKeyword([
//     'doc',
//     'documentacion',
//     'documentación',
// ]).addAnswer(
//     [
//         '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
//         'https://bot-whatsapp.netlify.app/',
//         '\n*2* Para siguiente paso.',
//     ],
//     null,
//     null,
//     [flowSecundario]
// )




const flowPrincipal = addKeyword(['hola', 'ole', 'alo'])
    .addAnswer('🙌 Hola bienvenido a este *Chatbot*')


const main = async () => {
    // const adapterDB = new MySQLAdapter({
    //     host: MYSQL_DB_HOST,
    //     user: MYSQL_DB_USER,
    //     database: MYSQL_DB_NAME,
    //     password: MYSQL_DB_PASSWORD,
    // })
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])

    const adapterProvider = createProvider(MetaProvider, {
        jwtToken: process.env.TOKEN_WA,
        numberId: process.env.NUMBER_ID,
        verifyToken: process.env.VERIFY_TOKEN,
    })

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })
}

main()
