// Mission d'Espionnage - Opération Molsheim
export const gameData = {
  // Configuration générale
  config: {
    gameName: "OPÉRATION SAJ",
    codeName: "MISSION CLASSIFIED",
    description:
      "🕵️ BIENVENUE AGENTS ! Vous avez été enlevés contre votre gré car nous voulons tester votre courage et votre bravour ! Votre mission, si vous l'acceptez, est de vérifier que Molsheim ne soit pas sous une menace imminente. Déchiffrez les codes, infiltrez les lieux secrets, et accomplissez votre mission avant qu'il ne soit trop tard... Vous ne rentrerez chez vous uniquement si vous arrivez à vous défaire des épreuves de l'Agent secret CH ! Attention, le temps est compté ! Si vous ne réussissez pas, vous devrez rester avec nous jusqu'à ce que vous puissiez prouver votre valeur ! Une dernière chose : Si vous éteignez votre écran, votre progression sera fortement altérée...",
    agencyName: "SAJ AGENCY",
    centerCoordinates: [48.54193262298999, 7.498850724670674],
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
        "Agent, votre première mission vous mène vers un bâtiment où les secrets du passé sont conservés. Vérifiez qu'il y ait aucun dispositif de surveillance. Déchiffrez ce code :",
      encryptedMessage: "CJCMJPUIFRVF",
      cipher: "César +1",
      hint: "Chaque lettre a été décalée d'une position dans l'alphabet...",
      solution: "BIBLIOTHÈQUE",
      coordinates: [48.54254031834278, 7.490112242517967],
      locationName: "Centre de Renseignements Alpha",
      coverStory: "Bibliothèque Municipale",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective:
        "Récupérer les archives secrètes et neutraliser le dispositif de surveillance",
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
      cipher: "Position alphabétique",
      hint: "Chaque nombre correspond à la position d'une lettre dans l'alphabet (A=1, B=2...)",
      solution: "PORTE DES FORGERONS",
      coordinates: [48.54041704074538, 7.492124070158462],
      locationName: "Tour de Communication Bravo",
      coverStory: "Porte des Forgerons",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective:
        "Intercepter les transmissions ennemies et sécuriser la tour",
      dangerLevel: "MODÉRÉ",
      unlocked: false,
    },
    {
      id: 3,
      codeName: "OPERATION FORTRESS",
      classification: "ULTRA SECRET",
      briefing:
        "Vouz pourrez poursuivre seulement après avoir vu un jacquemart fonctionnel !",
      encryptedMessage: "NVGART",
      cipher: "Atbash",
      hint: "A=Z, B=Y, C=X... L'alphabet est inversé !",
      solution: "METZIG",
      coordinates: [48.541713392268235, 7.492573033141858],
      locationName: "Marché de la viande",
      coverStory: "Restaurant de la Metzig",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective:
        "Infiltrer le laboratoire et récupérer les données sensibles",
      dangerLevel: "ÉLEVÉ",
      unlocked: false,
    },
    {
      id: 4,
      codeName: "OPERATION CROSSROADS",
      classification: "SECRET DÉFENSE",
      briefing:
        "Le point de rencontre de tous les réseaux d'espionnage. C'est ici que les agents échangent des informations vitales. Allez vérifier que personne se s'y trouve ! EN SILENCE !",
      encryptedMessage: "GANTÉ",
      cipher: "Palindrome",
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
        "Il parait qu'il y a un second point de rendez-vous, au cas où... Vite ! Allez vérifier que personne ne s'y trouve !",
      encryptedMessage: "",
      cipher: "Anagramme",
      hint: "Remettez les lettres dans l'ordre",
      solution: "CSPOAEADRUNSTRE",
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
      classification: "MISSION FINALE",
      briefing:
        "Votre base secrète vous attend. C'est ici que tout a commencé.",
      encryptedMessage: "HKYWH FQAJHO",
      cipher: "César -4",
      hint: "Reculez de 4 positions dans l'alphabet pour chaque lettre...",
      solution: "ÉCOLE",
      coordinates: [48.54251425321889, 7.492476744544179],
      locationName: "QG Central Echo",
      coverStory: "Local Jeunes",
      image: "/placeholder.svg?height=200&width=300",
      missionObjective:
        "Mission accomplie ! Débriefing complet et extraction sécurisée",
      dangerLevel: "VITALE",
      unlocked: false,
    },
  ],

  // Messages et codes secrets
  messages: {
    missionComplete:
      "🎖️ MISSION ACCOMPLIE ! Félicitations Agents ! Vous avez réussi votre mission ! Votre bravoure et votre intelligence ont permis de prouver que Molsheim ne court aucun danger. L'Agence vous remercie !",
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
