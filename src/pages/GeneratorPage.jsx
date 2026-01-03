import { useParams } from 'react-router'; // Changed import

function GeneratorPage() {
  const { type } = useParams();

  return (
    <div style={{ padding: '20px' }}>
      <h1>Generator: {type}</h1>
      <p>Prompt input and button will go here</p>
    </div>
  );
}

export default GeneratorPage;