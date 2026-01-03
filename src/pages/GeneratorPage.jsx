import { useParams } from 'react-router'; // Changed import
import Titles from '../components/Titles';

function GeneratorPage() {
  const { title } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <Titles title={title} />
      <p>Prompt input and button will go here</p>
    </div>
  );
}

export default GeneratorPage;