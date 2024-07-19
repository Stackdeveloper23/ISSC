import { useState } from 'react';
import Config from '../Config';

const DownloadFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const downloadFile = async () => {
    try {
      setIsLoading(true);

      const response = await Config.downloadSow();

      const defaultFileName = 'sows.xlsx'; // Nombre predeterminado del archivo
      
      const blob = new Blob([response.data], { type: response.headers['content-type'] });
      const fileUrl = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.href = fileUrl;
      downloadLink.download = defaultFileName; // Usar el nombre predeterminado
      downloadLink.click();

      URL.revokeObjectURL(fileUrl);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      setError('Hubo un problema al descargar el archivo. Intenta nuevamente.');
      setIsLoading(false);
    }
  };

  return (
    <div className='d-flex col-sm-5 justify-content-end'>
      {isLoading && <p>Descargando...</p>}
      {error && <p>Error al descargar: {error}</p>}
      <button onClick={downloadFile} className='btn btn-secondary'><span className="material-symbols-outlined">
download
</span>
</button>
    </div>
  );
};

export default DownloadFile;
