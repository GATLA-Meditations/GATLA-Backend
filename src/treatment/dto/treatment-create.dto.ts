import { ContentType } from '@prisma/client';

export default class TreatmentCreateDto {
  name: string;
  description: string;
  modules: ModuleCreateDto[];
  questionnaires: string[];
}

export class ModuleCreateDto {
  order: number;
  name: string;
  description: string;
  activities: ActivityCreateDto[];
}

export class ActivityCreateDto {
  order: number;
  name: string;
  contents: ContentCreateDto[];
}

export class ContentCreateDto {
  order: number;
  type: ContentType;
  content: string;
}
// ! Ejemplo de JSON para crear un tratamiento
// {
//     "name": "Nombre del tratamiento",
//     "description": "Descripción detallada del tratamiento",
//     "modules": [
//       {
//         "order": 1,
//         "name": "Nombre del módulo",
//         "description": "Descripción del módulo",
//         "activities": [
//           {
//             "order": 1,
//             "name": "Nombre de la actividad",
//             "contents": [
//               {
//                 "order": 1,
//                 "type": "TIPO_DE_CONTENIDO",  // Podría ser texto, imagen, video, etc.
//                 "content": "Contenido correspondiente (puede ser un texto, una URL, etc.)"
//               }
//             ]
//           }
//         ]
//       }
//     ],
//     "questionnaires": [
//       "ID_Cuestionario_1",
//       "ID_Cuestionario_2"
//     ]
//   }
