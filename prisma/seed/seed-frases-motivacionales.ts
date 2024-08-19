import { PrismaClient } from '@prisma/client';

export async function uploadCompasionInterior() {
  const prisma = new PrismaClient();
  await addFrases(prisma);
  await prisma.$disconnect();
}

async function addFrases(prisma: PrismaClient) {
  await prisma.phrase.upsert({
    where: {
      id: 'frase-1-1',
    },
    update: {},
    create: {
      id: 'frase-1-1',
      content: 'La capacidad de evocar la respuesta de relajación es un don universal que pertenece a todo ser humano.',
      author: 'Herbert Benson',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-1-2',
    },
    update: {},
    create: {
      id: 'frase-1-2',
      content: 'El estrés es la peor epidemia moderna, y aprender a manejarlo es fundamental para vivir una vida saludable.',
      author: 'Herbert Benson',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-1-3',
    },
    update: {},
    create: {
      id: 'frase-1-3',
      content: 'La mente y el cuerpo son inseparables, y para alcanzar la salud óptima debemos cuidar de ambos.',
      author: 'Herbert Benson',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-1-4',
    },
    update: {},
    create: {
      id: 'frase-1-4',
      content:
        'El cuerpo tiene una capacidad inherente para la curación, y la respuesta de relajación es una herramienta poderosa para activar esa capacidad.',
      author: 'Herbert Benson',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-1-5',
    },
    update: {},
    create: {
      id: 'frase-1-5',
      content:
        'La meditación y otras prácticas mente-cuerpo no son solo formas de relajación, son herramientas esenciales para manejar el estrés y mejorar la salud.',
      author: 'Herbert Benson',
    },
  });
  //Jon Kabat-Zinn
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-1',
    },
    update: {},
    create: {
      id: 'frase-2-1',
      content: 'La atención plena significa prestar atención de una manera particular: a propósito, en el momento presente y sin juzgar.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-2',
    },
    update: {},
    create: {
      id: 'frase-2-2',
      content: 'No puedes detener las olas, pero puedes aprender a surfear.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-3',
    },
    update: {},
    create: {
      id: 'frase-2-3',
      content: 'La vida solo está disponible en el momento presente. Si abandonas el momento presente, no puedes vivir profundamente.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-4',
    },
    update: {},
    create: {
      id: 'frase-2-4',
      content: 'La mejor manera de capturar momentos es prestando atención. Así es como cultivamos la atención plena.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-5',
    },
    update: {},
    create: {
      id: 'frase-2-5',
      content: 'El momento presente es el único momento sobre el que tenemos algún dominio.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-6',
    },
    update: {},
    create: {
      id: 'frase-2-6',
      content: 'La atención plena no es una técnica sino una forma de ser.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-7',
    },
    update: {},
    create: {
      id: 'frase-2-7',
      content: 'Lo que parece difícil es justamente lo que debe hacerse para avanzar.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-8',
    },
    update: {},
    create: {
      id: 'frase-2-8',
      content: 'Tú no eres tus pensamientos. La mente es una función, no una identidad.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-9',
    },
    update: {},
    create: {
      id: 'frase-2-9',
      content: 'Respirar conscientemente es una de las formas más simples y directas de conectarse con el momento presente.',
      author: 'Jon Kabat-Zinn',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-2-10',
    },
    update: {},
    create: {
      id: 'frase-2-10',
      content: 'En cada momento hay mil posibilidades de ser más amable, más agradecido, más presente.',
      author: 'Jon Kabat-Zinn',
    },
  });
  // Paul Gilbert
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-1',
    },
    update: {},
    create: {
      id: 'frase-3-1',
      content: 'La compasión no es una debilidad, es una fuerza que puede transformar nuestras vidas.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-2',
    },
    update: {},
    create: {
      id: 'frase-3-2',
      content:
        'La compasión se trata de ser sensible al sufrimiento en nosotros mismos y en los demás, con un compromiso de aliviar y prevenir ese sufrimiento.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-3',
    },
    update: {},
    create: {
      id: 'frase-3-3',
      content:
        'Ser compasivo con uno mismo es fundamental para la salud mental y el bienestar. No podemos ser verdaderamente compasivos con los demás si no podemos serlo con nosotros mismos.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-4',
    },
    update: {},
    create: {
      id: 'frase-3-4',
      content:
        'La autocrítica es una de las mayores barreras para la compasión. Aprender a ser compasivo con uno mismo puede transformar la autocrítica en una fuerza constructiva.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-5',
    },
    update: {},
    create: {
      id: 'frase-3-5',
      content:
        'La compasión no es solo un sentimiento, es una motivación y una acción. Es la intención de aliviar el sufrimiento y hacer algo al respecto.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-6',
    },
    update: {},
    create: {
      id: 'frase-3-6',
      content:
        'Desarrollar la compasión requiere coraje. Es un viaje de entendimiento y conexión profunda con nosotros mismos y con los demás.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-7',
    },
    update: {},
    create: {
      id: 'frase-3-7',
      content:
        'La compasión tiene el poder de cambiar nuestra relación con el dolor y la dificultad, transformando cómo nos relacionamos con nosotros mismos y con el mundo.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-8',
    },
    update: {},
    create: {
      id: 'frase-3-8',
      content:
        'La compasión no significa ser indulgente con uno mismo; significa ser gentil y comprensivo mientras trabajamos hacia el cambio y el crecimiento.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-9',
    },
    update: {},
    create: {
      id: 'frase-3-9',
      content: 'La verdadera compasión nace del entendimiento profundo del sufrimiento humano y el deseo de aliviar ese sufrimiento.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-3-10',
    },
    update: {},
    create: {
      id: 'frase-3-10',
      content: 'La compasión es una habilidad que se puede cultivar y fortalecer con práctica y compromiso.',
      author: 'Paul Gilbert',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-1',
    },
    update: {},
    create: {
      id: 'frase-4-1',
      content:
        'La autocompasión no significa sentir lástima por uno mismo, sino tratarse con amabilidad y comprensión durante los momentos difíciles.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-2',
    },
    update: {},
    create: {
      id: 'frase-4-2',
      content: 'La autocompasión consiste en ser amable y comprensivo contigo mismo cuando las cosas no van como esperas.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-3',
    },
    update: {},
    create: {
      id: 'frase-4-3',
      content: 'La autocompasión implica ser tu propio mejor amigo en lugar de tu peor crítico.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-4',
    },
    update: {},
    create: {
      id: 'frase-4-4',
      content: 'La autocompasión te permite aceptar tus fallas y errores con humanidad en lugar de vergüenza y autocrítica.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-5',
    },
    update: {},
    create: {
      id: 'frase-4-5',
      content:
        'La autocompasión es un acto de valentía que nos permite enfrentar el dolor y la adversidad con bondad hacia nosotros mismos.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-6',
    },
    update: {},
    create: {
      id: 'frase-4-6',
      content: 'Cultivar la autocompasión nos ayuda a desarrollar una mayor resiliencia emocional y bienestar general.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-7',
    },
    update: {},
    create: {
      id: 'frase-4-7',
      content: 'La autocompasión no es un lujo, es una necesidad fundamental para una salud mental y emocional equilibrada.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-8',
    },
    update: {},
    create: {
      id: 'frase-4-8',
      content:
        'La autocompasión nos permite reconocer nuestra humanidad compartida y conectarnos con otros desde un lugar de comprensión y empatía.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-9',
    },
    update: {},
    create: {
      id: 'frase-4-9',
      content:
        'La autocompasión nos enseña a ser amables con nosotros mismos no solo cuando tenemos éxito, sino también cuando enfrentamos desafíos y fracasos.',
      author: 'Kristin Neff',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-4-10',
    },
    update: {},
    create: {
      id: 'frase-4-10',
      content:
        'La autocompasión no significa ignorar nuestros problemas, sino abordarlos con una actitud de cuidado y comprensión hacia nosotros mismos.',
      author: 'Kristin Neff',
    },
  });

  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-1',
    },
    update: {},
    create: {
      id: 'frase-8-1',
      content: 'La psicología positiva no solo trata de sentirse bien, sino de hacer el bien.',
      author: 'Martin Seligman',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-2',
    },
    update: {},
    create: {
      id: 'frase-8-2',
      content: 'La felicidad no es la ausencia de problemas, sino la habilidad de manejarlos.',
      author: 'unknown',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-3',
    },
    update: {},
    create: {
      id: 'frase-8-3',
      content: 'Cultivar emociones positivas puede aumentar nuestra resiliencia y capacidad para enfrentar desafíos.',
      author: 'unknown',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-4',
    },
    update: {},
    create: {
      id: 'frase-8-4',
      content: 'La gratitud puede transformar lo que tenemos en suficiente y más.',
      author: 'unknown',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-5',
    },
    update: {},
    create: {
      id: 'frase-8-5',
      content: 'La autenticidad es la clave para sentirse satisfecho con la vida y con uno mismo.',
      author: 'unknown',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-6',
    },
    update: {},
    create: {
      id: 'frase-8-6',
      content: 'El optimismo es la fe que conduce al logro. Nada se puede hacer sin esperanza y confianza.',
      author: 'Helen Keller',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-7',
    },
    update: {},
    create: {
      id: 'frase-8-7',
      content:
        'La psicología positiva se trata de identificar y potenciar nuestras fortalezas para vivir una vida más plena y significativa',
      author: 'unknown',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-8',
    },
    update: {},
    create: {
      id: 'frase-8-8',
      content: 'El bienestar no es un lujo, sino una necesidad fundamental para una vida saludable y satisfactoria.',
      author: 'unknown',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-9',
    },
    update: {},
    create: {
      id: 'frase-8-9',
      content: 'La resiliencia se fortalece a través de la adversidad. Las crisis pueden ser oportunidades para crecer y aprender',
      author: 'unknown',
    },
  });
  await prisma.phrase.upsert({
    where: {
      id: 'frase-8-10',
    },
    update: {},
    create: {
      id: 'frase-8-10',
      content: 'El enfoque en lo positivo puede cambiar nuestra perspectiva y mejorar nuestra calidad de vida.',
      author: 'unknown',
    },
  });
}
