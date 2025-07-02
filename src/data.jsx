// Mission d'Espionnage - Opération Molsheim
export const gameData = {
  // Configuration générale
  config: {
    gameName: "OPÉRATION SAJ",
    codeName: "MISSION CLASSIFIED",
    description:
      "🕵️ BIENVENUE AGENTS ! <br />Je suis l'Agent CHP, de l'Agence SAJ ! <br/><br /> Vous avez été enlevés contre votre gré car nous voulons tester votre courage et votre bravoure ! <br /><br />Votre mission, si vous l'acceptez, est de vérifier que Molsheim ne soit pas sous une menace imminente. <br />Déchiffrez les codes, infiltrez les lieux secrets, sécurisez le périmètre et accomplissez votre mission avant qu'il ne soit trop tard... <br />Vous ne rentrerez chez vous uniquement si vous arrivez à vous défaire des épreuves concoctées par l'Agent LEBOSS ! <br /><br />Attention, le temps est compté !<br />Mais nous avons besoin de forces vives...<br /><br /> Ne courez pas !<br /> Un agent se doit d'être le plus discret possible, ne doit pas attirer l'attention !<br /> Si vous ne réussissez pas, vous devrez rester avec nous jusqu'à ce que vous puissiez prouver votre valeur ! <br /><br />Une dernière chose : <br /> Si vous éteignez votre écran, votre progression sera fortement altérée... <br/><br /> Et mise à part votre feuille de route que vous avez entre les mains, vous n'aurez pas droit à vos systèmes informatiques portables, à moins que je vous l'y autorise, selon mon humeur...",
    agencyName: "SAJ AGENCY",
    centerCoordinates: [48.54200189313992, 7.492192487839465],
    zoomLevel: 14,
    timeOptions: [30, 45, 60, 90, 120, 180], // Options de temps en minutes
  },

  // Missions secrètes avec codes et coordonnées
  missions: [
    {
      id: 1,
      codeName: "OPERATION BOOKWORM",
      classification: "TOP SECRET",
      briefing:
        "Agents, votre première mission vous mène vers un bâtiment où les secrets du passé sont conservés. Vérifiez qu'il y ait aucun dispositif de surveillance ennemi. Déchiffrez ce code :",
      encryptedMessage: "CJCMJPUIFRVF",

      hint: "Chaque lettre a été décalée d'une position dans l'alphabet...",
      solution: "BIBLIOTHÈQUE",
      coordinates: [48.54254031834278, 7.490112242517967],
      locationName: "Centre de Renseignements Alpha",
      coverStory: "Bibliothèque Municipale",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective:
        "Seuls les appareils de surveillance de la ville doivent être fonctionnels",
      dangerLevel: "FAIBLE",
      unlocked: true,
    },
    {
      id: 2,
      codeName: "OPERATION BELL TOWER",
      classification: "CONFIDENTIEL",
      briefing:
        "La cloche est utilisée pour sonner à six heures du matin l'ouverture des portes de la ville et à dix heures du soir leur fermeture. La cloche est-elle toujours en place ?",
      encryptedMessage: "16-15-18-20-5 4-5-19 6-15-18-7-5-18-15-14-19",

      hint: "Chaque nombre correspond à la position d'une lettre dans l'alphabet (A=1, B=2...)",
      solution: "PORTE DES FORGERONS",
      coordinates: [48.54041704074538, 7.492124070158462],
      locationName: "Tour de Communication Bravo",
      coverStory: "Porte des Forgerons",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective:
        "Aucune transmission ennemie ne doit être visible. Profitez-en pour sécuriser les alentours !",
      dangerLevel: "MODÉRÉ",
      unlocked: false,
    },
    {
      id: 3,
      codeName: "OPERATION FORTRESS",
      classification: "ULTRA SECRET",
      briefing:
        "Vouz ne pourrez poursuivre qu'après avoir vu un jacquemart fonctionnel !",
      encryptedMessage: "NVGART",

      hint: "A=Z, B=Y, C=X... L'alphabet est inversé !",
      solution: "METZIG",
      coordinates: [48.541713392268235, 7.492573033141858],
      locationName: "Marché de la viande",
      coverStory: "Restaurant de la Metzig",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective: "Aucune donnée sensible doit être affichée ici !",
      dangerLevel: "ÉLEVÉ",
      unlocked: false,
    },
    {
      id: 4,
      codeName: "OPERATION CROSSROADS",
      classification: "SECRET DÉFENSE",
      briefing:
        "Le point de rencontre de tous les réseaux d'espionnage. C'est ici que les agents échangent des informations vitales. Allez vérifier que personne de suspect ne s'y trouve ! EN SILENCE !",
      encryptedMessage: "GANTÉ",

      hint: "Prenez les lettres à l'envers",
      solution: "ÉTANG",
      coordinates: [48.54771039284073, 7.502957253135556],
      locationName: "Point de Rendez-vous Delta",
      coverStory: "Étang du Zich",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective: "Personne de suspect ne doit se trouver ici.",
      dangerLevel: "CRITIQUE",
      unlocked: false,
    },

    {
      id: 5,
      codeName: "OPERATION INVISIBLE",
      classification: "SECRET D'ÉTAT",
      briefing:
        "Il parait qu'il y a un second point de rendez-vous, au cas où... Vite ! Allez vérifier que personne de suspect ne s'y trouve ! Sans courir, car on risquerait de vous soupçonner d'on ne sait trop quoi... Vous êtes agents secrets !",
      encryptedMessage: "CSPOAEADRUNSTRE",

      hint: "Remettez les lettres dans l'ordre",
      solution: "PARCOURS DE SANTÉ",
      coordinates: [48.53343556908021, 7.488959149367639],
      locationName: "Point de Rendez-vous Gamma",
      coverStory: "Parcours de santé",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective: "Personne de suspect ne doit se trouver ici.",
      dangerLevel: "CRITIQUE",
      unlocked: false,
    },

    {
      id: 6,
      codeName: "OPERATION HOMECOMING",
      classification: "MISSION QUARTER",
      briefing:
        "Votre base secrète vous attend. C'est ici que tout a commencé.",
      encryptedMessage: "HKYWH FQAJHO",

      coordinates: [48.54251425321889, 7.492476744544179],
      locationName: "QG Central Echo Alpha",
      coverStory: "Local Jeunes",
      hint: "Reculez de 4 positions dans l'alphabet pour chaque lettre...",
      solution: "LOCAL JEUNES",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective:
        "Mission accomplie ! Débriefing complet et extraction sécurisée",
      dangerLevel: "CRITIQUE",
      unlocked: false,
    },

    {
      id: 7,
      codeName: "OPERATION DÉMASQUAGE",
      classification: "MISSION DEMI-FINALE",
      briefing: "Qui est vraiment LEBOSS qui vous teste ?",
      encryptedMessage:
        ".. .-.. / . ... - / -.. . ...- .- -. - / ...- --- ..- ... / -.-.--",

      hint: "C'est du morse... Et n'oubliez pas une ponctuation...",
      solution: "IL EST DEVANT VOUS !",

      coordinates: [48.54251425321889, 7.492476744544179],
      locationName: "QG Central Echo Alpha",
      coverStory: "Local Jeunes",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective: "Mission (presque) accomplie !",
      dangerLevel: "VITALE",
      unlocked: false,
    },
    {
      id: 8,
      codeName: "OPERATION AWARD",
      classification: "MISSION DESSERT",
      briefing: "On vous doit une fière chandelle...",
      encryptedMessage: "2(400 x 83) + (9 x 8 x (1000/100))",

      hint: "Priorisez...",
      solution: "67120",
      coordinates: [48.54251425321889, 7.492476744544179],
      locationName: "QG Central Echo Alpha",
      coverStory: "Local Jeunes",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective:
        "MISSION TOTALE ! Débriefing complet et extraction sécurisée",
      dangerLevel: "FAIBLE",
      unlocked: false,
    },
  ],

  // Messages et codes secrets
  messages: {
    missionComplete:
      "Félicitations Agents ! <br /><br />Vous avez réussi votre mission !<br /> Votre bravoure et votre intelligence ont permis de prouver que Molsheim ne court aucun danger. <br /><br />L'Agence vous remercie et vous recontactera rapidement pour un contrat !",
    timeUp:
      "⚠️ Le temps est écoulé Agents ! Vous êtes condamnés à rester au sein de l'Agence jusqu'à ce que vous puissiez prouver ce qu'on attend de vous !",
    wrongCode:
      "❌ CODE INCORRECT ! Attention Agents, n'oubliez pas que le temps est compté...",
    correctCode:
      "✅ CODE DÉCHIFFRÉ ! Excellent travail Agents ! Prochaine mission débloquée !",
    accessDenied:
      "🔒 ACCÈS REFUSÉ ! Vous devez d'abord accomplir la mission précédente !",
    missionBriefing: "📋 BRIEFING DE MISSION",
    classified: "CLASSIFIÉ",
  },

  // Niveaux de danger et couleurs
  dangerLevels: {
    FAIBLE: { color: "#28a745", icon: "🟢" },
    MODÉRÉ: { color: "#ffc107", icon: "🟡" },
    ÉLEVÉ: { color: "#fd7e14", icon: "🟠" },
    CRITIQUE: { color: "#dc3545", icon: "🔴" },
    VITALE: { color: "#6f42c1", icon: "🟣" },
  },

  // Effets sonores et visuels
  effects: {
    typing: true,
    glitch: true,
    particles: true,
    scanlines: true,
    matrix: true,
  },
};
