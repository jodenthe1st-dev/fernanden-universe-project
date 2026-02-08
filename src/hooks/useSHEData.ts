import { useState, useEffect } from 'react';
import { sheAdminService } from '@/services/admin-she';
import { SHEConfig, Realization } from '@/types/admin-she';
import logger from '@/lib/logger';

export const useSHEData = () => {
  const [config, setConfig] = useState<SHEConfig | null>(null);
  const [realizations, setRealizations] = useState<Realization[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const [configData, realizationsData] = await Promise.all([
        sheAdminService.getConfig(),
        sheAdminService.getRealizations()
      ]);
      
      setConfig(configData);
      setRealizations(realizationsData);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      logger.error('Error loading SHE data:', err);
    } finally {
      setLoading(false);
    }
  };

  const updateConfig = async (newConfig: SHEConfig) => {
    try {
      await sheAdminService.updateConfig(newConfig);
      setConfig(newConfig);
    } catch (err) {
      setError('Erreur lors de la mise à jour de la configuration');
      logger.error('Error updating config:', err);
    }
  };

  const addRealization = async (realization: Realization) => {
    try {
      await sheAdminService.addRealization(realization);
      await loadData(); // Recharger pour avoir le nouvel ID
    } catch (err) {
      setError('Erreur lors de l\'ajout de la réalisation');
      logger.error('Error adding realization:', err);
    }
  };

  const updateRealization = async (id: string, updates: Partial<Realization>) => {
    try {
      await sheAdminService.updateRealization(id, updates);
      await loadData();
    } catch (err) {
      setError('Erreur lors de la mise à jour de la réalisation');
      logger.error('Error updating realization:', err);
    }
  };

  const deleteRealization = async (id: string) => {
    try {
      await sheAdminService.deleteRealization(id);
      await loadData();
    } catch (err) {
      setError('Erreur lors de la suppression de la réalisation');
      logger.error('Error deleting realization:', err);
    }
  };

  return {
    config,
    realizations,
    loading,
    error,
    updateConfig,
    addRealization,
    updateRealization,
    deleteRealization,
    refreshData: loadData
  };
};
