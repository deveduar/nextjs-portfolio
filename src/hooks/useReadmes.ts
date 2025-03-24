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
          // Check localStorage first
          const cached = localStorage.getItem('readmes');
          const cachedTimestamp = localStorage.getItem('readmesTimestamp');
          const ONE_HOUR = 60 * 60 * 1000; // 1 hour in milliseconds
  
          // Use cache if it exists and is less than 1 hour old
          if (cached && cachedTimestamp && Date.now() - Number(cachedTimestamp) < ONE_HOUR) {
            setReadmes(JSON.parse(cached));
            setLoading(false);
            return;
          }
  
          const response = await fetch('https://raw.githubusercontent.com/deveduar/readme-to-obj/refs/heads/main/src/data/readmes.ts');
          const text = await response.text();
          
          const readmesMatch = text.match(/export const readmes = (\[[\s\S]*\])/);
          if (!readmesMatch) {
            throw new Error('Could not parse readmes data');
          }
          
          const readmesData = JSON.parse(readmesMatch[1]);
          
          // Save to localStorage with timestamp
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