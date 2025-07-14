import type { Demand } from '../types/demand';

export const mockDemands: Demand[] = [
  {
    id: 1,
    title: "Fournitures de bureau",
    description: "Demande de fournitures de bureau pour le mois de janvier incluant papier, stylos, et autres articles essentiels.",
    articles: [
      {
        id: 1,
        name: "Papier A4",
        quantity: 50,
        description: "Ramettes de papier A4 blanc"
      },
      {
        id: 2,
        name: "Stylos",
        quantity: 20,
        description: "Stylos bleus et noirs"
      },
      {
        id: 3,
        name: "Agrafeuses",
        quantity: 5,
        description: "Agrafeuses de bureau standard"
      }
    ],
    fileName: "facture_janvier.pdf",
    fileUrl: "/uploads/facture_janvier.pdf",
    status: "pending",
    createdAt: "2024-01-15T08:30:00Z",
    createdBy: "Mohamed Benali"
  },
  {
    id: 2,
    title: "Matériel informatique",
    description: "Demande de matériel informatique pour équiper les nouveaux employés.",
    articles: [
      {
        id: 4,
        name: "Clavier",
        quantity: 3,
        description: "Claviers AZERTY sans fil"
      },
      {
        id: 5,
        name: "Souris",
        quantity: 3,
        description: "Souris optiques sans fil"
      }
    ],
    fileName: "devis_materiel.pdf",
    fileUrl: "/uploads/devis_materiel.pdf",
    status: "approved",
    createdAt: "2024-01-10T14:20:00Z",
    createdBy: "Fatima Zahra"
  },
  {
    id: 3,
    title: "Mobilier de bureau",
    description: "Demande de mobilier pour l'aménagement du nouveau bureau.",
    articles: [
      {
        id: 6,
        name: "Chaises de bureau",
        quantity: 10,
        description: "Chaises ergonomiques avec roulettes"
      },
      {
        id: 7,
        name: "Bureaux",
        quantity: 5,
        description: "Bureaux en bois avec tiroirs"
      }
    ],
    status: "rejected",
    createdAt: "2024-01-05T10:45:00Z",
    createdBy: "Ahmed Alami",
    rejectionComment: "Budget insuffisant pour cette période"
  }
];
