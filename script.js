window.handleSubmit = async function(event) {
    event.preventDefault();

    const form = event.target;
    
 
    if (!form.checkValidity()) {
        

        form.reportValidity(); 
        
        return; 
    }



    const formData = new FormData(form);
    const isBusiness = document.getElementById('individual-fields').classList.contains('hidden');
    const type = isBusiness ? 'business' : 'individual';

    if (!document.getElementById('terms').checked) {
        showMessage("Erro de Validação", "Você deve concordar com os Termos de Serviço para continuar.", false);
        return;
    }

    const data = {
        type: type,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: 'NUMERO_NAO_MASCARADO',
        city: formData.get('city'),
        timestamp: new Date().toISOString(),
       
    };
    
   

    
    if (type === 'individual') {
        data.age = formData.get('age');
        data.interest = formData.get('interest');

        const age = parseInt(data.age, 10);
        if (isNaN(age) || age < 18) {
            showMessage("Erro de Validação", "Você deve ter 18 anos ou mais para participar como Pessoa Física.", false);
            return;
        }
    } else { 
        data.cnpj = 'CNPJ_NAO_MASCARADO'; 
       
        data.sector = formData.get('sector');
        data.volume = formData.get('volume');
        
        
    }
    
  
    try {
        
        console.log("-----------------------------------------");
        console.log("SIMULAÇÃO: O cadastro seria salvo. Dados:", data);
        console.log("-----------------------------------------");

        
        
        showMessage("Cadastro Realizado!", `Obrigado por se juntar ao Bateria Zero Risco. Seus dados foram validados com sucesso, mas NÃO foram salvos, pois o Firebase foi removido.`);
        
        form.reset();
        
        
    } catch (e) {
        showMessage("Erro", "Ocorreu um erro na lógica de envio. Verifique o console.", false);
    }
}