import React from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { ThemeProvider } from '../../context/ThemeContext';
// import { useDemand } from '../../hooks/useDemands';
import { DemandDetailsContent } from '../../components/demand/DemandDetailsContent';
import { DemandDetailsSkeleton } from '../../components/ui/DemandDetailsSkeleton';
// import { ErrorMessage } from '../../components/ui/ErrorMessage';
import type { Demand } from '../../types/demand';

export const DemandDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Commented out real API call
  // const { data: demand, isLoading, error } = useDemand(id!);

  // Dummy loading state for demonstration
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Dummy data
  const dummyDemand: Demand = {
    id: parseInt(id || '1'),
    title: 'Demande de fournitures de bureau pour le T4 2024',
    description: 'Nous devons reconstituer nos fournitures de bureau pour le trimestre à venir. Cela comprend la papeterie, les matériaux d\'impression et l\'équipement de bureau. Veuillez vous assurer que tous les articles sont de bonne qualité et livrés dans les délais spécifiés. La priorité doit être donnée aux options écologiques lorsqu\'elles sont disponibles.',
    status: 'pending',
    createdAt: '2024-01-15T10:30:00.000Z',
    createdBy: 'Jean Dupont',
    fileName: 'specifications-fournitures-bureau.pdf',
    fileUrl: 'https://example.com/files/specifications-fournitures-bureau.pdf',
    rejectionComment: undefined,
    articles: [
      {
        id: 1,
        name: 'Papier A4',
        description: 'Papier d\'impression blanc A4 de haute qualité, 80g/m²',
        quantity: 50,
        price: 89.99
      },
      {
        id: 2,
        name: 'Stylos Bleus',
        description: 'Stylos à bille avec encre bleue, pack de 10',
        quantity: 20,
        price: 125.00
      },
      {
        id: 3,
        name: 'Toner d\'imprimante',
        description: 'Cartouche de toner noir pour imprimantes HP LaserJet',
        quantity: 5,
        price: 899.99
      },
      {
        id: 4,
        name: 'Cahiers',
        description: 'Cahiers à spirale, 200 pages, format A5',
        quantity: 30,
        price: 47.50
      },
      {
        id: 5,
        name: 'Organisateur de bureau',
        description: 'Organisateur de bureau en bois avec plusieurs compartiments',
        quantity: 10,
        price: 250.00
      }
    ]
  };

  // Modify dummy data based on ID for variety
  if (id === '2') {
    dummyDemand.status = 'approved';
    dummyDemand.title = 'Demande de mise à niveau d\'équipement informatique';
    dummyDemand.description = 'Demande de mise à niveau de notre infrastructure informatique incluant de nouveaux ordinateurs portables, moniteurs et équipements réseau.';
  } else if (id === '3') {
    dummyDemand.status = 'rejected';
    dummyDemand.title = 'Demande de remplacement de mobilier';
    dummyDemand.description = 'Demande de remplacement de l\'ancien mobilier de bureau par des alternatives ergonomiques.';
    dummyDemand.rejectionComment = 'Les contraintes budgétaires empêchent l\'approbation pour le moment. Veuillez soumettre à nouveau avec des quantités réduites ou considérer une mise en œuvre par phases.';
    dummyDemand.fileName = undefined;
    dummyDemand.fileUrl = undefined;
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="min-h-full">
          <DemandDetailsSkeleton />
        </div>
      </DashboardLayout>
    );
  }

  // Commented out error handling
  // if (error || !demand) {
  //   return (
  //     <DashboardLayout>
  //       <ErrorMessage 
  //         message={error?.message || 'Demand not found'} 
  //         onRetry={() => window.location.reload()}
  //       />
  //     </DashboardLayout>
  //   );
  // }

  return (
    <DashboardLayout>
      <ThemeProvider>
        <div className="min-h-full">
          <DemandDetailsContent demand={dummyDemand} />
        </div>
      </ThemeProvider>
    </DashboardLayout>
  );
};
