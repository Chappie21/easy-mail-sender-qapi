export const formatRequestOwnerNotificationHTML = (
    name: string,
    description: string,
    phone?: string,
    email?: string
) => `
    <h2>Nueva solicitud de cotizacion</h2>
    <br/>

    <ul>
        <li><strong>Nombre:</strong> ${name} </li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Telefono:</strong> ${phone}</li>
    </ul>
    <br/>
    
    <h2>Descripcion del proyecto:</h2>
    <p>${description}</p>
`;

export const formatRequestClientNotificationHTML = () => `
    <h2>Hemos recibido tu solicitud!</h2>
    <br/>

    <p>Estaremos revisando y cotizando tu solicitud. Estaremos contactandote para coordinar y aclarar detalles</p>
    <p>Muchas gracias por confiar en nosotros!</p>
    <br/>

    <span>
        <strong>Impresiones 3d Mcbo<strong>
    <span>
`;