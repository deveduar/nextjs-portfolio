import { useState, useEffect } from 'react';

export interface Readme {
  id: number;
  repoId: string;
  title: string;
  description: string;
  imageSrc: string;
  detailedDescription: string;
  technologies: string[];
  links: {
    href: string;
    label: string;
  }[];
  gallery?: string[];
  features?: string[];
  readmeContent?: {
    [key: string]: any;
  };
}

export const useReadmes = () => {
  const [readmes, setReadmes] = useState<Readme[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReadmes = async () => {
      try {
        const cached = localStorage.getItem('readmes');
        const cachedTimestamp = localStorage.getItem('readmesTimestamp');
        const ONE_HOUR = 60 * 60 * 1000;
  
        console.log('🕒 Timestamp cache:', cachedTimestamp);
        console.log('⏱ Diferencia actual - timestamp:', Date.now() - Number(cachedTimestamp));
  
        if (cached && cachedTimestamp && Date.now() - Number(cachedTimestamp) < ONE_HOUR) {
          console.log('✅ Usando cache localStorage');
          setReadmes(JSON.parse(cached));
          setLoading(false);
          return;
        }
  
        console.log('🌐 Haciendo fetch a GitHub...');
        const response = await fetch('https://raw.githubusercontent.com/deveduar/readme-to-obj/refs/heads/main/src/data/readmes.ts');
        const text = await response.text();
  
        const readmesMatch = text.match(/export const readmes = (\[[\s\S]*\])/);
        if (!readmesMatch) {
          throw new Error('❌ No se pudo parsear el array de readmes');
        }
  
        const readmesData = JSON.parse(readmesMatch[1]);
        console.log('📦 Nuevos readmes obtenidos:', readmesData);
  
        localStorage.setItem('readmes', JSON.stringify(readmesData));
        localStorage.setItem('readmesTimestamp', Date.now().toString());
  
        setReadmes(readmesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch readmes');
      } finally {
        setLoading(false);
      }
    };
  
    fetchReadmes();
  }, []);
  

  return { readmes, loading, error };
};
