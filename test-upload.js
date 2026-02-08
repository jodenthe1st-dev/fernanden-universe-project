// Test rapide pour vérifier que tout fonctionne
const testUpload = async () => {
  try {
    // Créer un faux fichier pour tester
    const testFile = new File(['test'], 'test.jpg', { type: 'image/jpeg' });
    
    // Tester l'upload (attention: this file uses browser File API)
    const form = new FormData();
    form.append('uploads', testFile);
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: form,
      credentials: 'include'
    });
    
    const result = await response.json();
    console.log('✅ Test upload réussi:', result);
    
  } catch (error) {
    console.error('❌ Test upload échoué:', error);
  }
};

testUpload();
