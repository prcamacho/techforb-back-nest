import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HomeController {
  @Get()
  getHomePage(): string {
    console.log("Pasa por el getHomePage")
    return `
<html>
      <body>
        <h1>Backend de proyecto TechForB by Pablo Camacho</h1>
        <ul>
        <li>Usar Body - raw - json en Postman</li>
        
        <br><strong>Registrarse</strong>
        <li>email , password Post: https://techforb-back.pablocamacho.com.ar/register</li>
        <br><strong>Loguearse</strong>
        <li>email , password Post: https://techforb-back.pablocamacho.com.ar/login</li>
        <br><strong>Obtener alertas por tipo "niveles" , "viento", etc</strong> 
        <li>Get: https://techforb-back.pablocamacho.com.ar/alerts/tension </li>
        <br><strong>Cargar Planta con nombre y pais</strong>
        <li>name, country Post: https://techforb-back.pablocamacho.com.ar/plants</li>
        <br><strong>Editar una planta para agregarle severidades de alertas</strong>
        <li>"name": "Nombre de la planta",
        "country": "País de la planta",
        "alertSeverities": [
          {
            "severity": "Puede ser ok, media, roja",
            "count": "Cantidad de alertas de esta severidad"
          },
          ... Se puede mandar de las 3 severidades al mismo tiempo
        ]
      } Post: https://techforb-back.pablocamacho.com.ar/createAlerts</li>
      <br><strong>Obetener alertas por severidad</strong>
      <li>"ok" , "media" , "roja" Get: https://techforb-back.pablocamacho.com.ar/alerts/severity/:severity</li>
      <br><strong>Obtener el total de alertas y cantidad de cada severidad por planta</strong>
      <li>Para armar la tablota de severity por planta Get: https://techforb-back.pablocamacho.com.ar/plants/alerts</li>
      <br><strong>Borra alertas y planta de la BD</strong>
      <li>Para Borrar Delete: https://techforb-back.pablocamacho.com.ar/plants/:name</li>
      <br><strong>Pendiente</strong>
      <li>No borrar de la BD solo desactivar, agregar nombre al registrarse</li>
        
      </ul>
      </body>
    </html>
    `;
  }
}
