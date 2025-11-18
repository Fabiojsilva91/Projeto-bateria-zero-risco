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

function createPilhaChart() {
    const container = document.getElementById('pilhaGraphContainer');
    if (!container) return;
    
    
    const monthlyData = [
        { label: 'Julho', value: 12500, max: 20000 },
        { label: 'Agosto', value: 18000, max: 20000 },
        { label: 'Setembro', value: 15500, max: 20000 }
    ];

    container.innerHTML = ''; 

    monthlyData.forEach(item => {

        const percentage = Math.round((item.value / item.max) * 100);
        
        
        const barWrapper = document.createElement('div');
        barWrapper.className = 'flex flex-col items-center mx-2';
        
       
        const valueText = document.createElement('span');
        valueText.className = 'mb-1 text-xs font-semibold dark:text-gray-300';
        valueText.textContent = `R$ ${item.value.toLocaleString('pt-BR')}`;
        
      
        const bar = document.createElement('div');
        bar.className = 'pilha-bar w-10 bg-primary shadow-lg';
        bar.style.height = `${percentage}%`; 
        
      
        const labelText = document.createElement('span');
        labelText.className = 'mt-2 text-sm font-medium dark:text-gray-300';
        labelText.textContent = item.label;

        barWrapper.appendChild(valueText);
        barWrapper.appendChild(bar);
        barWrapper.appendChild(labelText);
        container.appendChild(barWrapper);
    });
}


document.addEventListener('DOMContentLoaded', () => {
   
    createPilhaChart();
});

function toggleTheme() {

}

