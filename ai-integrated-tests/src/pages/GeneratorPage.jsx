import { useParams } from 'react-router'; // Changed import
import Bengali1stInterface from './Bengali1stGen';
import Bengali2ndInterface from './Bengali2ndGen';
import English1stInterface from './English1stGen';
import English2ndInterface from './English2ndGen';

function GeneratorPage() {
  const { type } = useParams();

  if (type === 'bengali-1st') return <Bengali1stInterface />;
  if (type === 'bengali-2nd') return <Bengali2ndInterface />;
  if (type === 'english-1st') return <English1stInterface />;
  if (type === 'english-2nd') return <English2ndInterface />;
  
  return <div>Subject not found</div>;
}

export default GeneratorPage;